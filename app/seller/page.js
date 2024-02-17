"use client";

import { useState } from "react";
import { Noto_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: "400",
});
export default function SellerLogin() {
  const [sellerId, setSellerId] = useState("");
  const [sellerError, setSellerError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSellerInputChange = (event) => {
    setSellerId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sellerId, password);
    if (!sellerId.match(/.{3,}/)) {
      setSellerError("Enter a valid seller ID.");
    } else if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      setPasswordError(
        "Password must contain atleast one uppercase, lowercase and symbol."
      );
    }
    // then send POST
  };

  return (
    <div className="outer-bg bg-[#d8dee9] h-[100vh] min-h-[100%] p-10 flex flex-row-reverse">
      <div className="inner-card bg-[#e5e9f0] h-full min-w-[400px] w-1/3 rounded-lg place-self-end">
        <form onSubmit={handleSubmit}>
          <div className={`login-card ${notoSans.className} px-10 pt-5`}>
            <div className="flex justify-center font-semibold text-2xl">
              stonks.
            </div>
            <div className="seller-id flex-col mt-10 text-md">
              <label className="flex"> Seller ID </label>
              <input
                className="bg-transparent block h-10 w-3/4 mt-3 text-sm border border-b-[#5e81ac] outline-none hover:border-2 hover:w-full focus:w-full focus:border-2 transition-all"
                type="text"
                autoFocus={true}
                onChange={handleSellerInputChange}
              ></input>
              <label
                className={`text-xs ${
                  sellerError ? "mt-4" : "mt-0"
                } text-[#bf616a]`}
              >
                {sellerError}
              </label>
            </div>
            <div className="password flex-col mt-10 text-md">
              <label className="flex"> Password </label>
              <input
                className="bg-transparent block h-10 w-3/4 mt-3 text-sm border border-b-[#5e81ac] outline-none hover:border-2 hover:w-full focus:w-full focus:border-2 transition-all"
                type="password"
                onChange={handlePasswordChange}
              ></input>
              <label
                className={`text-xs ${
                  passwordError ? "mt-4" : "mt-0"
                } text-[#bf616a]`}
              >
                {passwordError}
              </label>
            </div>
            <div className="mt-3">
              <label className="text-sm">
                {" "}
                Signing in as a company?{" "}
                <a href="../" className="text-blue-500 hover:underline transition-all">
                  {" "}
                  Click here.{" "}
                </a>
              </label>
            </div>
            <div className="flex mt-5">
              <button
                className="bg-[#81a1c1] px-5 py-2 rounded-full shadow-md hover:opacity-75"
                type="submit"
              >
                Login!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
