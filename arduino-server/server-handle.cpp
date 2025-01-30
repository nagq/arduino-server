#include <Arduino.h>
#include "esp_http_server.h"
#include "esp_timer.h"
#include "esp_camera.h"
#include "img_converters.h"
#include "fb_gfx.h"
#include "driver/ledc.h"
#include "sdkconfig.h"
#include "camera_index.h"

char* successResp = "{\"code\":0}";

static esp_err_t handleActionOn(httpd_req_t *req)
{
    digitalWrite(48, LOW);

    httpd_resp_set_type(req, "application/json");
    httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");
    return httpd_resp_send(req, successResp, strlen(successResp));
}

httpd_uri_t ActionOnUri = {
    .uri = "/action/on",
    .method = HTTP_POST,
    .handler = handleActionOn,
    .user_ctx = NULL
};

static esp_err_t handleActionOff(httpd_req_t *req)
{
    digitalWrite(48, HIGH);

    httpd_resp_set_type(req, "application/json");
    httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");
    return httpd_resp_send(req, successResp, strlen(successResp));
}

httpd_uri_t ActionOffUri = {
    .uri = "/action/off",
    .method = HTTP_POST,
    .handler = handleActionOff,
    .user_ctx = NULL
};

static esp_err_t handleActionStatus(httpd_req_t *req)
{
    int status = digitalRead(48);
    char resp[30];
    sprintf(resp, "{\"code\":0, \"result\": %d}", status);
    httpd_resp_set_type(req, "application/json");
    httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");
    return httpd_resp_send(req, resp, strlen(resp));
}

httpd_uri_t ActionStatusUri = {
    .uri = "/action/status",
    .method = HTTP_GET,
    .handler = handleActionStatus,
    .user_ctx = NULL
};

void serverHandle(httpd_handle_t camera_httpd)
{
    httpd_register_uri_handler(camera_httpd, &ActionOnUri);
    httpd_register_uri_handler(camera_httpd, &ActionOffUri);
    httpd_register_uri_handler(camera_httpd, &ActionStatusUri);
}
