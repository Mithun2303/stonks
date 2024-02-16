import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
export async function POST(req, { params }) {
    const body = await req.json();

    const c_id = params.c_id;
    const conn = await pool.getConnection();
    const password = await conn.query(
        `select password from company where c_id=${c_id}`
    );
    if (password.length != 0) {

        const is_pwd_crct = await bcrypt.compare(body.password, password[0].password);
        if (is_pwd_crct) {
            let session_token = await conn.query(
                `select session_id from access_token where c_id=${c_id}`
            );
            if (session_token.length === 0) {
                let id = await v4();
                await conn.query(
                    `insert into access_token values('${id}','${c_id}')`
                );
                session_token = await conn.query(`select session_id from access_token where c_id = ${c_id}`);
            } else {
                session_token = await conn.query(
                    `select session_id from access_token where c_id=${c_id}`
                );
            }
            conn.end();
            return NextResponse.json({ message: session_token[0] }, { status: 200 });
        }
        else {
            conn.end()
            return NextResponse.json({ message: "Incorrect Password" }, { status: 300 });
        }
    } else {
        conn.end()
        return NextResponse.json({ error: "Invalid Username" }, { status: 400 });
    }
}

