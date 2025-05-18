import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:4000/docs-json",
  output: "generated/openapi-client",
  plugins: [
    {
      name: "@hey-api/client-next",
      runtimeConfigPath: "./config/openapi-runtime.ts",
    },
  ],
});
