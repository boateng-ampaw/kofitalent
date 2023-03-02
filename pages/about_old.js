import { useEffect } from 'react';
import Image from 'next/image'
import Cookies from "js-cookie";


export default function About(){

    useEffect(()=>{
        fetch(`https://badmin.kofitalent.com/apis/login-api.php`,{
        credentials: 'include',
        redirect: 'follow'
    }).then(resp=>resp.text()).then(data=>{
        // console.log(data);
    })
        // Cookies.get('token') ? Cookies.remove('token') : console.log('No tokens set');
    },[])

    return (
        <div>
            About
            <div>
                Image

                <p>Set session cookie</p>
            </div>
        </div>
    )
}

