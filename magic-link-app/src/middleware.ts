import { NextResponse } from "next/server";
import { validateSession } from "./lib/auth";

// このミドルウェアは認証状態を確認します
export function middleware(request) {
  // セッションクッキーからセッションIDを取得
  const sessionId = request.cookies.get("session_id")?.value;

  // パスの取得
  const { pathname } = request.nextUrl;

  // 認証が不要なパス
  const publicPaths = ["/", "/api/auth/login", "/api/auth/verify"];

  // 認証が不要なパスの場合はスキップ
  if (
    publicPaths.some((path) => pathname.startsWith(path)) &&
    !pathname.startsWith("/dashboard")
  ) {
    return NextResponse.next();
  }

  // セッションIDが存在しない、または無効な場合はログインページにリダイレクト
  if (!sessionId || validateSession(sessionId) === null) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  // 認証成功の場合、リクエストを続行
  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
