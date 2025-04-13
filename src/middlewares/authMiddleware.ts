import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [ "/tasks" ];
const authRoutes = [ "/login"];

export function authMiddleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;
    
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
    const isAuthRoute = authRoutes.includes(pathname);

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/tasks", req.url));
    }
    return NextResponse.next();

}

export default authMiddleware;