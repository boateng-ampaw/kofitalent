import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import useAuthUser from '../../../hooks/auth'
import Link from 'next/link'
import DashboardLayoutWrap from "../../../components/layout/dashboard/dashboard-layout-wrap"
// import Cookies from 'js-cookie'


export default function MyOrders({orders}){
    const router = useRouter()
    const {isLoading, isLoggedIn, loginError, mutate, data} = useAuthUser()

    if(isLoading) return 'Loading to orders...'

    return (
    <DashboardLayoutWrap pageTitle='My Orders' pageTitleBgColor='#8F9A9D'>
        <section className='py-4 mb-5'>
                <div className='container px-lg-5'>

                <div className='pt-4 pt-lg-5'>

                <div className='py-2 px-3 rounded-2' style={{}}>
                
                <div className='mb-4'>
                    <Link className={`btn btn-outline-dark btn-sm border px-3  rounded-pill text-decoration-none me-2 ${router.query.filter === undefined ? 'bg-color-primary' : null} `} href={`/dashboard/my-orders`}>All</Link>

                    <Link className={`btn btn-outline-dark btn-sm border px-3  rounded-pill text-decoration-none me-2 ${router.query.filter === 'active' ? 'bg-color-primary' : null} `} href={`/dashboard/my-orders?filter=active`}>Active</Link>
                    
                    <Link className={`btn btn-outline-dark btn-sm border px-3  rounded-pill text-decoration-none me-2 ${router.query.filter === 'expiring soon' ? 'bg-color-primary' : null} `} href={`/dashboard/my-orders?filter=expiring+soon`}>Expiring Soon</Link>                   

                    <Link className={`btn btn-outline-dark btn-sm border px-3  rounded-pill text-decoration-none me-2 ${router.query.filter === 'expired' ? 'bg-color-primary' : null} `} href={`/dashboard/my-orders?filter=expired`}>
                    Expired</Link>

                </div>

                <div className='row gy-4'>
                    {
                        orders.map((order,index)=>{
                            index++
                            return (
                                <Link key={order.order_id} className='col-12 d-block shadow-sm border rounded-3 p-3' href={`/dashboard/my-orders/${order.id}`}>
                                    <div className='fw-light d-flex'><span className='pe-3 -50'>{index}</span>
                                    <div className='flex-grow-1'>
                                        <div className='row'>
                                            <div className='col-lg-auto mb-2 mb-lg-0'>
                                                <small className='-50'>Order number</small>
                                                <h6 className=' medium'>
                                                {order.order_id}
                                                </h6>
                                            </div>
                                            <div className='col-lg-auto flex-grow-1'>
                                                <div>
                                                <h5 className='gradient-text'><span className='text-capitalize'>{order.order_service_types}</span>: {order.domain_name !== undefined ? order.domain_name : ''} {order.order_items.map(order_item=>{return (order_item.product_type === 'domain') ? `${order_item.domain_name}${order_item.product_name}` : ''})}</h5>
                                                <p className='small -50 pt-1 fw-light'>{order.order_status === 'Active' ? 'Expires' : ''} {order.order_expiry_date}</p>
                                                </div>

                                            </div>

                                            <div className='col-lg-auto ms-auto mt-3 mt-lg-0'>
                                                <div>
                                                <span className={`${(order.order_status === 'Active') ? 'bg-success text-black' : (order.order_status === 'Expiring soon') ? 'bg-warning text-black' : (order.order_status === 'Expired') ? 'bg-danger ' : (order.order_status === 'Pending setup') ? 'bg-dark ' : ''}  rounded-pill py-1 px-2 ms-lg-2 fw-normal`} style={{fontSize: '13px'}}>{order.order_status}</span>
                                                </div>
                                            </div>

                                        </div>
                                        
                                    </div>
                                    </div>                            
                                </Link>
                            )
                        })
                    }


                </div>

                </div>

                </div>

                </div>
        </section>
    </DashboardLayoutWrap>
    )
}

export const getServerSideProps = async (context)=>{
    const {params, query} = context

    const { filter } = context.query

    const token = context.req?.cookies?.token;

    if (!token) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }

    const user_id = token ? `user_id=${token}` : null
    const filter_query = filter ? `filter=${filter}` : null

    let resp = await fetch(`https://badmin.kofitalent.com/orders.php?${user_id}&${filter_query}`,{
        credentials: 'include'
    })
    let data = await resp.json()

    // console.log(data);

    const orders = data.orders ? data.orders : []


    return {
        props: {
            orders
        }
    }
}