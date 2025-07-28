// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PATH } from "@/shared/constants/path";

export function middleware(request: NextRequest) {
  // Логирование пути

  console.log(`Request path: ${request.nextUrl.pathname}`);

  // Продолжаем обработку запроса
  return NextResponse.next();
}

// Указываем, для каких путей middleware будет выполняться
export const config = {
  matcher: ["/sign-in", "/sign-up", "/congratulations"],
};
