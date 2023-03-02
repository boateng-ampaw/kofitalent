import { useState, useEffect } from 'react'
import useSWR, { SWRConfig } from 'swr'
import useAuthUser from '../../../hooks/auth'
import { useRouter } from 'next/router'
import NavBar from '../../../components/layout/nav-bar'
import Footer from '../../../components/layout/footer'
import Link from 'next/link'
import Image from 'next/image'
// import NotificationStyles from '../../../components/styles/dashboard/notification.module.css'
import UpdateStyles from '../../../components/styles/updates/update.module.css'
// import { CgClose } from 'react-icons/cg'
import { MdOutlineArrowBack } from 'react-icons/md'

const fetcher = (url) => fetch(url,{
    credentials: 'include',
    redirect: 'follow'
    }).then(resp=>resp.json()).then(data=>{
        // console.log(data);
        return data
    })

export default function Update({update}){
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const {isLoading, isLoggedIn, loginError, mutate, data: userData, errorStatus} = useAuthUser()

    const {data,error} = useSWR([`https://badmin.kofitalent.com/notifications.php?p=${router.query.updateId}`], fetcher, {
        fallbackData: [],
      })

    // console.log('Fallback data',data);

    useEffect(()=>{
        if(userData && userData.user){
            setLoading(false)
        } else {
            setLoading(true)
        }
    },[userData])
    

    if(userData && !userData.user){ 
        router.push('/login')
    }

    if(loading) return 'Loading...'

// if(router.isFallback) return 'Loading...'


return <>
    <NavBar />

<main>
    <section className='mb-lg-5 pb-5'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className='pt-5 mb-3' >
                        <Link href="/dashboard/updates" className='d-inline-flex align-items-center'>
                            <MdOutlineArrowBack className='me-1' size={20} /> Back
                        </Link>                                
                    </div>
                    <div className={`pt-3 pb-4 pe-lg-5 border-bottom ${data.image ? 'border-white mb-0' : 'mb-4'} `}>
                        <h1 className='letter-spacing--05 mb-0 text-black f-600'  dangerouslySetInnerHTML={{__html: data.title}}></h1>
                        <p className='fs-6 text-secondary mt-4'>{data.date}</p>
                    </div>
                </div>

                <div className='col-lg-9 mx-auto'>
                    {
                        data.image ? (
                            <div className='mb-4'>
                                <Image className='img-fluid w-100 rounded-4' src={data.image} width={1200} height={900} alt={data.title} />
                            </div>
                        ) : ''
                    }
                </div>

                <div className='col-lg-6 mx-auto'>
                    <div className='col-12 pt-2'>
                        <div className={`${UpdateStyles.updateContent} fs-5 lh-lg`} dangerouslySetInnerHTML={{__html: data.content}}>
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


// export async function getStaticPaths(){

//     const resp = await fetch(`https://badmin.kofitalent.com/notifications.php`)
//     const {updates} = await resp.json()

//     let paths = updates.map(update=>{
//         return {
//             params:{
//                 updateId: update.id.toString()
//             }
//         }
//     })

//     // console.log(updates);

//     return {
//         paths,
//          fallback: true
//     }
// }


// export async function getStaticProps({params}){

//     console.log(params);

//     const resp = await fetch(`https://badmin.kofitalent.com/notifications.php?p=${params.updateId}`)
//     const update = await resp.json()

//     // console.log(update);

//     return {
//         props: {
//              update
//           }
//     }
    
// }

// export async function getServerSideProps(context){

//     const {params} = context
//     const page_id_query = params.updateId ? `p=${params.updateId}` : null

//     const [loginResp, updateResp] = await Promise.all([
//         fetch(`https://badmin.kofitalent.com/apis/login-api.php`,{
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             Cookie: context.req.headers.cookie
//         },
//         redirect: 'follow'
//         }),
//         fetch(`https://badmin.kofitalent.com/notifications.php?${page_id_query}`,{
//         credentials: 'include',
//         headers: {
//             Cookie: context.req.headers.cookie
//         },
//         redirect: 'follow'
//         })
//     ])


//     const loginData = await loginResp.json()

//     if (!loginData.isLoggedIn) {
//         return {
//         redirect: {
//             destination: '/login',
//             permanent: false,
//         },
//         }
//     }
    
//     const update = await updateResp.json()


//     return {
//         props: {
//             update
//         }
//     }
// }