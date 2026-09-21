const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 4173;
const ROOT = path.resolve(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT, "frontend");
const DATABASE_DIR = path.join(ROOT, "database");
const CONTENT_FILE = path.join(DATABASE_DIR, "site-content.json");
const REQUESTS_FILE = path.join(DATABASE_DIR, "booking-requests.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return fallback;
  }
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function serveFile(response, requestPath) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const requestedFile = path.normalize(decodeURIComponent(normalizedPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(FRONTEND_DIR, requestedFile);

  if (!filePath.startsWith(FRONTEND_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  });
}

async function handleApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/site-content") {
    sendJson(response, 200, readJson(CONTENT_FILE, {}));
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/booking-requests") {
    try {
      const payload = JSON.parse(await readRequestBody(request));
      const requests = readJson(REQUESTS_FILE, []);
      const record = {
        id: `REQ-${Date.now()}`,
        createdAt: new Date().toISOString(),
        service: payload.service || "",
        model: payload.model || "Any suitable vehicle",
        pickup: payload.pickup || "",
        date: payload.date || "",
      };

      requests.push(record);
      fs.writeFileSync(REQUESTS_FILE, `${JSON.stringify(requests, null, 2)}\n`);
      sendJson(response, 201, { ok: true, request: record });
    } catch (error) {
      sendJson(response, 400, { ok: false, message: "Invalid booking request" });
    }
    return true;
  }

  return false;
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname.startsWith("/api/")) {
    const handled = await handleApi(request, response, url);
    if (!handled) {
      sendJson(response, 404, { ok: false, message: "API route not found" });
    }
    return;
  }

  serveFile(response, url.pathname);
});

server.listen(PORT, () => {
  console.log(`Luxury car website running at http://127.0.0.1:${PORT}`);
});
