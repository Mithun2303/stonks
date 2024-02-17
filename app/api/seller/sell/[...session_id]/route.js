import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";


export async function POST(req,{params}){
    try {
        const s_id = await params.session_id;
        const conn = await pool.getConnection();
        const seller_id = await conn.query(`select c_id from access_token where session_id = '${s_id}'`);
    } catch (error) {
        
    }
    
}