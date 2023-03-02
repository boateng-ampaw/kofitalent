import { useEffect } from "react"
import Link from "next/link"
import useAuthUser from "../../hooks/auth"
import { useRouter } from "next/router"
import { MdHelpOutline } from 'react-icons/md'


export default function Nav({openFPForm, pageTitle}){
    const {isLoading, isLoggedIn, loginError, mutate, data} = useAuthUser()
    const router = useRouter()
    

    useEffect(()=>{
        // console.log(router);
    },[])

    return (
        <nav className="sticky-top bg-white">
            <div className='container py-3 border-bottom'>
            
                <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <Link href={`/`}>
                    Logo
                    </Link>
                </div>

                {
                    (router.pathname !== '/') ? (
                        <div className='text-center d-none d-lg-block'><h2 className='secondary-font mb-0 text-white'>{openFPForm ? 'Reset your password' : `${pageTitle}` }</h2></div>
                    ) : ''
                }


                <div>
                    {/* <Link className='btn me-3 text-decoration-none rounded-pill' href={`/help-center`}>Help <span><MdHelpOutline /></span></Link> */}
                    
                    {
                        isLoading ? 'Loading' : (isLoggedIn ? <Link className='btn btn-lg pt-1 btn-dark rounded-pill' href={`/dashboard`}>Dashboard</Link> : <Link className='btn btn-lg pt-1 btn-dark rounded-pill' href={`/login`}>Login</Link> )
                    }
                    {/* <Link className='btn btn-lg pt-1 btn-dark text-decoration-none rounded-pill' href={`/dashboard`}>Dashboard</Link> */}
                </div>
                </div>
            </div>
        </nav>
    )

}