import { useState } from "react";
import Link from "next/link"
import useAuthUser from "../../../hooks/auth";
import { useRouter } from "next/router";
import NavBar from "../../../components/layout/nav-bar";
import Footer from "../../../components/layout/footer";
import { CgClose } from 'react-icons/cg'
import { MdDone, MdInfo, MdOutlinePayment, MdOutlineArrowBack } from 'react-icons/md'
import { FiInfo } from 'react-icons/fi'
import orderStyles from '../../../components/styles/dashboard/order.module.css'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Modal, Table} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner'



export default function MyOrder({order}){
    const router = useRouter()
    const {isLoading, isLoggedIn, loginError, mutate, data} = useAuthUser()
    const [hostingPackage, setHostingPackage] = useState({})
    const [invoiceDetail, setinvoiceDetail] = useState({})
    const [loadingState,setLoadingState] = useState({target:'',loading: false})


    const [show, setShow] = useState({canvas: false, modal: false});

    const handleClose = (what) => setShow({[what]:false});
    const handleShow = (what) => setShow({[what]:true});



    const getInvoiceDetails = async (id, target)=>{
        setLoadingState({target,loading: true})
        const resp = await fetch(`https://badmin.kofitalent.com/invoices.php?p=${id}&next_request=1`,{
            credentials: 'include'
        })
        const data = await resp.json()

        setinvoiceDetail(data)

        handleShow('modal')

        setLoadingState({target:'',loading: false})
    }

    const getPackageDetail =  async (package_id, target)=>{
        setLoadingState({target,loading: true})


        const resp = await fetch(`https://badmin.kofitalent.com/products.php?p=${package_id}&next_request=1`,{
            credentials: 'include'
        })
        const package_data = await resp.json()

        if(resp.status === 200){
            if(Object.keys(package_data).length){
                setHostingPackage(package_data)
                handleShow('canvas')

                setLoadingState({target:'',loading: false})
            }
        }
    }

    if(isLoading) return 'Loading to order...'



    return <>
    <style jsx>{`
            
            `}
    </style>

      <Offcanvas show={show.canvas} onHide={()=>handleClose('canvas')} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <h2 className='mb-4 text-black'>{hostingPackage.title} Plan</h2>

        <div className="mb-4">
        <ul className={`list-unstyled ${{}.websitePlan}`}>
            {
                hostingPackage.product_features?.map((product_feature,i)=>{
                    i++
                    return <li key={i} className='d-flex align-items-center fw-light mb-3'><MdDone className='me-2 text-secondary fs-5' /> <p className='mb-0' dangerouslySetInnerHTML={{__html: product_feature}}></p></li>
                })
            }
        </ul>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
      
    
      {
        Object.keys(invoiceDetail).length ? (
            <Modal show={show.modal} onHide={()=>handleClose('modal')} contentClassName="border-0 rounded-4 p-3">
                <Modal.Header closeButton={false} className="d-flex border-0 justify-content-between align-items-center p-2">
                <Modal.Title>
                </Modal.Title>
                <button type="button" className="btn-close fs-6 p-3" onClick={()=>handleClose('modal')}></button>
                </Modal.Header>
                <Modal.Body className="p-0 pb-4 px-lg-5">
                    <h3 className='mb-1 pb-1 text-black'>Invoice #: {invoiceDetail.invoice_number}</h3>
                    <h6 className='f-400 mb-5 medium text-secondary'>Date: {invoiceDetail.invoice_date}</h6>
                    
                    <h6 className='border-bottom pb-2 mb-3 text-black d-flex align-items-center'><MdOutlinePayment size={20} className='me-1' /> To make payment follow the steps below:</h6>

                    <ListGroup variant="flush">
                    <ListGroup.Item className="fs-5 f-300 mb-0 px-0 d-flex"><span>1.</span> <p className="ps-1 mb-0">Payment should be made to mobile money number 0245 82 55 04</p></ListGroup.Item>

                    <ListGroup.Item className="fs-5 f-300 mb-0 px-0 d-flex"><span>2.</span> <p className="ps-1 mb-0">Use invoice number* <span className="text-black">{invoiceDetail.invoice_number}</span> as reference.</p></ListGroup.Item>

                    <ListGroup.Item className="fs-5 f-300 mb-0 px-0 d-flex"><span>3.</span> <p className="ps-1 mb-0">Account name: <span className="text-black">Aaron Nana Ampaw Boateng</span></p></ListGroup.Item>

                    <ListGroup.Item className="small border-0 px-0">
                    <p className="pt-3 mb-3 f-400 text-secondary" style={{fontSize: '14px'}}>*This is a very important step as it helps me track your payment against your invoices.</p>
                    <p className="mb-0 text-primary">Double check the recipient name to  make sure you are sending to the right number.<br/> I will not be held liable if you send the payment to a wrong number.</p>
                    </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                {/* <Modal.Footer>
                <Button variant="secondary" onClick={()=>handleClose('modal')}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>handleClose('modal')}>
                    Save Changes
                </Button>
                </Modal.Footer> */}
            </Modal>
        ) : null

    }
      
    <NavBar />

    <main>
            <section className='mb-lg-5 pb-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 col-xl-7 mx-auto'>
                            <div className='pt-5 mb-3' >
                                <Link href={`/dashboard/my-orders`} className='d-inline-flex align-items-center'>
                                    <MdOutlineArrowBack className='me-1' size={20} /> Back
                                </Link>                                
                            </div>
                            <div className='pt-3 pb-4 mb-4 pe-lg-5 border-bottom'>
                                <h1 className='letter-spacing--05 mb-0 text-black f-600' >Order #: {order.order_id}</h1>
                                <div className={`${{}.meta} pt-3 pb-4`} >
                                    {
                                        order.order_items.map(order_item=>{
                                            return (order_item.product_type === 'domain') ? (
                                                <p key={order_item.product_id} className='fs-6 mb-2'>Domain name: {order_item.domain_name}{order_item.product_name}</p>
                                            ) : (
                                                <p key={order_item.product_id} className='fs-6 mb-0 d-flex align-items-center'>Hosting plan: {order_item.product_name} Package <span className="color-primary btn-link pointer ms-2" onClick={() => getPackageDetail(order_item.product_id,'package detail')} style={{fontSize: '13px'}}>{(loadingState.target === 'package detail') ? <Spinner as="span" size="sm" /> : <span><FiInfo size={20} /></span> }</span></p>
                                            )
                                        })
                                    }                

                                </div>
                            </div>

                            <div className='col-12 pt-2'>
                                <div className={``}>
                                <div className={`${{}.orderContent} row gx-lg-5`} >
                                    <div className="col-lg-7">
                                        <div>
                                            <div className="mb-1"><span className="h5 highlight" >Package status</span> : <span className={`fs-5 text-black ${(order.order_status === 'Active') ? '' : (order.order_status === 'Expiring soon') ? '' : (order.order_status === 'Expired') ? '' : null} fw-normal`}>{order.order_status}</span>
                                            </div>
                                            {
                                                order.order_expiry_date.length ? (
                                                    <p className="mb-3 f-400 text-secondary d-none medium">{(order.order_status === 'Expiring soon') ? 'Expiring' : (order.order_status === 'Expired') ? 'Expired' : null} on : {order.order_expiry_date}</p>
                                                ) : null
                                            }
                                            
                                            {
                                                (order.order_status === 'Expiring soon' || order.order_status === 'Expired') ? (
                                                    <p className="small lh-base f-300 text-dark mt-3 letter-spacing-2">
                                                    Your order is <span className="text-lowercase">{order.order_status}</span>. Renew before {order.order_expiry_date} to avoid losing your website. Thank you
                                                    </p>
                                                ) : null
                                            }
                                            
                                        </div>
                                    </div>

                                    {
                                        (order.order_status === 'Expiring soon' || order.order_status === 'Expired') ? <>
                                    <div className="col-lg-5">
                                        <div className="border border-1 border-secondary rounded-3 p-3">
                                            <h6 className="mb-3 text-black d-flex align-items-center"><MdInfo className="me-1" />Renewal information:</h6>
                                            <p className='fw-light mb-1'>Renew before: <span className="color-primary fw-normal">{order.order_expiry_date}</span></p>
                                        </div>
                                    </div>

                                            </> : null
                                    }  


                                    <div className={`${orderStyles.orderInvoicesWrap} d-none`}>
                                        
                                        <div className='mb-4 pb-3'>

                                        <Link className={`btn btn-outline-dark btn-sm border px-3  rounded-pill text-decoration-none me-2 ${router.query.filter === undefined ? 'active' : null} `} href={`/dashboard/my-orders/${router.query.orderId}`}>All</Link>

                                        <Link className={`btn btn-outline-dark btn-sm border px-3  rounded-pill text-decoration-none me-2 ${router.query.filter === 'active' ? 'active' : null} `} href={{
                                                            pathname: '/dashboard/my-orders/[orderId]',
                                                            query: { ...router.query,'filter': 'active' },
                                                        }}>Active</Link>

                                        <Link className={`btn btn-outline-dark btn-sm border px-3  rounded-pill text-decoration-none me-2 ${router.query.filter === 'expiring soon' ? 'active' : null} `} href={{
                                                            pathname: router.pathname,
                                                            query: { ...router.query,'filter': 'expiring soon' },
                                                        }}>Expiring</Link>                   

                                        <Link className={`btn btn-outline-dark btn-sm border px-3  rounded-pill text-decoration-none me-2 ${router.query.filter === 'expired' ? 'active' : null} `} href={{
                                                            pathname: router.pathname,
                                                            query: { ...router.query,'filter': 'expired' },
                                                        }}>
                                        Expired</Link>
                                        </div>

                                    </div>

                                    {
                                        order.invoices.length ? (
                                            <div className="col-lg-12 mt-5 fs-6 mx-auto">
                                                    <h5 className="mb-4 text-black">Invoices</h5>

                                                    <div className="">

                                                    <div className="table-responsive border rounded-4">
                                                    <Table responsive striped className="align-middle pb-0 mb-0" id="order-test-id">
                                                    <thead>
                                                        <tr>
                                                        <th className="py-4 ps-lg-3 fw-normal medium" scope="col">Invoice #</th>
                                                        <th className="py-4 fw-normal medium" scope="col">Date</th>
                                                        <th className="py-4 fw-normal medium" scope="col">Item</th>
                                                        <th className="py-4 fw-normal medium" scope="col">Status</th>
                                                        <th className="py-4 fw-normal medium" scope="col">Amount</th>
                                                        <th className="py-4 fw-normal medium text-center" scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="border-top">

                                                        {
                                                            order.invoices.map((invoice,i)=>{
                                                                i++
                                                                return (
                                                                    <tr key={invoice.invoice_number} className="">
                                                                    <th className={`py-3 ps-lg-3 fw-light ${(+order.invoices.length !== i) ? '' : 'border-bottom-0'}`} scope="row">{invoice.invoice_number}</th>
                                                                    <td className={`py-3 fw-light ${(+order.invoices.length !== i) ? '' : 'border-bottom-0'}`}>{invoice.invoice_date}</td>
                                                                    <td className={`py-3 f-500 ${(+order.invoices.length !== i) ? '' : 'border-bottom-0'}`}>{
                                                                        invoice.invoice_items.map(invoice_item=>{
                                                                            return (invoice_item.product_type === 'domain') ? `${invoice_item.domain_name}${invoice_item.product_name}` : `${invoice_item.product_type} : ${invoice_item.product_name}`
                                                                        })
                                                                        }</td>
                                                                    <td className={`py-3 fw-light medium ${(+order.invoices.length !== i) ? '' : 'border-bottom-0'}`}><Badge pill bg="dark" className="py-2 px-2 f-400">{invoice.payment_status}</Badge></td>
                                                                    <td className={`py-3 fw-light ${(+order.invoices.length !== i) ? '' : 'border-bottom-0'}`}>{`GHS${invoice.invoice_amount}`}</td>
                                                                    <td className={`py-3 fw-light text-center ${(+order.invoices.length !== i) ? '' : 'border-bottom-0'}`}><span>
                                                                <a className="btn btn-primary btn-sm rounded-pill px-3 text-decoration-none" onClick={() => getInvoiceDetails(invoice.id,invoice.id)}> {(loadingState.target === invoice.id) ? <Spinner as="span" size="sm" /> : 'Pay'}</a>
                                                                </span></td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                        
                                                    </tbody>
                                                    </Table>
                                                    </div>


                                                    </div>
                                                </div>
                                        ) : null
                                    }                  
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


export async function getServerSideProps(context){

    const {params} = context

    const page_id_query = params.orderId ? `p=${params.orderId}` : null

    const [loginResp, ordersResp] = await Promise.all([
        fetch(`https://badmin.kofitalent.com/apis/login-api.php`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: context.req.headers.cookie
        },
        redirect: 'follow'
        }),
        fetch(`https://badmin.kofitalent.com/orders.php?${page_id_query}`,{
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

      const order = await ordersResp.json()


    // const resp = await fetch(`https://badmin.kofitalent.com/orders.php?${page_id_query}`)
    // const order = await resp.json()

    return {
        props: {
            order
        }
    }
}