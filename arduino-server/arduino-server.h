#ifndef ARDUINO_SERVER_H
#define ARDUINO_SERVER_H

#include <WiFi.h>

// Web服务器实例
WebServer server(80);

// 固定的WiFi信息
const char* ssid = "mypwifi";
const char* password = "a12345678";

// 固定的IP地址信息
IPAddress local_IP(192, 168, 119, 200);
IPAddress gateway(192, 168, 119, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8);
IPAddress secondaryDNS(8, 8, 4, 4);

#endif
