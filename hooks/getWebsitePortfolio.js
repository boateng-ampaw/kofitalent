import { useState } from "react"
import useSWR from "swr"
import Link from "next/link";
import {Modal} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { FiBriefcase, FiMessageSquare, FiBox, FiShoppingBag, FiBook, FiExternalLink } from 'react-icons/fi'


// const websiteSamples = [
//     {"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]},{"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"discountPercentage":17.94,"rating":4.44,"stock":34,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/2/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/2/1.jpg","https://i.dummyjson.com/data/products/2/2.jpg","https://i.dummyjson.com/data/products/2/3.jpg","https://i.dummyjson.com/data/products/2/thumbnail.jpg"]},{"id":3,"title":"Samsung Universe 9","description":"Samsung's new variant which goes beyond Galaxy to the Universe","price":1249,"discountPercentage":15.46,"rating":4.09,"stock":36,"brand":"Samsung","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/3/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/3/1.jpg"]},{"id":4,"title":"OPPOF19","description":"OPPO F19 is officially announced on April 2021.","price":280,"discountPercentage":17.91,"rating":4.3,"stock":123,"brand":"OPPO","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/4/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/4/1.jpg","https://i.dummyjson.com/data/products/4/2.jpg","https://i.dummyjson.com/data/products/4/3.jpg","https://i.dummyjson.com/data/products/4/4.jpg","https://i.dummyjson.com/data/products/4/thumbnail.jpg"]},{"id":5,"title":"Huawei P30","description":"Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.","price":499,"discountPercentage":10.58,"rating":4.09,"stock":32,"brand":"Huawei","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/5/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/5/1.jpg","https://i.dummyjson.com/data/products/5/2.jpg","https://i.dummyjson.com/data/products/5/3.jpg"]}
// ]

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function WebsitePortfolio(){
    const { data: websiteSamples,error} = useSWR('https://kofitalent.com/portfolio/?getwebsites=1',fetcher)
    const [show, setShow] = useState({canvas: false, modal: false});
    const handleClose = (what) => setShow({[what]:false});
    const handleShow = (what) => setShow({[what]:true});

    const showWebsitePortfolio = ()=>{
        // console.log('Show sample websites');
        handleShow('modal')
      }

      if(!websiteSamples) return <p className="mb-0 small">Loading...</p>

    return <>

<style global jsx>
   {`
       html {
          scroll-behavior: smooth !important;
        }

        .websitePortfolio a:hover p {
            color: #0d6efd !important;
        }
  `}

  </style>

        <Modal show={show.modal} onHide={()=>handleClose('modal')} contentClassName="border-0 rounded-4 p-3">
                <Modal.Header closeButton={false} className="d-flex border-0 justify-content-between align-items-center p-2">
                <Modal.Title>
                {/* <h3 className="text-black">Invoice #: {invoiceDetail.invoice_number}</h3> */}
                {/* <small className="text-secondary">{invoiceDetail.invoice_date}</small> */}
                </Modal.Title>
                <button type="button" className="btn-close fs-6 p-3" onClick={()=>handleClose('modal')}></button>
                </Modal.Header>
                <Modal.Body className="p-0 pb-4 px-lg-5">
                    <h4 className='mb-3 pb-2 text-black f-500'>A list of websites I have developed</h4>
                    {/* <h6 className='f-400 mb-5'>date</h6> */}
                    
                    {/* <h6 className='border-bottom pb-2 mb-3 text-black d-flex align-items-center'> To make payment follow the steps below:</h6> */}

                    <ListGroup variant="flush">

                    {
                        websiteSamples.websites.map((websiteSample,i)=>{
                            i++
                            return (
                                <ListGroup.Item key={websiteSample.id} className={`f-400 mb-0 px-0 d-flex websitePortfolio`}>
                                    <Link className='d-flex py-1 w-100 align-items-end justify-content-between' href={websiteSample.url} target="_blank">
                                        <div>
                                            <p className="mb-0 fs-5 lh-sm text-dark"><span className='small text-secondary pe-1'>{i}.</span>{websiteSample.title}</p>
                                            <span className='small text-secondary f-300'>{websiteSample.category}</span>
                                        </div>
                                        <span className="fs-5"><FiExternalLink /></span>
                                    </Link>
                                </ListGroup.Item>
                            )
                        })
                    }
                   

                    </ListGroup>
                </Modal.Body>
            </Modal>

            <span onClick={showWebsitePortfolio} className='btn btn-link p-0'>Websites I have worked on</span>
    </>
        
    
}