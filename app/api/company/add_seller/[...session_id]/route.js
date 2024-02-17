import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
export async function POST(req, { params }) {
  try {
    const { s_type, s_name, s_mail } = await req.json();
    // console.log(req.body);
    const db = await pool.getConnection();
    const c_id = await db.query(
      `select c_id from access_token where session_id = '${params.session_id}'`
    );
    if (c_id.length != 0) {
      const s_id = v4();
      let s_pwd = "chad@1234";
      s_pwd = await bcrypt.hash(s_pwd, await bcrypt.genSalt(10));
      const result = await db.query(
        "INSERT INTO seller (s_id,s_type, s_name, s_mail,s_pwd) VALUES (?,?, ?, ?,?)",
        [s_id, s_type, s_name, s_mail, s_pwd]
      );
      const result1 = await db.query(
        "insert into company_seller(c_id,s_id) values(?,?)",
        [c_id[0].c_id, s_id]
      );
      db.release();

      console.log("Seller added:", result);
      return new NextResponse("Product added successfully", { status: 200 });
    } else {
      throw "Invalid session ID";
    }
  } catch (error) {
    console.error("Error adding seller:", error);
    return new NextResponse("Error adding seller", { status: 500 });
  }
}
