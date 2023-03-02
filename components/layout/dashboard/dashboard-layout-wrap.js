import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link"
import useAuthUser from "../../../hooks/auth";
// import { Badge, Button, Panel, Placeholder, Row, Col } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';
import { MdNotificationsNone, MdOutlineLogout, MdOutlineSpaceDashboard, MdOutlineAccountCircle } from 'react-icons/md'
import { BiShoppingBag } from 'react-icons/bi'
import { RiHome5Line } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'
import Dashboardstyles from '../../styles/dashboard/dashboard.module.css'
import Cookies from "js-cookie";

const fetcher = async (url, params)=>{ 

    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    // console.log('Page number',`${url}?${queryString}`);


    const resp = await fetch(`${url}?${queryString}`)
    const data = await resp.json()

    // console.log('All notifs',data);
    const unreadNotificationsCount = data.notifications.filter(notification=>!notification.isRead)

    // console.log('Unread notifs',unreadNotificationsCount);

    return unreadNotificationsCount.length
}

export default function DashboardLayoutWrap(props){
    const {isLoading, isLoggedIn, loginError, mutate, data} = useAuthUser()
    const {data:notificationsData, error: notificationsDataError} = useSWR([`https://badmin.kofitalent.com/notifications.php`,{...props.filters,user_id:'165aed9940232f352079006fe2d04db5'}],fetcher, { refreshInterval: 5000 })
    const router = useRouter()

    // const token = Cookies.get('token')

    useEffect(()=>{
        // console.log(data.logoutLink);
        // console.log('Is logged in',data);
        // if(!data?.user) {
        //     mutate(null)
        //     router.push('/login')
        // }
    },[data])

    const logout = async ()=>{

        // let resp = await fetch(`https://badmin.kofitalent.com/apis/login-api.php?act=logout&nonce=${token}&redirect=1`)
        let resp = await fetch(`${data.logoutLink}`,{
            credentials: 'include',
            redirect: 'follow'
        })
        let logoutData = await resp.json()

    // console.log(logoutData);

    if(logoutData.isLoggedIn === 0){
        Cookies.remove('token');
        mutate(null)
        router.push('/login')
    }


    }

    // if(isLoading) return '...'

    return (     
    <div className="page-wrap">

        <style jsx>
            {` 

            p.display-3 {
            font-size: 65px !important;
            }

            @media (max-width: '1199px') {
                p.display-3 {
                font-size: 65px !important;
                display: none
                }
            }

            `}
        </style>

        <nav className={`p-2 p-lg-5 ${Dashboardstyles.navWrap}`} >
            <div className="container rounded-4 px-lg-5 pb-4 d-flex flex-column justify-content-end" style={{backgroundColor: props.pageTitleBgColor || '#855BE2', height: '300px'}}>

                <div className="row align-items-end justify-content-lg-between">
                    <div className='col-lg-6 mb-4 mb-lg-0'>
                        <div>
                        <p className='fw-bold text-black secondary-font display-3 mb-0' style={{lineHeight: '1'}}>{props.pageTitle || 'Dashboard'}</p>
                        </div>
                    </div>

                    {/* <div className="col-lg-auto d-none">
                        <div className="d-flex align-items-start">
                            <div className="text-white text-center me-3">
                            <Link className="text-decoration-none d-inline-block" href={`/dashboard`}>
                                    <div className="d-inline-flex mb-0 align-items-center justify-content-center text-white mb-2 btn btn-dark rounded-pill" style={{height: '38px',width: '38px'}}>
                                        <span><MdOutlineSpaceDashboard size={25} /></span>
                                    </div>
                                    <p className="medium mb-0 text-white">Dashboard</p>
                                </Link>
                            </div>
                            <div className="text-white text-center me-3">
                                <Link className="text-decoration-none d-inline-block" href={`/dashboard/my-orders`}>
                                    <div className="d-inline-flex mb-0 align-items-center justify-content-center text-white mb-2 btn btn-dark rounded-pill" style={{height: '38px',width: '38px'}}>
                                        <span><BiShoppingBag size={25} /></span>
                                    </div>
                                    <p className="medium mb-0 text-white">My Orders</p>
                                </Link>
                            </div>
                            <div className="text-white text-center me-3">
                                <Link className="text-decoration-none d-inline-block" href={`/dashboard/notifications`}>
                                    <div className="d-inline-flex mb-0 align-items-center justify-content-center text-white mb-2 btn btn-dark rounded-pill" style={{height: '38px',width: '38px'}}>
                                    
                                    </div>
                                    <p className="medium mb-0 text-white">Notifications</p>
                                </Link>
                            </div>
                            <div className="text-white text-center me-3">
                                <Link className="text-decoration-none d-inline-block" href={`/dashboard/notifications`}>
                                    <div className="d-inline-flex mb-0 align-items-center justify-content-center text-white mb-2 btn btn-dark rounded-pill" style={{height: '38px',width: '38px'}}>
                                        <span><RiHome5Line  size={25} /></span>
                                    </div>
                                    <p className="medium mb-0 text-white">Home</p>
                                </Link>
                            </div>
                            <div className="text-white text-center">
                                <Link className="text-decoration-none d-inline-block" href={`/`} onClick={(e)=>{e.preventDefault(); logout()}}>
                                    <div className="d-inline-flex mb-0 align-items-center justify-content-center text-white mb-2 btn btn-dark rounded-pill" style={{height: '38px',width: '38px'}}>
                                        <span><MdOutlineLogout  size={25} /></span>
                                    </div>
                                    <p className="medium mb-0 text-white">Logout</p>
                                </Link>
                            </div>
                        </div>
                    </div> */}
                    
                    <div className='col-12 col-lg-auto'>
                        <div className="d-flex align-items-center" style={{height: '38px'}}>
                        <Link className='btn btn-dark rounded-pill me-3 text-decoration-none h-100' href={`/dashboard`} >Dashboard</Link>
                        <Link className='btn btn-dark rounded-pill me-3 text-decoration-none h-100' href={`/dashboard/my-orders`}>My Orders</Link>
                        {
                            (notificationsData > 0) ? (
                                <div as="span" className="me-3">
                                    <Link className='btn btn-dark rounded-circle text-decoration-none d-inline-flex align-items-center justify-content-center h-100' href={`/dashboard/notifications`} style={{width: '38px'}} >
                                    <span><MdNotificationsNone size={25} /></span>
                                    </Link>
                                </div>
                            ) : (
                                <Link className='btn btn-dark rounded-circle me-3 text-decoration-none d-inline-flex align-items-center justify-content-center h-100' href={`/dashboard/notifications`} style={{width: '38px'}} >
                                    <span><MdNotificationsNone size={25} /></span>
                                    </Link>
                            )
                        }

                        
                            <Link className="me-3 d-inline-block h-100 rounded-circle text-white bg-dark d-inline-flex align-items-center justify-content-center" href={`/dashboard/profile`} style={{width: '38px'}}>
                            <span><MdOutlineAccountCircle size={25} /></span>
                            </Link>
                            
                            <Link className="me-3 d-inline-block h-100 rounded-circle text-white bg-dark d-inline-flex align-items-center justify-content-center" href={`/`} style={{width: '38px'}}>
                                <RiHome5Line size={25} />
                            </Link>

                        <p className='btn btn-dark rounded-pill text-decoration-none mb-0 d-inline-flex align-items-center justify-content-center h-100' onClick={logout} style={{width: '38px'}} title="Logout"><span><MdOutlineLogout size={25} /></span></p>
                        </div>
                    </div>

                </div>

            </div>
        </nav>


        <main>
            {props.children}
        </main>

    </div>
    )
}