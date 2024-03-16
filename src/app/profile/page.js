"use client"
import { useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getUserDetails } from '@/provider/store/authSlice'
import { useDispatch } from 'react-redux';
export default function ProfilePage(){
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()
    const onLogout = async() =>{
        try{
            const response = await axios.get('/api/users/logout');
            if(response){
                toast.success(response.data.message)
                localStorage.removeItem('user')
                router.push('/login')
            }

        }catch(error){
            toast.error(error.message)
        }
    } 
    useEffect(()=> {dispatch(getUserDetails())},[]) 
    return(
        <>
        {auth.loading ? "Loading ..." : (< button onClick={()=> {router.push(`/profile/${auth.data?.user?._id}`)}}  >{auth.data?.user?.name}</button>)} 
        <button onClick={onLogout}> log out</button>
        </>
       
    )
}