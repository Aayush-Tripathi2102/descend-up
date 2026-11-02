// Static files only: no application server, API endpoints, database, or secrets.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const [app, port] = process.argv.slice(2);
if (!["marketing", "dashboard"].includes(app)) throw new Error("Unknown app");
const root = fileURLToPath(new URL(`../${app}/out/`, import.meta.url));
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain" };
await stat(root).catch(() => { throw new Error("Run npm run build before npm start."); });
createServer(async (req, res) => {
  try {
    let path = resolve(root, `.${decodeURIComponent(new URL(req.url, "http://localhost").pathname)}`);
    if (path !== root.slice(0, -1) && !path.startsWith(root.endsWith(sep) ? root : root + sep)) throw new Error("Invalid path");
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    res.setHeader("Content-Type", mime[extname(path)] || "application/octet-stream");
    res.end(await readFile(path));
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
}).listen(Number(port), () => console.log(`${app}: http://localhost:${port} (static files only)`));
