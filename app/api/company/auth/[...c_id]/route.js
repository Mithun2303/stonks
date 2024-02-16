import { NextResponse,NextRequest } from "next/server";
import pool from  "../../../../utils/db";
const bcrypt = require("bcrypt");

export async function POST(req,{params}){
    const password = await req.json().password;
    const uid = params.c_id;
    const db = pool.getConnection();

    try {
        const password_hash = (await db).query('select * from company');
        console.log(password_hash);
        // return new NextResponse(password_hash)
    } catch (error) {
        // console.log(error.message())
    }
    // bcrypt.compare(password,)
    return new NextResponse("HELO");
}

export async function GET(req,{params}){
    // const password = await req.json().password;
    console.log(params.c_id);
    return new NextResponse(params.c_id);
    // const db = pool.getConnection();
    
    // try {
        
    // } catch (error) {
        
    // }
    // bcrypt.compare(password,)
}