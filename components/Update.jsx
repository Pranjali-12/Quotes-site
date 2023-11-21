import React from 'react'
import Image from 'next/image'
import edit from "../public/edit.png"
import Link from 'next/link'

const Update = ({id}) => {
  console.log("Id",id);
  return (
    <>
    <Link href={`/edit/${id}`}>
        <Image src={edit} height={53} width={53} className='md:p-2 cursor-pointer mobile-image'/>
    </Link>
    </>
  )
}

export default Update