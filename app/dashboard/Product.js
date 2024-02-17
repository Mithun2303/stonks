"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

export default function Product() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const cookies = new Cookies();
    const sessionId = cookies.get("session_id");
    axios
      .get(`http://localhost:3000/api/company/list_products/${sessionId}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      });
  }, []);
  
  const router = useRouter();

  const handleRedirect = (p_id) => {
    router.push(`./dashboard/product/${p_id}`)
  }

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2 gap-6">
        {products &&
          products.map((element, index) => (
            <div className="card flex-col h-60 p-2 w-36 border border-slate-400 rounded-2xl cursor-pointer hover:-translate-y-2 overflow-y-clip hover:shadow-md transition-all" onClick={() => handleRedirect(element.p_id)}>
              <div className="flex justify-center"> 
                <Image src={element.p_image} width={100} height={100}></Image>
              </div>
              <div className="mt-3">
                <div className="h-10 overflow-ellipsis"> {element.p_name} </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
