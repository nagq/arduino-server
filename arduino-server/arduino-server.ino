
#include <WiFi.h>
#include <WebServer.h>
#include <arduino-server.h>

// 固定的WiFi信息
const char* ssid = "mypwifi";
const char* password = "a12345678";

// 固定的IP地址信息
IPAddress local_IP(192, 168, 119, 200);
IPAddress gateway(192, 168, 119, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8);
IPAddress secondaryDNS(8, 8, 4, 4);

// 响应成功 默认报文
String successResp = "{\"code\":0}";

void handleActionOn() {
  digitalWrite(48, LOW);
  server.send(200, "text/json", successResp);
}

void handleActionOff() {
  digitalWrite(48, HIGH);
  server.send(200, "text/json", successResp);
}

void handleActionStatus() {
  int status = digitalRead(48);
  server.send(200, "text/json", "{\"code\":0, \"result\": " + String(status) + "}");
}

void setup() {
  // 初始化串口通信
  Serial.begin(115200);
  Serial.println("Starting...");
  pinMode(48,OUTPUT);

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

  init();

  server.on("/action/on", HTTP_POST, handleActionOn);
  server.on("/action/off", HTTP_POST, handleActionOff);
  server.on("/action/status", HTTP_GET, handleActionStatus);

  // 启动Web服务器
  server.begin();
  Serial.println("Web server started");
}

void loop() {
  // 处理客户端请求
  server.handleClient();
  delay(2);
}
