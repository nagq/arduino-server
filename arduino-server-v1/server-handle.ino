
#include "constants.h"
#include "server-handle.h"
#include "arduino-server.h"

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

void serverHandle() {
  server.on("/action/on", HTTP_POST, handleActionOn);
  server.on("/action/off", HTTP_POST, handleActionOff);
  server.on("/action/status", HTTP_GET, handleActionStatus);
}
