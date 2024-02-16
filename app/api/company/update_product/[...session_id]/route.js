import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";
const {v4} = require("uuid");

export async function POST(req, { params }) {
    try {
        const {p_id,quantity} = await req.json();
        const db = await pool.getConnection();
        const c_id = await db.query(`select c_id from access_token where session_id = '${params.session_id}'`);
        if(c_id.length!=0){
            const result = await db.query(`update products set avail_stock=avail_stock+${quantity} where p_id='${p_id}'`);
            db.end();
            console.log('Product updated:', result);
            return new NextResponse("Product updated successfully", { status: 200 });
        }
        else{
            throw("Invalid session ID")
        }
    } 
    catch (error) {
        console.error('Error updating product:', error);
        return new NextResponse("Error updating product", { status: 400 });
    }
};
