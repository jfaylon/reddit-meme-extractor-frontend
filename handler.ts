import type { IncomingMessage, ServerResponse } from "http";
import next from "next";
import serverless from "serverless-http";

const app = next({ dev: false, conf: { distDir: "." } });
const handle = app.getRequestHandler();

export const server = serverless(
  async (req: IncomingMessage, res: ServerResponse) => {
    await app.prepare();

    if (!req.url) {
      req.url = "/";
    }

    return handle(req, res);
  },
);
