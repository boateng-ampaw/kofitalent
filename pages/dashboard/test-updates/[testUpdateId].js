import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GetPostTest from "../../../hooks/getPostsTest";
import useAuthUser from "../../../hooks/auth";
import Link from "next/link";

export default function TestUpdate({update}){
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const {isLoading, isLoggedIn, loginError, mutate, data} = useAuthUser()
    const {data: testData, error: testError} = GetPostTest()

    useEffect(()=>{
        if(data && data.user){
            setLoading(false)
        } else {
            setLoading(true)
        }
    },[data])
    
    

    if(data && !data.user){ 
        router.push('/login')
    }

    if(loading) return 'Loading...'

    if(router.isFallback) return 'Loading...'


    return (
        <div>Test update - <Link href={`/dashboard`}>Back</Link>

            <div>{JSON.stringify(update)}</div>
        </div>
    )
}

export async function getStaticProps({params}){

    const resp = await fetch(`https://badmin.kofitalent.com/notifications.php`)
    const {updates} = await resp.json()

    console.log('Static Props',updates);
    let update = updates.find(update=>+update.id === +params.testUpdateId)

    console.log('The update',update);

    return {
        props: {
            update
        }
    }
}

export async function getStaticPaths(context){

    const resp = await fetch(`https://badmin.kofitalent.com/notifications.php`)
    const {updates} = await resp.json()

    console.log('Static Paths', updates);

    let paths = updates.map(update=>{
        return {
            params: {
                testUpdateId: update.id.toString()
            }
        }
    })

    console.log('The paths',paths);

    return {
        paths,
        fallback: true
    }
}