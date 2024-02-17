import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../utils/db";
import { io } from "socket.io-client";

export async function POST(req, { params }) {
    try {
        const s_id = await params.session_id;
        const { product_id, count } = await req.json();
        const conn = await pool.getConnection();
        const seller_id = await conn.query(`select c_id from access_token where session_id = '${s_id}'`);
        if (seller_id.length === 0) {
            throw ("Invalid session ID")
        }
        else {
            const seller_details = await conn.query(`select * from seller where s_id = '${seller_id[0].c_id}'`);
            if (seller_details[0].s_type == "physical_store") {
                const seller_product_details = await conn.query(`select * from seller_product where s_id='${seller_id[0].c_id}' and p_id ='${product_id}'`);
                console.log(seller_product_details);
                if (seller_product_details[0].provided_stock -seller_product_details[0].sold_stocks- count >= 0) {
                    console.log(seller_product_details[0].provided_stock, count)
                    await conn.query(`update seller_product set sold_stocks = sold_stocks+${count} where  s_id='${seller_id[0].c_id}' and  p_id ='${product_id}'`);
                    await conn.query(`update products set avail_stock = avail_stock-${count} where p_id = '${product_id}'`);
                    const socket = new io("http://127.0.0.1:3001/");
                    socket.emit('check_product',product_id);
                    const result = await conn.query(`select * from products natural join seller_product where s_id=${seller_id[0].c_id}`);
                    console.log(result);
                    return NextResponse.json(result, { status: 200 });
                }
                else{
                    throw("Not enough Stocks available");
                }
            }
            else {

            }

        }
    } catch (error) {
        console.error("Error adding product:", error);
        return new NextResponse(`Error updating product:${error}`, { status: 400 });
    }

}