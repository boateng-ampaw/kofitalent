import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import useAuthUser from '../../../hooks/auth'
import NavBar from '../../../components/layout/nav-bar'
import Footer from '../../../components/layout/footer'
import Link from 'next/link'
import Image from 'next/image'
import UpdatesComponent from '../../../components/layout/dashboard/updates'
import DashboardLayoutWrap from "../../../components/layout/dashboard/dashboard-layout-wrap"
import IndexStyles from '../../../components/styles/index-page.module.css'
import UpdateStyles from '../../../components/styles/updates/update.module.css'


export default function Updates({req_status}){
    const [loading, setLoading] = useState(true)
    const {isLoading, isLoggedIn, loginError, mutate, data, errorStatus} = useAuthUser()
    const router = useRouter()

    // useEffect(()=>{
    //     console.log(isLoading, isLoggedIn, loginError, mutate, data, errorStatus);
    // },[data])

    // if(isLoading) return 'Loading to notifications...'

    useEffect(()=>{
        // console.log(data);
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

    return <>
    <NavBar />

<main>
    <section className='mb-lg-5 pb-5'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className='py-5'>
                        <h1 className='page-header letter-spacing--05 mb-4 text-black text-center f-500' >Updates</h1>
                    </div>
                </div>

                <div className='col-12'>
                    <div>
                        <div className='row gy-4 gx-lg-5 gx-lg-5'>
                            <div className='col-lg-9 mx-auto'>
                                {
                                    errorStatus ? (
                                        <div className='p-3 bg-light rounded-4 text-center'>
                                            <h4 className='f-400 mb-2'>{data.error_msg}</h4>
                                            <p className='mb-0'>Check your network connection or WIFI to make sure it&apos;s connected.</p>
                                        </div>
                                    ) : ''
                                }
                            
                            <UpdatesComponent />


                           

                            </div>

                     

                       
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</main>

<Footer />

    </>
}

// export const getServerSideProps = async ({ req })=>{
//     // const {params, query} = context

//     // const { filter } = context.query

//     // const loginResp = await fetch(`https://badmin.kofitalent.com/apis/login-api.php`,{
//     //     method: 'GET',
//     //     credentials: 'include',
//     //     headers: {
//     //         Cookie: req.headers.cookie
//     //     },
//     //     redirect: 'follow'
//     //     })


//     // const loginData = await loginResp.json()

//     // if (!loginData.isLoggedIn) {
//     //     return {
//     //     redirect: {
//     //         destination: '/login',
//     //         permanent: false,
//     //     },
//     //     }
//     // }
   
  


//     return {
//         props: {
//             updates: []
//         }
//     }
// }