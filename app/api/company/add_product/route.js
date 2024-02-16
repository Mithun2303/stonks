import { NextResponse, NextRequest } from "next/server";
import pool from  "../../../../utils/db";
const bcrypt = require("bcrypt");

export async function POST(req, { params }) {
    try {
        const { p_id, p_name, p_desc, p_image, avail_stock } = req.body;

        const db = await pool.getConnection();
        const result = await db.query('INSERT INTO products (p_id, p_name, p_desc, p_image, avail_stock) VALUES (?, ?, ?, ?, ?)', [p_id, p_name, p_desc, p_image, avail_stock, c_id]);
        db.release();

        console.log('Product added:', result);
        return new NextResponse("Product added successfully", { status: 200 });
    } 
    catch (error) {
        console.error('Error adding product:', error);
        return new NextResponse("Error adding product", { status: 500 });
    }
};
