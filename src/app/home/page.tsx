import Avatar from "@/components/Avatar";
import { ApiData } from "../types";
import { cookies } from 'next/headers'
import Link from "next/link";
import { redirect } from 'next/navigation'


  const getProfile=async ()=>{
    
    const cookieStore = cookies()
    const item=cookieStore.get('idadmin')?.value;
    const token=cookieStore.get('tokenadmin')?.value;

    let data:ApiData;
    let dtFoto:string="";
    
    const dtProfile = await fetch(`${process.env.apiUrl}/karyawan/${item}`,{
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
    }else{
        if(dtProfile.statusText=="Unauthorized"){
            redirect('/login')
        }
    }
    return data;
  }
 
  

export default  async function  Home() {
  let data:ApiData = await getProfile();

  return (
    <main className="flex max-h-screen flex-col items-center justify-normal p-24 bg-red-50">
      <Avatar data={data.data.dtFoto}/>
      <hr></hr>
      <p className="mt-10">Hai {data.data.nama}.. </p>
      <p>Gunakan link di bawah untuk melihat dan merubah data.. dan klik link diatas untuk kembali ke home</p>
      <Link href="/home/absen"><h1 className="font-bold"><u>Absen</u></h1></Link>
      <Link href="/home/karyawan"><h1 className="font-bold"><u>Karyawan</u></h1></Link>
    </main>
  )
}
