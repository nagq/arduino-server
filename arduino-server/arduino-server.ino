
#include <WiFi.h>
#include <WebServer.h>
#include <arduino-server.h>

void setup() {
  // 初始化串口通信
  Serial.begin(115200);
  Serial.println("Starting...");

  // 设置LED引脚为输出模式
  for (int i = 1; i <= 6; i++) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW); // 初始状态为关闭
  }

  // 设置静态IP地址
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("STA Failed to configure");
  }

  // 连接到WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // 为不同的URL路径注册处理函数
  server.on("/", handle_index_html);
  server.on("/bundle.js", handle_bundle_js);

  // 启动Web服务器
  server.begin();
  Serial.println("Web server started");
}

void loop() {
  // 处理客户端请求
  server.handleClient();
}
