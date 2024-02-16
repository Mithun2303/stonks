import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";
const bcrypt = require("bcrypt");
const {v4} = require("uuid");

export async function POST(req, { params }) {
    try {
        const {p_name, p_desc, p_image, avail_stock } = await req.json();
        const db = await pool.getConnection();
        const c_id = await db.query(`select c_id from access_token where session_id = '${params.session_id}'`);
        if(c_id.length!=0){
            const result = await db.query('INSERT INTO products (p_id, p_name, p_desc, p_image, avail_stock,c_id) VALUES (?, ?, ?, ?, ?,?)', [v4(), p_name, p_desc, p_image, avail_stock,c_id[0].c_id]);
            db.end();
            console.log('Product added:', result);
            return new NextResponse("Product added successfully", { status: 200 });
        }
        else{
            throw("Invalid session ID")
        }
    } 
    catch (error) {
        console.error('Error adding product:', error);
        return new NextResponse("Error adding product", { status: 400 });
    }
};
