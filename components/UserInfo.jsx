"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import male from "../public/male.png"
import female from "../public/female.png"
import user from "../public/user.png"
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import QuotesList from './QuotesList'
import AddQuote from './AddQuote'
import add from "../public/add.png"
import Link from 'next/link'


export const UserInfo = () => {

  const [showAdd, setShowAdd] = useState(false)

  const { data: session } = useSession()

  console.log(session);

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-center p-3 '>

        <div className='my-4 mx-4 p-4 flex flex-col items-center gap-2 sm:w-2/8 sm:sticky top-0'>
          
          {session?.user?.gender === "male" ? (
            <div className=''>
              <Image src={male} height={70} width={70} alt='male'/>
            </div>
          ) : session?.user?.gender === "female" ? (
            <div className=''>
              <Image src={female} height={80} width={80} alt='female'/>
            </div>
          ) : (
            <div className=''>
              <Image src={user} height={80} width={80} alt='user'/>
            </div>
          )}

          {
            session?.user?.name ?
              (<div className='text-white font-semibold text-xl'>{session?.user?.name}</div>) :
              (<div className='text-gray-400 font-semibold text-xl'>User</div>)
          }
          <Link href={'/mylist'}><div className='text-purple-400 sm:text-base text-xl font-semibold underline mb-2'>My Quote List</div></Link>
          <button onClick={() => signOut()} className='py-2 bg-purple-700 text-slate-200 rounded-lg font-semibold w-28 text-xl'>Logout</button>
        </div>

        <div className='w-full sm:w-7/8'>
          <div className='flex my-3 sm:mx-20 text-white'>
            <div className='text-5xl font-semibold p-4 text-purple-400'> Add Your Quotes </div>
            <Image onClick={() => setShowAdd(true)} src={add} height={70} width={70} alt='add' className='md:p-2 mx-8 mt-5 animate-bounce cursor-pointer add-image' />
          </div>
          <QuotesList />
        </div>

      </div>
      <AddQuote isVisible={showAdd} onClose={() => setShowAdd(false)} />

    </>
  )
}
