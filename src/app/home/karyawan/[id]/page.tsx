"use client"
import { ApiData } from "@/app/types";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default function detailKaryawan({ params: { id } }:any) {
  const router = useRouter();

  const [nama,setNama]= useState("");
  const [email,setEmail]= useState("");
  const [posisi,setPosisi]= useState("2");
  const [role,setRole]= useState("2");
  const [notelp,setnoTelp]= useState("");
  const [newpassword,setNewPassword]= useState("");
  const [renewpassword,setReNewPassword]= useState("");

  const token=getCookie('tokenadmin');
  useEffect(()=>{
    const getProfile=async ()=>{
     
      let data:ApiData;
      let dtFoto:string="";
      
      const dtProfile = await fetch(`${process.env.apiUrl}/karyawan/${id}`,{
          method:'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // Set the Bearer token in the 'Authorization' header
              'Content-Type': 'application/json', // Adjust the content type as needed
            },
            cache:"no-store"
      })
      data = await dtProfile.json();
  
      if(dtProfile.ok){
        dtFoto=`${process.env.apiUrl}/${data.data.foto}`
        data.data['dtFoto']=dtFoto;
        setNama(data.data.nama)
        setEmail(data.data.email)
        setnoTelp(data.data.nohp)
        setPosisi(data.data.PosisiId)
        setRole(data.data.RoleId)
      }else{
          if(dtProfile.statusText=="Unauthorized"){
            router.replace('/login')
          }
      }
      
      
    }

    getProfile()
  },[])

  const  handleSave = async(e:any) => {
    e.preventDefault()
    
    const absen= await fetch(`${process.env.apiUrl}/karyawan/${id}`,{
      method:'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', 
        'source':'hradmin'
      },
      cache:"no-store",
      body: JSON.stringify(
          { 
            nama:nama,
            email:email,
            PosisiId:posisi,
            RoleId:role,
            nohp:notelp,
            newpassword:newpassword,
            renewpassword:renewpassword
          }
        ),
    });

    const data:ApiData = await absen.json();
    if(absen.ok){
        router.push("/home/karyawan")
    }else{
      alert(data.message)
    }
   
  }
  

  return (
    <main className="flex flex-col items-center justify-normal p-24 bg-white-50">
      <h1 className="font-bold">Tambah Karyawan</h1>
      <Link href="/home/karyawan"><h1 className="font-bold"><u>List Karyawan</u></h1></Link>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSave}>
      <div>
          <label htmlFor="nama" className="block text-sm font-medium leading-6 text-white-900">
            Nama
          </label>
          <div className="mt-2">
            <input
              id="nama"
              name="nama"
              type="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              autoComplete="nama"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notelp" className="block text-sm font-medium leading-6 text-white-900">
            No Telp
          </label>
          <div className="mt-2">
            <input
              id="notelp"
              name="notelp"
              type="text"
              value={notelp}
              onChange={(e) => setnoTelp(e.target.value)}
              autoComplete="notelp"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="Role" className="block text-sm font-medium leading-6 text-white-900">
                Posisi
            </label>
          </div>
          <div className="mt-2">
           <select value={posisi}   onChange={(e) => setPosisi(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="2">Staff IT</option>
              <option value="3">Staff Accounting</option>
              <option value="1">Admin HR</option>
           </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="Role" className="block text-sm font-medium leading-6 text-white-900">
                Role
            </label>
          </div>
          <div className="mt-2">
           <select value={role}  onChange={(e) => setRole(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="1">admin</option>
              <option value="2">staff</option>
           </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="newpassword" className="block text-sm font-medium leading-6 text-white-900">
               Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="newpassword"
              name="newpassword"
              type="password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="renewpassword" className="block text-sm font-medium leading-6 text-white-900">
              Retype Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="renewpassword"
              name="renewpassword"
              type="password"
              value={renewpassword}
              onChange={(e) => setReNewPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           UPDATE
          </button>
        </div>
      </form>

    </div>
    </main>
  )
}
