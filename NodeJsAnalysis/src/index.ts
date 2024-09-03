import express from "express";
import { middleware } from "./middleware";
import client from "prom-client";
import { metricsMiddleware } from "./metrics";
const app = express();

app.use(express.json());
// this middleware is just for demo

// middleware plays between acutal api calll unse pehle yeh call using next() actual api jaoge


// this is the actual metrics collecting middleware
app.use(metricsMiddleware); // this collect metrics count
app.get("/user", async(req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); //just making it active for 1seconds
    res.send({
        name: "John Doe",
        age: 25,
    });
});
app.get("/metrics", async (req, res) => {
    // when this api calls first middleware gaya requestCountMiddleware
    // waha res finish hua toh res.on laga count update
    
    // finally count update store ho raha 
    // whenever this api calls mil jayega metrics 
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})
app.post("/user", (req, res) => {
    const user = req.body;
    res.send({
        ...user,
        id: 1,
    });
});

app.listen(3000);