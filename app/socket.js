// import pool from "./db";
const pool = require("./utils/db");
const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
try {
  io.on("connection", async (socket) => {
    console.log("User connected");
    socket.on("message", async (company_id, session_id, product_id) => {
      const conn = await pool.getConnection();
      console.log(session_id, product_id);
      const c_id = await conn.query(
        `select c_id from access_token where session_id='${session_id}'`
      );
      if (c_id.length === 0) {
        throw "Error";
      } else {
        const resp = await conn.query(
          `select p_id,p_name,p_desc,avail_stock,p_image from products natural join company_seller where c_id='${company_id}' and p_id='${product_id}'`
        );
        console.log(resp);

        io.emit(resp);
      }
    });
  });
} catch (error) {}
