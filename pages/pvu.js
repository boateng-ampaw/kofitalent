import { useState, useEffect } from "react"
import useAuthUser from "../hooks/auth"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

export default function ProductVersionUpdates(){
    const {data,error, mutate} = useAuthUser()
    const [pageIsLoading, setPageIsLoading] = useState(true)
    const router = useRouter()

    useEffect(()=>{
        if(data?.user){
            setPageIsLoading(false)
        } else if(data?.isLoggedIn === 0) {
            console.log('User is logged out');
            setPageIsLoading(true)
            console.log(data);
            Cookies.remove('token')
            router.replace('/login')
        }
    },[data])

    if(pageIsLoading) return <p>Page is Loading...</p>

    return (
        <div>
            Product Version Updates
        </div>
    )
}

export async function getServerSideProps({req,res}){

    const resp = await fetch(`https://badmin.kofitalent.com/apis/login-api.php`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: req.headers.cookie
        },
        redirect: 'follow'
    })

    const data = await resp.json()

    // console.log('PVU getServerSideProps',data);

    return {
        props: {
            user: {}
        }
    }
}