import React, { useState } from 'react'
import Image from 'next/image'
import close from "../public/close.png"
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 

const AddQuote = ({isVisible,onClose}) => {

    const { data: session } = useSession()

    const [title,setTitle]= useState("");
    const [quote,setQuote]= useState("");


    if(!isVisible){
        return null;
    }

    console.log(session);

    const id=session?.user?.id
    
    console.log(title,quote);

    const showAlert = (t,i) => {
        Swal.fire({
            title: t,
            icon: i,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if (!title || !quote ) {
            showAlert("Enter valid information","warning")
        }

        try {
            const res = await fetch("http://localhost:3000/api/quotes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,title,quote
                })
            })

            if (res.status == 400) {
                showAlert("Quote already involved","info");
            }

            if (res.ok) {
                Swal.fire({
                    title: "Quote added successfully",
                    icon: "success",
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        onClose();
                        window.location.reload();
                    }
                });
            }
            else {
                showAlert("Failed","error")
            }

        } catch (error) {
            console.log("Error during adding quote", error)
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-purple-400 p-5 flex flex-col justify-center rounded-lg sm:w-[50%] w-[80%] custom-add-quote'>
            
                <div className='flex items-center py-2'>
                    <div className='text-purple-900 text-4xl font-semibold mb-2 text-center flex-grow'>Add Your Quote</div>
                    <Image onClick={()=>onClose()} src={close} height={50} width={50} className='md:p-2 cursor-pointer' alt='close'/>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center py-2'>
                    <input
                        onChange={(e)=>setTitle(e.target.value)}
                        type="text"
                        placeholder="Title"
                        className="p-3 rounded-md outline-none bg-purple-500 my-2 border border-slate-800 sm:w-[80%] w-[90%] text-slate-200 text-2xl font-semibold"
                    /><br />
                    <textarea
                         onChange={(e)=>setQuote(e.target.value)}
                        rows={5}
                        type="text"
                        placeholder="Quote"
                        className="p-3 rounded-md outline-none bg-purple-500 my-2 border border-slate-800 sm:w-[80%] w-[90%] text-slate-200 text-xl font-semibold"
                    /><br />
                    <button className='py-2 text-purple-700 bg-slate-200 rounded-lg font-semibold w-32 text-xl'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddQuote