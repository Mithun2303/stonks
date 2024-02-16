import { NextResponse, NextRequest } from "next/server";
import pool from  "../../../../utils/db";
const bcrypt = require("bcrypt");

export async function POST(req, { params }) {
    try {
        const { s_type, s_name, s_mail} = req.body;

        const db = await pool.getConnection();
        const result = await db.query('INSERT INTO seller (s_type, s_name, s_mail) VALUES (?, ?, ?)', [s_type, s_name, s_mail]);
        db.release();

        console.log('Seller added:', result);
        return new NextResponse("seller added successfully", { status: 200 });
    } 
    catch (error) {
        console.error('Error adding seller:', error);
        return new NextResponse("Error adding seller", { status: 500 });
    }
};