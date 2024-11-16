import { serve } from "https://deno.land/std@0.188.0/http/server.ts";

serve((req) => {
    const url = new URL(req.url);
    const filePath = `${Deno.cwd()}/build${url.pathname}`;

    try {
        const file = Deno.readFileSync(filePath);
        const contentType = getContentType(url.pathname);
        return new Response(file, {
            headers: { "content-type": contentType || "application/octet-stream" },
        });
    } catch {
        const file = Deno.readFileSync(`${Deno.cwd()}/build/index.html`);
        return new Response(file, {headers: { "content-type": "text/html" } });
    }
});

function getContentType(pathname: string): string | undefined {
    const ext = pathname.split(".").pop();
    switch (ext) {
        case "html": return "text/html";
        case "js": return "application/javascript";
        case "css": return "text/css";
        case "png": return "image/png";
        case "jpg": return "image/jpeg";
        case "svg": return "image/svg+xml";
        case "json": return "application/json";
        default: return undefined;
    }
}
