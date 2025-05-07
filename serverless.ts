import type { AWS } from "@serverless/typescript";

const config: AWS = {
  service: "nextjs-app",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    region: "ap-southeast-1",
  },
  functions: {
    nextApp: {
      handler: "handler.server",
      events: [
        {
          httpApi: {
            path: "/{proxy+}",
            method: "any",
          },
        },
      ],
      timeout: 120,
    },
  },
  package: { individually: true },
  custom: {
    "serverless-offline": {
      httpPort: 3000,
      lambdaPort: 3001,
      stage: "",
      basePath: "",
    },
  },
  plugins: ["serverless-offline", "serverless-plugin-typescript"],
};

module.exports = config;
