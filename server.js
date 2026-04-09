const http = require("http");
const fs = require("fs");
const path = require("path");
const https = require("https");

// --- Load .env manually (no external packages needed) ---
function loadEnv() {
  try {
    const envPath = path.join(__dirname, ".env");
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (key) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {
    console.warn("⚠️  No .env file found. Set GEMINI_API_KEY manually.");
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// MIME types for static files
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
};

// --- Proxy call to Gemini API ---
function callGemini(body, res) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "GEMINI_API_KEY not set in .env" }));
    return;
  }

  const postData = JSON.stringify(body);
  const options = {
    hostname: "generativelanguage.googleapis.com",
    path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const req = https.request(options, (geminiRes) => {
    let data = "";
    geminiRes.on("data", (chunk) => (data += chunk));
    geminiRes.on("end", () => {
      res.writeHead(geminiRes.statusCode, { "Content-Type": "application/json" });
      res.end(data);
    });
  });

  req.on("error", (err) => {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  });

  req.write(postData);
  req.end();
}

// --- HTTP Server ---
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // API proxy route
  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        callGemini(JSON.parse(body), res);
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(__dirname, "public", filePath);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[ext] || "text/plain" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n✅  Gemini Chatbot running at http://localhost:${PORT}`);
  console.log(`🔑  API key: ${GOOGLE_API_KEY ? "loaded from .env ✓" : "NOT SET ✗"}\n`);
});
