import { type NextRequest, NextResponse } from "next/server";
import { isOperator } from "./lib/ops-auth";

export function proxy(request: NextRequest) {
  const password = process.env.OPS_PASSWORD;
  if (!password) return new NextResponse("Not found", { status: 404 });
  if (isOperator(request.headers.get("authorization"), password)) return NextResponse.next();
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="ops"' },
  });
}

export const config = { matcher: ["/ops/:path*"] };
