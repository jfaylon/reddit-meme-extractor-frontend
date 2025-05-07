"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const next_1 = __importDefault(require("next"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, next_1.default)({ dev: false, conf: { distDir: "." } });
const handle = app.getRequestHandler();
exports.server = (0, serverless_http_1.default)(async (req, res) => {
    await app.prepare();
    if (!req.url) {
        req.url = "/";
    }
    return handle(req, res);
});
