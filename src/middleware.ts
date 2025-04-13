import { authMiddleware } from "./middlewares/authMiddleware";
import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    return authMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|_next|public|favicon).*)"],
};
