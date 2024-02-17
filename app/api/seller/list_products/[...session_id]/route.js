import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";

export default async function POST(req, { params }) {
    try {
        const s_id = await params.session_id;
        const conn = await pool.getConnection();
        const seller_id = await conn.query(`select c_id from access_token where s_id = ${s_id}`);
        if (seller_id.length === 0) {
            throw ("Invalid session ID")
        }
        else {
            const result = await conn.query(`select * from products natural join seller_product where s_id=${seller_id}`);
            console.log(result);
            return NextResponse.json(result, { status: 200 });

        }
    } catch (error) {
        console.error("Error adding product:", error);
        return new NextResponse(`Error updating product:${error}`, { status: 400 });
    }
}