import { authConnection } from "./middlewares/authConnection";
import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    return authConnection(req);
}

export const config = {
    matcher: ["/((?!api|_next|public|favicon).*)"],
};
