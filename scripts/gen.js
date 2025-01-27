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
                    'css': 'text/stylesheet',
                    'js': 'text/javascript',
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
    const target = files.map((item) => {
        const { cleanName, content } = item;
        return `String ${cleanName} = ${content};`;
    })
        .join('\n')
        .concat(['\n'])
        .concat(files.map((item) => {
            const { name, cleanName, type, method } = item;
    
            return `
// ${name}
void ${method}() {
    server.send(200, "${type}", ${cleanName});
}
`;
        }).join('\n'));

    fs.writeFileSync(path.join(__dirname, '../arduino-server/arduino-server.h'), `

// 固定的WiFi信息
const char* ssid = "mypwifi";
const char* password = "a12345678";

// 固定的IP地址信息
IPAddress local_IP(192, 168, 39, 200);
IPAddress gateway(192, 168, 39, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8); // Google DNS
IPAddress secondaryDNS(8, 8, 4, 4); // Google DNS

// 创建Web服务器实例，监听80端口
WebServer server(80);

${target}
`)
}

main();
