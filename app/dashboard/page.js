"use client";

import { Noto_Sans } from "next/font/google";
import Cookie from "universal-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Product from "./Product";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    const cookies = new Cookie();
    cookies.remove("session_id");
    router.push("/");
  };

  return (
    <div className="outer-card h-[100vh] min-h-[100%] p-5">
      <div className="inner-main bg-[#e5e9f0] h-full flex rounded-lg">
        <nav
          className={`navbar bg-[#434c5e] flex-col justify-between w-1/4 min-w-[200px] max-w-[250px] px-4 py-10 rounded-l-lg ${notoSans.className} text-[#eceff4]`}
        >
          <div className="company-name flex justify-center text-xl">
            Apple Inc.
          </div>
          <hr className="h-2 my-5"></hr>
          <div className="flex-col justify-center">
            <ul>
              <li
                className="flex p-3 bg-[#4c566a] rounded-xl cursor-pointer my-2"
                onClick={() => router.push("./dashboard")}
              >
                <Image src="/grid.svg" width={20} height={20}></Image>
                <a className="ms-4"> Dashboard </a>
              </li>
              <li
                className="flex p-3 hover:bg-[#4c566a] rounded-xl cursor-pointer my-2"
                onClick={() => router.push("../products")} //make products page
              >
                <Image src="/package.svg" width={20} height={20}></Image>
                <a className="ms-4"> Products </a>
              </li>
            </ul>
          </div>
          <div className=" mt-80 invisible"> yooyoyyo </div>
          <div className="assist-block mt-96">
            <ul>
              <li
                className="flex p-3 hover:bg-[#4c566a] rounded-xl text-md align-middle cursor-pointer my-2"
                onClick={() => router.push("./contact")} //make contact page
              >
                <Image src="/help.svg" width={20} height={20}></Image>
                <a className="ms-4"> Help </a>
              </li>
              <li
                className="flex p-3 hover:bg-[#4c566a] rounded-xl text-md align-middle text-[#bf616a] cursor-pointer my-2"
                onClick={handleLogout} //make contact page
              >
                <Image src="/log-out.svg" width={20} height={20}></Image>
                <a className="ms-4"> Logout </a>
              </li>
            </ul>
          </div>
        </nav>
        <main className={`p-5 ${notoSans.className}`}>
          <Product></Product>
        </main>
      </div>
    </div>
  );
}
