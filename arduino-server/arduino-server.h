

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

String bundle_js = "console.info(\"hello\");";
String index_html = "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/><meta name=\"theme-color\" content=\"#000000\"/><meta name=\"description\" content=\"Web site created using create-react-app\"/><title>Home</title><script defer=\"defer\" src=\"/bundle.js\"></script></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id=\"root\"></div></body></html>";

// bundle.js
void handle_bundle_js() {
    server.send(200, "text/javascript", bundle_js);
}


// index.html
void handle_index_html() {
    server.send(200, "text/html", index_html);
}

