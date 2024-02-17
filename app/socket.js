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
    socket.on('check_product', async (product_id) => {
      console.log(product_id);
      const conn = await pool.getConnection();
        const resp = await conn.query(
          `select p_id,p_name,p_desc,avail_stock,total_stock,p_image from products where  p_id='${product_id}'`
        );
        console.log(resp);
        io.emit("getproduct",resp);
    });

    socket.on("hello",(msg)=>{
      console.log(msg);
    })
  });
} catch (error) {
  console.log(error);
}
