"use client"
import { useSelector } from "react-redux"
export default function UserProfilePage({params}){
    const user = useSelector((state) => state.auth.data)
     console.log(user)
    return(     
        <>{params.id}</>
    )
}