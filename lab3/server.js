const date = require('./modules/utils');
const http = require("http");
const port = 3000;
const fs = require("fs");
const path = require("path");
const urlModule = require("url");
const filePath = path.join(__dirname, "file.txt");
const writeURL = "/writeFile";
const readURL = "/readFile";
const dateURL = "/getDate";
const {message} = require("./modules/lang/messages/en/lab3")
const br = "</br>"

const server = http.createServer((req, res) => {
    const parsedUrl = urlModule.parse(req.url, true);
    const url = parsedUrl.pathname.replace(/\/$/, "");
    const query = parsedUrl.query;

    if (url === writeURL) {
        const text = query.text || "";
        if (fs.existsSync(filePath)) {
            fs.appendFile(filePath, `${text}${br}`, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "text/html");
                    res.end(message.appendError);
                    return;
                }
                res.setHeader("Content-Type", "text/html");
                res.end(message.append);
            });
        } else {
            fs.writeFile(filePath, `${text}${br}`, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "text/html");
                    res.end(message.fileError);
                    return;
                }
                res.setHeader("Content-Type", "text/html");
                res.end(message.file);
            });
        }
    }

    if (url.startsWith(readURL)) {
        const fileName = url.slice(readURL.length + 1);
                fs.readFile(path.join(__dirname, fileName), "utf8", (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end(message.fileNotFound + fileName);
            } else {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }
        });
    }

    if (url === dateURL) {
        const name = query.name || message.guest;
        message.date = date.getDate();
        message.name = name;
        res.setHeader("Content-Type", "text/html");
        res.end(message.niceDay);
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
