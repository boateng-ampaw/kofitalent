import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import useAuthUser from '../../hooks/auth';
import useGetUserOrders from '../../hooks/getUserOrders';
import Dashboardstyles from '../../components/styles/dashboard/dashboard.module.css'
import DashboardLayoutWrap from '../../components/layout/dashboard/dashboard-layout-wrap';
import { HiOutlineExternalLink } from 'react-icons/hi'
// import { Badge, Button, Panel, Placeholder, Row, Col } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';
import Cookies from 'js-cookie'
import GetPostTest from '../../hooks/getPostsTest';

export default function Dashboard({orders, notifications}){
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

    
    return <>
    <div>
        Dashboard

        <div>
            {
                testData ? testData.updates.map(update=>{
                    return (
                    <div key={update.id}>
                        <Link href={`/dashboard/test-updates/${update.id}`}>
                            {update.title} - {update.date}
                        </Link>
                    </div>
                    )
                }) : null
            }
        </div>
    </div>
    </>
}


