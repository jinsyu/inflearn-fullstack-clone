import { CreateClientConfig } from "@/generated/openapi-client/client.gen";
import { getCookie } from "cookies-next/server";
const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || "http://localhost:4000";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: API_URL,
  async auth() {
    return getCookie(AUTH_COOKIE_NAME, { cookies });
  },
});
