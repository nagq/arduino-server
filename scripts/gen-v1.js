const fs = require('fs');
const path = require('path');

const getFiles = () => {
    const result = [];

    const traverseFolderSync = (folderPath) => {
        const entries = fs.readdirSync(folderPath);
        for (let index = 0; index < entries.length; index++) {
            const entry = entries[index];
            const entryPath = path.join(folderPath, entry);
            const stats = fs.statSync(entryPath);
            if (stats.isDirectory()) {
                traverseFolderSync(entryPath);
            } else {
                const arr = entry.split('\.');
                const type = ({
                    'html': 'text/html',
                    'css': 'text/css',
                    'js': 'application/javascript',
                })[arr[arr.length - 1]];
                const cleanName = entry.replaceAll(/\./g, '_');

                result.push({
                    name: entry,
                    cleanName,
                    method: `handle_${cleanName}`,
                    type,
                    content: JSON.stringify(fs.readFileSync(entryPath, 'utf-8'))
                })
            }
        }
    }

    traverseFolderSync(path.join(__dirname, '../data'));

    return result;
}

const main = () => {
    const files = getFiles();
    const str1 = files.map((item) => {
        const { cleanName, content } = item;
        return `const char* ${cleanName} = ${content};`;
    }).join('\n\n').concat(['\n']);

    const str2 = files.map((item) => {
        const { name, cleanName, type, method } = item;
        return `// ${name}
void ${method}() {
  server.send_P(200, "${type}", ${cleanName});
}
`;
        }).join('\n')

    const str3 = files.map((item) => {
        const { name, method } = item;
        return `server.on("/${name}", ${method});`;
    }).join('\n    ');

    fs.writeFileSync(path.join(__dirname, '../arduino-server/static-files-handle.ino'),
    `#include "arduino-server.h"

${str1}

${str2}

void staticFilesHandle() {
    server.on("/", handle_index_html);
    ${str3}
}
`)
}

main();
