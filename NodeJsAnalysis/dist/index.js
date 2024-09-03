"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
const metrics_1 = require("./metrics");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// this middleware is just for demo
// middleware plays between acutal api calll unse pehle yeh call using next() actual api jaoge
// this is the actual metrics collecting middleware
app.use(metrics_1.metricsMiddleware); // this collect metrics count
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve) => setTimeout(resolve, 1000)); //just making it active for 1seconds
    res.send({
        name: "John Doe",
        age: 25,
    });
}));
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // when this api calls first middleware gaya requestCountMiddleware
    // waha res finish hua toh res.on laga count update
    // finally count update store ho raha 
    // whenever this api calls mil jayega metrics 
    const metrics = yield prom_client_1.default.register.metrics();
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(metrics);
}));
app.post("/user", (req, res) => {
    const user = req.body;
    res.send(Object.assign(Object.assign({}, user), { id: 1 }));
});
app.listen(3000);