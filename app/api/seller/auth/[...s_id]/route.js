import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
export async function POST(req, { params }) {
  const body = await req.json();

  const s_id = await params.s_id;
  const conn = await pool.getConnection();
  const s_pwd = await conn.query(
    `select s_pwd from seller where s_id=${s_id}`
  );
  if (s_pwd.length != 0) {
    const is_pwd_crct = await bcrypt.compare(
      body.password,
      s_pwd[0].s_pwd
    );
    if (is_pwd_crct) {
      let session_token = await conn.query(
        `select session_id from access_token where c_id='${s_id}'`
      );
      if (session_token.length === 0) {
        let id = await v4();
        await conn.query(`insert into access_token values('${id}','${s_id}')`);
        session_token = await conn.query(
          `select session_id from access_token where c_id = '${s_id}'`
        );
      } else {
        session_token = await conn.query(
          `select session_id from access_token where c_id=${s_id}`
        );
      }
      conn.end();
      return NextResponse.json({ message: session_token[0] }, { status: 200 });
    } else {
      conn.end();
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 300 }
      );
    }
  } else {
    conn.end();
    return NextResponse.json({ error: "Invalid Username" }, { status: 400 });
  }
}
