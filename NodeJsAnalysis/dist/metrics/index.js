"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const requestCount_1 = require("./requestCount");
const activeRequests_1 = require("./activeRequests");
const metricsMiddleware = (req, res, next) => {
    const startTime = Date.now();
    activeRequests_1.activeRequestsGauge.inc(); //total count rakhega with name defined
    // when finially res returns then this function is called int the end
    // we are setting listener on res****
    res.on('finish', function () {
        const endTime = Date.now();
        const duration = endTime - startTime;
        // Increment request counter
        requestCount_1.requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
        requestCount_1.httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration);
        activeRequests_1.activeRequestsGauge.dec();
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
