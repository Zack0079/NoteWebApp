"use client"

import { useState, useRef } from "react";
import { redirect } from 'next/navigation'

import Dialog from "../components/Dialog";
import { userLogin } from "../apis/user";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleLogin = async () => {
        const res = await userLogin(email, password);
        console.log(res)
    };

  
    return (
        <div className=" min-h-screen">

            {/* {!!alertMessage &&
                <div className="w-full text-center font-semibold border-b items-center justify-center">
                    <span>{alertMessage}</span>
                </div>
            } */}
            <div className="flex h-screen  items-center justify-center">

                <div className="p-10 bg-white border-gray-400 border-2 w-80">
                    <h2 className="text-2xl mb-4 font-bold">Login</h2>

                    <div className="my-6">
                        <span className="text-sm font-bold">email</span>
                        <input
                            className="w-full border px-2 text-sm mt-3"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="my-6">
                        <span className="text-sm font-bold">Password</span>
                        <input
                            type="password"
                            className="w-full border px-2 text-sm mt-3"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full bg-black text-white p-2 "
                        onClick={handleLogin}
                    >
                        Log In
                    </button>
                </div>
            </div>

        </div>
    );
}