import { NextResponse } from "next/server";
import { serverApiUrl } from "./server-api";
import { auth } from "@/auth";

export async function proxyJsonRequest(path: string, init?: RequestInit) {
  try {
    const url = serverApiUrl(path);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Connection": "close",
      ...(init?.headers as Record<string, string> || {}),
    };
    if (process.env.BACKEND_AUTH_TOKEN && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${process.env.BACKEND_AUTH_TOKEN}`;
    }

    const fetchOptions: RequestInit = {
      ...init,
      headers,
      cache: "no-store",
    };

    let response: Response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (firstErr: any) {
      // Retry once on socket disconnect (e.g. UND_ERR_SOCKET, ECONNRESET from Cloudspace proxy)
      console.warn("Proxy connection reset, retrying request to:", url);
      response = await fetch(url, fetchOptions);
    }

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "Backend error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Proxy connection error" },
      { status: 502 }
    );
  }
}

export async function requireSessionUser() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      userId: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { userId, response: undefined };
}
