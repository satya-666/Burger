export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: {
    code: string;
    details?: unknown;
  };
};

export type AuthUser = {
  id: string;
  name: string;
  mobileNumber: string;
  email?: string;
  profileImage?: string;
  lastLogin?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type RequestOptions = RequestInit & {
  token?: string | null;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const rawBody = await response.text();
  let payload: ApiResponse<T>;

  try {
    payload = JSON.parse(rawBody) as ApiResponse<T>;
  } catch {
    throw new Error(
      response.ok
        ? "API returned an invalid response."
        : "Backend API is not reachable. Please check the backend deployment URL."
    );
  }

  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload;
}
