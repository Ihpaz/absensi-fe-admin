"use client"

import { ApiData } from "@/app/types";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DataKaryawan() {
  


  const [dtkaryawan,setDatakaryawan]=useState([{id:0,nama:"",email:"",nohp:"",password:"",Posisi:{posisi:""},Role:{role:""}}]);
  
  
  useEffect(()=>{
    handleKaryawan();
  },[])

  const handleKaryawan=async ()=>{
    const token=getCookie('tokenadmin');
    const karyawan= await fetch(`${process.env.apiUrl}/karyawan`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache:"no-store"
    });

    const data:ApiData= await karyawan.json()
    if(karyawan.ok){
      setDatakaryawan(data.data)
    }
  }

  const handleDelete= async (id:number)=>{
    const text="Apakah anda yakin ingin menghapus karyawan ini ?"
    if (confirm(text) == true) {
      const token=getCookie('tokenadmin');
      const karyawan= await fetch(`${process.env.apiUrl}/karyawan/${id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        cache:"no-store"
      });

      const data:ApiData= await karyawan.json()
      if(karyawan.ok){
        handleKaryawan()
      }
    }

  }

  return (
    <div className="pt-24 px-8 md:p-24 ">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">List Data Karyawan</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 mb-2">
        <Link href="/home/karyawan/add">
              <button 
                  className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                      ADD
              </button>
        </Link>
              
        </p>
      </div>
      {
          dtkaryawan.map((karyawan)=>(
            <div className=" border-t border-gray-100 ">
                <dl className="divide-y divide-gray-100 border-4 p-2 rounded-sm">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nama</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{karyawan.nama}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{karyawan.email}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">No Hp</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{karyawan.nohp}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Posisi</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{karyawan.Posisi.posisi}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                     {karyawan.Role.role}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Action</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="flex justify-between">
                      <Link href={`/home/karyawan/${karyawan.id}`}>
                      <button 
                        className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                            EDIT
                      </button>
                      </Link>
                      
                      <button 
                        onClick={() =>handleDelete(karyawan.id)}
                        className="px-4 py-2 text-sm text-blue-100 bg-red-500 rounded shadow">
                            DELETE
                      </button>
                      </div>
                    
                    </dd>
                  </div>
                </dl>
            </div>
          ))
      }
  </div>
  )
}


