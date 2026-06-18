import { NextRequest } from "next/server";

const getBackendApiUrl = () => {
  const configuredUrl =
    process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return "http://localhost:5001/api";
};

const proxyRequest = async (
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) => {
  const backendApiUrl = getBackendApiUrl();

  if (!backendApiUrl) {
    return Response.json(
      {
        success: false,
        message:
          "Backend API is not configured. Set BACKEND_API_URL in Vercel to your deployed backend API base URL.",
        error: {
          code: "BACKEND_API_NOT_CONFIGURED",
        },
      },
      { status: 503 }
    );
  }

  const { path } = await context.params;
  const targetUrl = new URL(`${backendApiUrl}/${path.join("/")}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method)
      ? undefined
      : await request.text(),
    cache: "no-store",
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "content-type":
        response.headers.get("content-type") || "application/json",
    },
  });
};

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
