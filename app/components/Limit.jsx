"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Limit = () => {
  const router = useRouter();
  return (
    <>
      <select
        className="px-4 py-2 bg-gray-200"
        onClick={(e) => router.push(`?limit=${e.target.value}`)}
      >
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
      </select>
    </>
  );
};

export default Limit;
