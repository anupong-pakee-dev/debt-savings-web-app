import jwt, { JwtPayload } from "jsonwebtoken";

import { cookies } from "next/headers";
import { prisma } from "./prisma";

export const requireAdmin = async () => {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) throw new Error("Unauthorized");

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload as { id: string };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { role: true },
        })

        if (!user || user.role !== "ADMIN") {
            throw new Error("Forbidden");
        }

        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Unauthorized");
    }
}