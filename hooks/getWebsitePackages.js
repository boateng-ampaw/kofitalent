import { useState } from "react";
import useSWR from "swr"
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import IndexStyles from '../components/styles/index-page.module.css'
import LoadingSkeleton from "../components/utils/loading-skeleton";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MdDone, MdClose, MdOutlineArrowBack, MdOutlineStorefront, MdCardMembership, MdOutlineForum, MdOutlineEventAvailable, MdOutlineCorporateFare, MdOutlinePersonalInjury } from 'react-icons/md'
import BarLoader from  'react-spinners/BarLoader'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function WebsitePackages(){
  const {data,error} = useSWR(`https://badmin.kofitalent.com/website-packages.php`, fetcher)

  const [packageData,setPackageData] = useState({})
  const [showMiniContactForm,setShowMiniContactForm] = useState(false)
  const [formLoadingState,setFormLoadingState] = useState(false)
  const [show, setShow] = useState({canvas: false, modal: false});
  const [packageReqMsg, setPackageReqMsg] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleClose = (what) => setShow({[what]:false});
  const handleShow = (what) => setShow({[what]:true});


  const showPackage = (e,data)=>{
    e.preventDefault()
    
    setPackageData(data)
    const { Modal } = typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.bundle.min.js') : null
    const packageModal = new Modal("#packageModal");

    // console.log(packageModal);
    packageModal.show();
  }

  const hidePackage = (e,data)=>{
    e.preventDefault();
    const { Modal } = typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.bundle.min.js') : null
    const packageModal = new Modal("#packageModal");

    packageModal.hide();
    
    // setPackageData(data)
  }



  const submitPhoneNumber = (data)=>{
    setFormLoadingState(true)
    // console.log(data, packageData.title);
    data['package'] = packageData.title

    let fd = new FormData();

    // fd.append('package', packageData.title);

    for(const name in data) {
        fd.append(name, data[name]);
     }    

    var requestOptions = {
        method: 'POST',
        body: fd,
        credentials: 'include',
        redirect: 'follow'
      };
      
      fetch(`https://badmin.kofitalent.com/website-packages.php?action=new_client`, requestOptions)
        .then(response => response.json())
        .then(result => {

            reset()

            setFormLoadingState(false)

            setPackageReqMsg(result.status_msg)
        })
        .catch(error => console.log('error', error));

  }

    if(!data) return (
        
            <LoadingSkeleton count={3} skeletonClass="col-md-6 col-lg-4" >                    
                    <div className="bg-light p-5 rounded-4 text-center">
                        <Skeleton count={1} height={10} className="mb-2" />
                        <Skeleton count={1} height={20} width={90} className="mb-5" />
                        <div className="">
                            <Skeleton containerClassName="d-block mb-4" className="mb-2" count={1} height={160} />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                        <Skeleton containerClassName="d-block flex-shrink-0 flex-grow-0" height={10} style={{width: '40px'}} />
                        <Skeleton containerClassName="d-block flex-shrink-0 flex-grow-0" height={10} style={{width: '90px'}} />
                        </div>
                    </div>
            </LoadingSkeleton>            
        
        )

    return <>
    
    
    <div className="modal fade" id="packageModal" tabIndex="-1" aria-labelledby="packageModalLabel" aria-hidden="true">
        <div className="modal-dialog position-relative">
            <div className="modal-content border-0 rounded-4 p-3">
            <div className="modal-header border-0">
                <h1 className="modal-title fs-5" id="packageModalLabel"></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e)=>hidePackage(e,{})}></button>
            </div>
            <div className="modal-body p-0 pb-4 px-lg-5">
                <h3 className='mb-2 pb-1 text-black'>{packageData?.title}</h3>


                <h6 className='f-300 mb-5'>{packageData?.description}</h6>

                <div className='text-start'>
                    <h6 className='border-bottom pb-2 mb-3'>What you get</h6>

                    <div>
                        <ul className='list-unstyled mb-3'>
                        {
                            packageData?.features?.map((feature,index)=>{
                                return (
                                    <li key={`package_feature_${index}`} className='mb-2 d-flex align-items-center text-balck'>
                                        <MdDone className='me-2 grey-color fs-5' /> <p className='fs-5 me-2 f-300 mb-0' dangerouslySetInnerHTML={{__html: feature}}></p> {feature === 'Free Domain' ? <small className='text-primary'>(Free for 1<sup>st</sup> year)</small> : ''}
                                    </li>
                                    
                                )
                            })
                        }
                        </ul>

                        <p className='pt-3 mb-4 border-top f-300 text-secondary medium'>Domain name and Hosting plan are subject to a yearly renewal.</p>

                        <button type="button" className='btn btn-dark btn-lg w-100 rounded-4 py-3' onClick={()=>setShowMiniContactForm(true)}>Get this plan</button>
                    </div>
                    
                </div>
            </div>
            <div className="modal-footer d-none">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Understood</button>
            </div>

            {
                showMiniContactForm ? (
                    <div className={`modal-extra-info rounded-4`}>
                        <div className='ps-5 pt-5 mb-3 d-inline-flex align-items-center pointer' onClick={()=>{setPackageReqMsg(''); setShowMiniContactForm(false)}}>
                            <MdOutlineArrowBack className='me-1' size={20} /> Back
                        </div>
                        <form className='p-3 px-lg-5 pt-3 pb-lg-5' onSubmit={handleSubmit(submitPhoneNumber)}>
                            <h4 className='mb-4 f-600'>Leave your number so we get back to you</h4>
                            <div className="form-floating mb-3">
                            <input type="tel" name="phone_number" className={`form-control rounded-4 fs-5 ${errors?.phone_number ? 'is-invalid' : ''}`} id="clientPhone" placeholder="+233245825504" {...register('phone_number',{ required: "Phone is required",
                            pattern: {
                                value: /^([0|\+[0-9]{1,5})?([0-9]{10})$/,
                                message: "Please enter a valid phone"
                            }
                            })} />
                            <label htmlFor="clientPhone">Your phone number</label>
                            {errors?.phone_number && <p className={`mb-0 mt-2 text-danger small`} >{`${errors.phone_number.message}`}</p>}
                            </div>
                            <button type="submit" className='btn btn-dark btn-lg w-100 rounded-4 py-3'>{formLoadingState ? <BarLoader color="#919090" speedMultiplier={3} width={50} /> : 'Submit'}</button>
                            {
                                packageReqMsg.length ? (
                                    <div className="svg-container text-center mt-3">    
                                    <svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 48 48" aria-hidden="true">
                                        <circle className="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
                                        <path className="tick" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
                                    </svg>
                                </div>
                                ) : ''
                            }


                        </form>
                    </div>
                ) : null
            }

            
            </div>
        </div>
    </div>
        {
                                data.packages.map(website_package=>{
                                    const {id,title,description,price,image} = website_package
                                    return (
                                        <div key={id} className='col-md-6 col-lg-4'>
                                            <div className={`${IndexStyles.packageWrap} p-5 rounded-4 text-center h-100 d-flex flex-column`}>
                                                <h6 className='f-400 grey-color mb-2'>{description}</h6>
                                                <h4 className='f-400 mb-4 text-black'>{title}</h4>

                                                <div className='mb-4 mt-auto'>
                                                    <Image className='img-fluid' src={image || `https://assets-global.website-files.com/5bfd6f4468ee7943c2d331dd/62fd0e52f183d8a50a96a80e_800x600%20Preview-p-800.png` } width={500} height={375} alt={title} />
                                                </div>

                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <h5 className='mb-0 f-400'>¢{price}</h5>
                                                    <Link className='kb-t-btn f-300' href={`/`} onClick={(e)=>showPackage(e,website_package)} >Learn more</Link>
                                                </div>


                                                <div className={`text-center border-top pt-3 mt-3 d-none`}>
                                                    <p className={`mb-0 ${IndexStyles.packageFooter} text-dark f-300 pointer d-inline medium`}>Terms apply</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

    </>
}