const express = require('express');
const app = express();
const port = 8080;

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get("/sse", function (req, res) {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    var messageId = 0
    setInterval(() => {
        const data = `Current time is ${new Date().toLocaleTimeString()}`;
        res.write(`id:${messageId++}\ndata:${JSON.stringify(data)}\n\n`);
    }, 1000);
});

app.listen(port, () => {
    console.log("Listener on: http://0.0.0.0:8080");
});
