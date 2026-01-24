import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req: Request, {params}: {params: {token: string}}) => {
    const { token } = params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        return NextResponse.json({success: true, decoded})
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return NextResponse.json({ success: false, reason: "expired" }, {status: 401})
        }

        return NextResponse.json({ success: false, reason: "invalid" }, { status: 401 })
    }
}