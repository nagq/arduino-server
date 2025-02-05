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
                    strKey: `str_${cleanName}`,
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
        const { strKey, content } = item;
        return `const char* ${strKey} = ${content};`;
    }).join('\n\n').concat(['\n']);

    const str2 = files.map((item) => {
        const { name, cleanName, strKey, type, method } = item;
        return `// ${name}
static esp_err_t ${method}(httpd_req_t *req)
{
    httpd_resp_set_type(req, "${type}");
    // httpd_resp_set_hdr(req, "Content-Encoding", "gzip");
    return httpd_resp_send(req, ${strKey}, strlen(${strKey}));
}

httpd_uri_t ${cleanName} = {
    .uri = "/${name}",
    .method = HTTP_GET,
    .handler = ${method},
    .user_ctx = NULL
    #ifdef CONFIG_HTTPD_WS_SUPPORT
    ,
    .is_websocket = true,
    .handle_ws_control_frames = false,
    .supported_subprotocol = NULL
    #endif
};
`;
        }).join('\n')

    const str3 = files.map((item) => {
        const { cleanName } = item;
        return `httpd_register_uri_handler(camera_httpd, &${cleanName});`;
    }).join('\n    ');

    fs.writeFileSync(path.join(__dirname, '../arduino-server/static-files-handle.cpp'),
    `#include "esp_http_server.h"
#include "esp_timer.h"
#include "esp_camera.h"
#include "img_converters.h"
#include "fb_gfx.h"
#include "driver/ledc.h"
#include "sdkconfig.h"
#include "camera_index.h"

${str1}

${str2}

httpd_uri_t home_page_uri = {
    .uri = "/",
    .method = HTTP_GET,
    .handler = handle_index_html,
    .user_ctx = NULL
    #ifdef CONFIG_HTTPD_WS_SUPPORT
    ,
    .is_websocket = true,
    .handle_ws_control_frames = false,
    .supported_subprotocol = NULL
    #endif
};

void staticFilesHandle(httpd_handle_t camera_httpd)
{
    httpd_register_uri_handler(camera_httpd, &home_page_uri);
    ${str3}
}
`)
}

main();
