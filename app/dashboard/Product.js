import Image from "next/image";
import { useEffect } from "react";
import axios from "axios"

export default function Product() {
  useEffect(() => {
    axios.get()
  })

  return (
    <div className="card flex-col p-2 w-54 border border-slate-400 rounded-2xl cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all">
      <Image src="/iphone12-black.png" width={100} height={100}></Image>
      <div className="flex-col justify-center mt-3">
        <label>iPhone 12 Black</label>
      </div>
    </div>
  );
}
