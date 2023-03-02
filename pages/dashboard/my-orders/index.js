import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import useAuthUser from '../../../hooks/auth'
import IndexStyles from '../../../components/styles/index-page.module.css'
import NavBar from "../../../components/layout/nav-bar"
import Footer from '../../../components/layout/footer'
import ordersStyles from '../../../components/styles/dashboard/orders.module.css'
import { MdOutlineArrowBack } from 'react-icons/md'
import Cookies from 'js-cookie'
import { forOwn } from 'lodash'

export default function Orders({orders, isError}){
    const router = useRouter()
    const {isLoading, isLoggedIn, loginError, mutate, data} = useAuthUser()

   

    // if(isLoading) return 'Loading to orders...'

    return <>
        <NavBar />

        <main>
            <section className='mb-lg-5 pb-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8 mx-auto'>

                            <div className='py-5'>
                                <h1 className='page-header letter-spacing--05 mb-4 text-black text-center f-500' >My Orders</h1>
                            </div>

                            { isError.err_status ?  (
                                <div className='text-center'><h4 className=''>{isError.error_msg}</h4>
                                <p className='text-secondary'>Check your internet connection and refresh the page to try again</p>
                                </div>
                                ) : 
                                (!orders.length && !router.query.filter) ? (
                                    <div className=''>
                                        <h5 className='letter-spacing--04 mb-4 text-secondary f-400 text-center' >You have no orders</h5>
                                    </div>
                                ) : <>

                            <div className='col-12'>
                                <div className='mb-4 pb-3'>

                                    <Link className={`btn btn-outline-dark btn-sm border px-3 rounded-pill text-decoration-none me-2 mb-2 mb-lg-0 ${router.query.filter === undefined ? 'active' : null} `} href={`/dashboard/my-orders`}>All</Link>

                                    <Link className={`btn btn-outline-dark btn-sm border px-2 rounded-pill text-decoration-none me-2 mb-2 mb-lg-0 ${router.query.filter === 'active' ? 'active' : null} `} href={`/dashboard/my-orders?filter=active`}>Active</Link>
                                    
                                    <Link className={`btn btn-outline-dark btn-sm border px-2 rounded-pill text-decoration-none me-2 mb-2 mb-lg-0 ${router.query.filter === 'expiring soon' ? 'active' : null} `} href={`/dashboard/my-orders?filter=expiring+soon`}>Expiring</Link>                   

                                    <Link className={`btn btn-outline-dark btn-sm border px-2 rounded-pill text-decoration-none me-2 mb-2 mb-lg-0 ${router.query.filter === 'expired' ? 'active' : null} `} href={`/dashboard/my-orders?filter=expired`}>
                                    Expired</Link>

                                    <Link className={`btn btn-outline-dark btn-sm border px-2 rounded-pill text-decoration-none me-2 mb-2 mb-lg-0 ${router.query.filter === 'pending setup' ? 'active' : null} `} href={`/dashboard/my-orders?filter=pending setup`}>
                                    Pending setup</Link>
                                </div>

                                {(!orders.length && router.query.filter) ? <p>No {router.query.filter} orders</p> : ''}

                               { orders.map((order,index)=>{
                                    index++
                                    return (
                                        <div key={order.order_id} className={`${ordersStyles.order}`}>
                                        <Link className={`d-block border-0 rounded-3 p-3 alert ${(order.order_status === 'Active') ? 'alert-success' : (order.order_status === 'Expiring soon') ? 'alert-warning text-black' : (order.order_status === 'Expired') ? 'alert-danger' : (order.order_status === 'Pending setup') ? 'alert-primary ' : ''} `} href={`/dashboard/my-orders/${order.id}`}>
                                            <div className='row align-items-center'>
                                                <div className='col-4 col-lg-auto mb-2 mb-lg-0'>
                                                    <div className='small'>
                                                        #{order.order_id}
                                                    </div>
                                                </div>
                                                <div className='col-12 col-lg-5 mb-2 mb-lg-0'>
                                                    <div className={`medium ${ordersStyles.orderName} f-500 text-capitalize`}>
                                                    {order.order_service_types}: {order.domain_name !== undefined ? order.domain_name : ''} {order.order_items.map(order_item=>{return (order_item.product_type === 'domain') ? `${order_item.domain_name}${order_item.product_name}` : ''})}
                                                    </div>
                                                </div>
                                                <div className='col-6 col-lg-auto mt-1 mt-lg-0'>
                                                    <div className='small'>
                                                    {order.order_status === 'Active' ? 'Expires' : ''} {order.order_expiry_date}
                                                    </div>
                                                </div>
                                                <div className='col-auto ms-auto mt-1 mt-lg-0'>
                                                    <div className='small'>
                                                        <span className={`rounded-pill py-1 px-2 small ${(order.order_status === 'Active') ? 'bg-success text-white' : (order.order_status === 'Expiring soon') ? 'bg-warning text-black' : (order.order_status === 'Expired') ? 'bg-danger text-white' : (order.order_status === 'Pending setup') ? 'bg-primary text-white ' : ''}`}>{order.order_status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        </div>
                                    )
                                })
                                }
                                
                            </div>
                                
                                </>
                            }
                            



                        </div>

                    </div>
                </div>
            </section>
        </main>

        <Footer />
        </>
}

export const getServerSideProps = async (context)=>{
    const {params, query} = context

    const { filter } = query

    const filter_query = filter ? `filter=${filter}` : ''

    const [loginResp, ordersResp] = await Promise.all([
            fetch(`https://badmin.kofitalent.com/apis/login-api.php`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                Cookie: context.req.headers.cookie
            },
            redirect: 'follow'
            }),
            fetch(`https://badmin.kofitalent.com/orders.php?${filter_query}`,{
            credentials: 'include',
            headers: {
                Cookie: context.req.headers.cookie
            },
            redirect: 'follow'
            })
        ])


    const loginData = await loginResp.json()

    if (!loginData.isLoggedIn) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }
    
    const ordersData = await ordersResp.json()


    const resp = []

    const orders = ordersData.orders ? ordersData.orders : []
    const isError = resp.err_status ? resp : {}


    return {
        props: {
            orders,
            isError
        }
    }
}