//code to spin up the node server
const app = require("./app");
const http = require("http");

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port);
