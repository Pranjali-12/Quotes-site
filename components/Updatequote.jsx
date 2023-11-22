"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import close from "../public/close.png"
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const UpdateQuote = ({ id, oldTitle, oldQuote, isVisible, onClose }) => {

    const router = useRouter()

    const [title, setNewTitle] = useState(oldTitle)
    const [quote, setNewQuote] = useState(oldQuote)

    if (!isVisible) {
        return null;
    }

    console.log(oldTitle)

    const showAlert = (t, i) => {
        Swal.fire({
            title: t,
            icon: i,
            confirmButtonText: 'OK'
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const res = await fetch(`/api/quotes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title, quote
                })
            })

            if (res.ok) {
                showAlert("Quote Updated Successfully", "success")
                router.push("/dashboard")
            }
            else {
                showAlert("Try again", "warning")
            }


        } catch (error) {
            console.log("Error while updating Quote", error);
        }


    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-purple-400 p-5 flex flex-col justify-center rounded-lg sm:w-[50%] w-[80%] custom-add-quote'>

                <div className='flex items-center py-2'>
                    <div className='text-purple-900 text-4xl font-semibold mb-2 text-center flex-grow'>Add Your Quote</div>
                    <Image onClick={() => onClose()} src={close} height={50} width={50} className='md:p-2 cursor-pointer' alt='close'/>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center py-2'>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="p-3 rounded-md outline-none bg-purple-500 my-2 border border-slate-800 sm:w-[80%] w-[90%] text-slate-200 text-2xl font-semibold"
                    /><br />
                    <textarea
                        rows={5}
                        type="text"
                        placeholder="Quote"
                        value={quote}
                        onChange={(e) => setNewQuote(e.target.value)}
                        className="p-3 rounded-md outline-none bg-purple-500 my-2 border border-slate-800 sm:w-[80%] w-[90%] text-slate-200 text-xl font-semibold"
                    /><br />
                    <button className='py-2 text-purple-700 bg-slate-200 rounded-lg font-semibold w-32 text-xl'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateQuote