"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://api.freeapi.app/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        toast.error(data.message);
      }
      if (data.success === true) {
        toast.success(data.message);
        document.cookie = `accessToken=${data?.data?.accessToken}`;
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100">
        <p className="text-center text-2xl font-bold">Login</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mt-1 text-sm">
            <label htmlFor="username" className="block text-gray-400 mb-1">
              Username
            </label>
            <input
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
              type="text"
              name="username"
              id="username"
              className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-100 outline-none focus:border-purple-400"
            />
          </div>
          <div className="mt-4 text-sm">
            <label htmlFor="password" className="block text-gray-400 mb-1">
              Password
            </label>
            <input
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              name="password"
              id="password"
              className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-100 outline-none focus:border-purple-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-400 p-3 text-gray-900 font-semibold rounded-md mt-3 cursor-pointer"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          Dont have an account?
          <Link
            href="/signup"
            className="text-gray-100 hover:underline hover:underline-offset-2 hover:decoration-purple-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
