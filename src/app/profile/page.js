"use client"
import { Loading } from '@/components/dotLoading'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function ProfilePage(){
    const [loading, setIsLoading] = useState(false);
    const router = useRouter()
    const onLogout = async() =>{
        try{
            const response = await axios.get('/api/users/logout');
            if(response){
                toast.success(response.data.message)
                router.push('/login')
            }

        }catch(error){
            toast.error(error.message)
        }
    }
    return(
        <>
           {!loading ?
                 <button onClick={onLogout}> log out</button>
                 :<Loading/>}
        </>
       
    )
}