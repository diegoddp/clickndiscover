const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".php": "text/html; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

http
  .createServer((req, res) => {
    const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = path.join(root, safePath === "\\" || safePath === "/" ? "index.html" : safePath);

    if (!filePath.startsWith(root)) {
      return send(res, 403, "Forbidden");
    }

    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          return send(res, 404, "Not found");
        }

        const ext = path.extname(filePath).toLowerCase();
        send(res, 200, data, contentTypes[ext] || "application/octet-stream");
      });
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Static server running at http://127.0.0.1:${port}`);
  });


