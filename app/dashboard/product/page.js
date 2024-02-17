"use client";

import { useRouter } from "next/navigation";

const Redirect = () => {
  const router = useRouter();
  router.push("/dashboard");
  return <div className="bg-[#bf616a]"></div>;
};

export default Redirect;
