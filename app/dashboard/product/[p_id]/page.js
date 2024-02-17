"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";


export default function ProductPage({ params }) {
  const [socket,setSocket] = useState(null);
  const [obj,setObj] = useState(null);
  useEffect(()=>{
    const conn = new io("http://localhost:3001")
    setSocket(conn);
    if(conn!=null){
      conn.emit("prod",params.p_id);
      conn.on("getproduct",(resp)=>{
        setObj(resp[0]);
        console.log(resp[0]);
      })
      conn.off();
    }

  },[])
  return <div className="bg-[#e5e9f0] h-[100%] min-h-[100vh]"></div>;
}
