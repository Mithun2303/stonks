import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";
const { v4 } = require("uuid");

export async function GET(req, { params }) {
  try {
    console.log(params.session_id,params.product_id);
    const db = await pool.getConnection();
    const c_id = await db.query(
      `select c_id from access_token where session_id = '${params.session_id}'`
    );
    if (c_id.length != 0) {

      db.end();
      return NextResponse.json(result, { status: 200 });
    } else {
      throw "Invalid session ID";
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Invalid Session ID" },
      { status: 400 }
    );
  }
}
