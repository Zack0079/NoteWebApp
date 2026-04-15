"use client"

import { useState, useEffect } from "react";
import Link from 'next/link'
import { redirect } from 'next/navigation';


interface Props {

}


export default function Navbar({ }: Props) {

    //user
    const initUser = {
        loginId: "",
        buildNumber: "",
        numberOfParts: 0,
        timePerPart: 0,
    }
    const [user, setUser] = useState(initUser);



    useEffect(() => {

        // const saveUser = localStorage.getItem("userData");
        // if (saveUser) {
        //     const userData = JSON.parse(saveUser)

        //     setUser(userData)



        // } else {
        //     //prevent direct go to dashboard without log In
        //     localStorage.clear();
        //     navigate("/");
        // }
        //  redirect('/')

    }, []);




    return (
        <div>
            <div className="border-b px-6 py-4 flex items-center justify-between">

                <div className="grid grid-cols-4 gap-6 text-sm text-center" >
                    <div>
                        <p className="font-bold">User ID</p>
                        <p className="font-semibold">{user.loginId}</p>
                    </div>

                    <div>
                        <p className="font-bold">Build Number</p>
                        <p className="font-semibold">{user.buildNumber}</p>
                    </div>

                    <div>
                        <p className="font-bold">Number of Parts</p>
                        <p className="font-semibold  ">{user.numberOfParts}</p>
                    </div>

                    <div>
                        <p className="font-bold">Time Per Part</p>
                        <p className="font-semibold">{user.timePerPart}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">

                    <button
                        className="bg-black text-white font-semibold px-4 py-2 "
                    >
                        Pause
                    </button>


                </div>
            </div>

        </div>
    );
}