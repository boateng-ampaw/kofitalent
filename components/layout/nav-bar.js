import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import NavBarStyles from '../styles/navBar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import useAuthUser from '../../hooks/auth'
import { MdMenu } from 'react-icons/md'
import { FiX } from 'react-icons/fi'
import Cookies from "js-cookie";
import forOwn from 'lodash/forOwn'



export default function NavBar(){
    const {isLoading, isLoggedIn, loginError, mutate, data, errorStatus} = useAuthUser()
    const router = useRouter()
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const handleShowMenu = ()=>{
        setMenuIsOpen(true)
    }

    const handleCloseMenu = ()=>{
        setMenuIsOpen(false)
    }

    const toggleMenu = ()=>{
        setMenuIsOpen(!menuIsOpen)        
    }

    const logout = async ()=>{

        // let resp = await fetch(`https://badmin.kofitalent.com/apis/login-api.php?act=logout&nonce=${token}&redirect=1`)
        let resp = await fetch(`${data.logoutLink}`,{
            credentials: 'include',
            redirect: 'follow'
        })
        let logoutData = await resp.json()

    // console.log(logoutData);

    if(logoutData.isLoggedIn === 0){
        // Cookies.remove('token');
         forOwn(Cookies.get(), function(value, key) { 
            //  console.log(value, key);
             Cookies.remove(key, value, { sameSite: 'strict' });
           } )
        mutate(null)
        router.push('/login')
    }


    }

    useEffect(()=>{
        const bodyEl = document.querySelector('body');
        menuIsOpen ? bodyEl.classList.add('overflow-hidden') : bodyEl.classList.remove('overflow-hidden');
    },[menuIsOpen])

    return <>
        <nav className='sticky-top blur-bg'>
            <div className='container'>
                <div className='py-3 border-bottom position-relative'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            <Link href="/">
                                <Image src={`/img/kt-default-logo.png`}  width={30} height={22} alt="Default logo" />
                            </Link>
                        </div>

                        <div className=''>
                                        {/* <li className='mb-2'><Link className='d-block py-2' href="/about">About</Link></li> */}
                        {
                        errorStatus ? 'network error found' :
                        isLoading ? 'Loading' : (isLoggedIn && (Cookies.get('token') !== undefined) ? <>
                        <input type="checkbox" id="dashboardMenu" hidden />
                        <label htmlFor="dashboardMenu" className={`${NavBarStyles.dashboardNavMenu} pointer d-flex align-items-center rounded pe-1`}  onClick={toggleMenu} >{menuIsOpen ? <><FiX size={25} /> Close </> : <> <MdMenu size={25} className="me-1" /> Menu</> } </label>
                        {
                            menuIsOpen ? (
                                <div className={`${NavBarStyles.dashboardNavWrap} border rounded-4 shadow-sm global_dashboardNavWrap`} >
                                    <ul className='list-unstyled mb-0'>
                                        <li className=''><Link className='d-block py-2 text-dark border-bottom' href="/dashboard/my-orders">My Orders</Link></li>
                                        <li className=''><Link className='d-block py-2 text-dark border-bottom' href="/dashboard/updates">Updates</Link></li>
                                        <li className=''><Link className='d-block py-2 text-dark border-bottom' href="/dashboard/profile">Profile</Link></li>
                                        <li className=''><Link className='d-block py-2 text-dark' href="/dashboard/profile" onClick={(e)=>{e.preventDefault(); logout()}}>Logout</Link></li>
                                        <li className='border-top pt-3 mt-3'><Link className='text-secondary d-block py-2' href="/pvu">What&apos;s new?</Link></li>
                                    </ul>
                                </div>
                            ) : ''
                        }
                        
                        </> : <Link className='btn rounded-pill btn-dark' href="/login">Login</Link> )
                        }
                        </div>
                    </div>
                </div>
            </div>         
        
        {
            menuIsOpen ? <div className={`${NavBarStyles.menuBG}`} onClick={toggleMenu} ></div> : ''
            }   
        </nav>
    </>
}