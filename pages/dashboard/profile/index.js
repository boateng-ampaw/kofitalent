import { useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../../components/layout/nav-bar";
import Footer from "../../../components/layout/footer";
import useAuthUser from "../../../hooks/auth";
import Link from "next/link";
import DashboardLayoutWrap from "../../../components/layout/dashboard/dashboard-layout-wrap"
import { useForm } from "react-hook-form";
import { MdDone, MdInfo, MdOutlinePayment } from 'react-icons/md'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { forOwn } from "lodash";
import Cookies from "js-cookie";
import {Modal} from 'react-bootstrap';

export default function Profile({profile}){
    const router = useRouter()
    const {isLoading, isLoggedIn, loginError, mutate, data, errorStatus} = useAuthUser()
    const [editProfileData, setEditProfileData] = useState({title:'',type:'',name:'', value:'', error: ''})
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [profileUpdateError, setProfileUpdateError] = useState('')

    // const [userData, setUserData] = useState({name:'',email:'',phone:'',password:''})

    const [show, setShow] = useState({canvas: false, modal: false});

    const handleClose = (what) => setShow({[what]:false});
    const handleShow = (what) => setShow({[what]:true});

    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');


    const updateInfo = async (formData)=>{
        
        const profileUrl = `https://badmin.kofitalent.com/users/profile.php?updateProfile=1`

        // ?next_request=1

        // console.log('What are we editing', editProfileData.type);

        let fd = new FormData(); //Create a new form data instance

        for(const name in formData) {
            fd.append(name, formData[name]); //Append all form data from the react hook form to the form data instance
        }

        let hiddenInputsResp = await fetch(`${profileUrl}`,{
            method: 'GET',
            credentials: 'include',
            redirect: 'follow'
          })
        let hiddenInputsData = await hiddenInputsResp.text()
        var parser = new DOMParser();
        var doc = parser.parseFromString(hiddenInputsData, "text/html");

        const  hiddenElems = doc.querySelectorAll('input[type="hidden"]') // Use a GET request to get all hidden form input from the login API


        for(const hiddenInput of hiddenElems) {
            fd.append(hiddenInput['name'], hiddenInput['value']); // Append the hidden input values returned from the GET request to the form data instance
        }

        // for (var pair of fd.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        let loginResp = await fetch(`${profileUrl}`,{
            method: 'POST',
            body: fd,
            credentials: 'include',
            redirect: 'follow'
        })

        let updatedInfoData = await loginResp.json()

        // console.log(updatedInfoData);

        if(updatedInfoData.status === 'ok'){

            // console.log('Done updating');

            if(editProfileData.type === 'email'){
                // Cookies.remove('token');
                forOwn(Cookies.get(), function(value, key) { 
                    //  console.log(value, key);
                     Cookies.remove(key, value, { sameSite: 'strict' });
                   } )
                mutate(null)
                // router.push('/login?email_updated=1')
            }

            router.push(router.pathname)

            handleClose('modal')

            setToastMsg(updatedInfoData.status_msg)
            setShowToast(true)
        } else if(updatedInfoData.status === 'error'){

            setProfileUpdateError(updatedInfoData.status_msg)

        }
    }

    const editProfileItem = async (title,type,name,value)=>{
        reset()
        setEditProfileData({title,type,name,value})
        handleShow('modal')
    }


    return <>
    <Modal show={show.modal} onHide={()=>handleClose('modal')} contentClassName="rounded-4 border-0 p-3">
                <Modal.Header closeButton={false} className="d-flex border-0 justify-content-between align-items-center p-2">
                <Modal.Title>
                </Modal.Title>
                <button type="button" className="btn-close fs-6 p-3" onClick={()=>handleClose('modal')}></button>
                </Modal.Header>
                <Modal.Body className="p-0 pb-4 px-lg-5">
                    <h3 className='mb-1 pb-1 text-black mb-5'>Edit {editProfileData.title}</h3>
                    {
                        profileUpdateError.length ? (
                            <p className='text-danger small text-center'>{profileUpdateError.split("</b>")[1]}</p>
                        ) : ''
                    }
                    
                    <form onSubmit={handleSubmit(updateInfo)} autoComplete='off'>
            <div className="flex-grow-1 flex-shrink-0" style={{}}>
                {
                profile.map((profile_item,index)=>{
                    index++
                    return (editProfileData.name === profile_item.name) ? 
                        <div key={`update_item_${index}`} className={`form-floating`}>
                             <input type={profile_item.type} name={profile_item.name} className={`form-control bg-transparent text-black fs-6 ${errors?.[profile_item.name] ? 'is-invalid' : ''}`} id={profile_item.name} placeholder="name@example.com" {...register(profile_item.name,{ required:`${profile_item.title} is required`})} autoComplete={profile_item.type === 'password' ? 'new-password' : '' }   />
                            <label className='medium' htmlFor={profile_item.name}>{profile_item.title}</label>
                            {errors?.[profile_item.name] && <p className={`mb-0 mt-2 text-danger profile_itemall`} >{`${errors[profile_item.name].message}`}</p>}
                            {
                                profile_item.type !== 'password' ? (
                                    <p className="pt-2 small text-dark">Current {profile_item.title}: <span className="color-primary">{editProfileData.value}</span></p>
                                ) : ''
                            }
                            
                        </div>
                         : (
                        <input key={`update_item_${index}`} type='hidden' name={profile_item.name} value={profile_item.value} {...register(profile_item.name)} />
                    )
                                       
                                        
                })

                }
                <div className="mt-4">
                <button type="submit" className='btn btn-dark btn-lg w-100 rounded-4 py-3'>Update profile</button>
                </div>
            </div>  
            </form>  
                </Modal.Body>

{
    (editProfileData.type === 'email') ? (
         <p className="small text-center mb-0 alert alert-warning">You will be required to login again with your new email address</p>
    ) : ''
}
    </Modal>

    <ToastContainer className="p-3" position="top-end" containerPosition="fixed">
        <Toast onClose={() => setShowToast(false)} show={showToast} bg="success" delay={3000} autohide >
            <Toast.Header className="d-flex justify-content-end">
            </Toast.Header>
            <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
    </ToastContainer>
  

      <NavBar />
      <main>
    <section className='mb-lg-5 pb-5'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className='py-5'>
                        <h1 className='page-header letter-spacing--05 mb-4 text-black text-center f-500' >My Profile</h1>
                    </div>
                </div>

                <div className='col-12 pt-4 pt-lg-5'>                    
                        <div className='row gx-lg-5'>

                        <div className="col-4 d-none">
                            <div className="border rounded-4 p-4">
                                SOmething here
                            </div>
                        </div>

                        <div className="col-lg-6 mx-auto">
                            <div className='border rounded-4 px-lg-3 py-lg-4'>

                            {
                                    profile.map((profile_item,index)=>{
                                        index++
                                        return profile_item.name !== 'f_extended_user_password_repeat' ? (
                                            <div key={`profile_item_${index}`} className='py-1 px-3 rounded-2' style={{}}>
                                                <div className={`profileItem ${(index !== (+profile.length - 1)) ? 'border-bottom mb-3' : ''} pb-3`}>
                                                    <h5 className="mb-3 text-secondary">{profile_item.title}</h5>

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h5 className="fw-normal">{(profile_item.type === 'password') ? '*********' : profile_item.value}</h5>
                                                        <p className="pointer color-primary mb-0 fs-6" onClick={()=>editProfileItem(profile_item.title,profile_item.type,profile_item.name,profile_item.value)}>{profile_item.type === 'password' ? 'Update' : 'Edit'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    })
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


export const getServerSideProps = async (context)=>{
    const {params, query} = context

    const [loginResp, userResp] = await Promise.all([
        fetch(`https://badmin.kofitalent.com/apis/login-api.php`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: context.req.headers.cookie
        },
        redirect: 'follow'
        }),
        fetch(`https://badmin.kofitalent.com/users/profile.php?getProfile=1&next_request=1`,{
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

    let data = await userResp.json()
    
    const profile = data || []


    return {
        props: {
            profile
        }
    }
}