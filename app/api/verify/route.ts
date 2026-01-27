import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!);

        return NextResponse.json({success: true, decoded})
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return NextResponse.json({ success: false, reason: "expired" }, {status: 401})
        }

        return NextResponse.json({ success: false, reason: "invalid" }, { status: 401 })
    }
}