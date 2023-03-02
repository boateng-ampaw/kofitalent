import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/layout/nav';
import NavBar from '../components/layout/nav-bar';
import { MdArrowBack, MdOutlineEmail } from 'react-icons/md'
import useAuthUser from '../hooks/auth';
import { useForm } from "react-hook-form";
import BarLoader from 'react-spinners/BarLoader'
import Cookies from 'js-cookie'
import forOwn from 'lodash/forOwn'


const loginURL = `https://badmin.kofitalent.com/apis/login-api.php?next_login=1`


export default function Login() {
    const [openFPForm, setOpenFPForm] = useState(false);
    const handleFPFormOpen = () => setOpenFPForm(true);
    const handleFPFormClose = () => setOpenFPForm(false);
    const [loginErrors, setLoginErrors] = useState({})
    const {isLoading, isLoggedIn, loginError, mutate, data} = useAuthUser()
    const router = useRouter()
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();   
    const [signInIsLoading, setSignInIsLoading] = useState(false)

    const [passwordResetStatus, setPasswordResetStatus] = useState({})


  const login = async (formData) => {
    setSignInIsLoading(true)

        let fd = new FormData(); //Create a new form data instance

        for(const name in formData) {
            fd.append(name, formData[name]); //Append all form data from the react hook form to the form data instance
        }

        let hiddenInputsResp = await fetch(`${loginURL}`,{
            method: 'GET',
            credentials: 'include',
            redirect: 'follow'
          })
    let hiddenInputsData = await hiddenInputsResp.text()
    var parser = new DOMParser();
    var doc = parser.parseFromString(hiddenInputsData, "text/html");

    const  hiddenElems = doc.querySelectorAll('input[type="hidden"]') // Use a GET request to get all hidden form input from the login API

    // console.log('Hidden elems',hiddenElems);

    for(const hiddenInput of hiddenElems) {
        fd.append(hiddenInput['name'], hiddenInput['value']); // Append the hidden input values returned from the GET request to the form data instance
    }

  //   for (var pair of fd.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]); 
  // }

    let loginResp = await fetch(`${loginURL}`,{
            method: 'POST',
            body: fd,
            'credentials': 'include',
            redirect: 'follow'
        })
        let loginData = await loginResp.json()


        if(loginData.isLoggedIn){
          Cookies.set('token', loginData.user.slug, { sameSite: 'strict' });


          forOwn(loginData.user.all_sessions, function(value, key) { 
            Cookies.set(key, value, { sameSite: 'strict' });
          } )

          router.push(`/dashboard/my-orders`)

      } else if(loginData.isLoginError) {
        setLoginErrors(loginData.loginErrors)
        setSignInIsLoading(false)
      }

    }

    const resetPassword = async (formData)=>{
      // console.log(formData);

      let fd = new FormData(); //Create a new form data instance

        for(const name in formData) {
            fd.append('k_user_name', formData[name]); //Append all form data from the react hook form to the form data instance
        }



        let hiddenInputsResp = await fetch(`https://badmin.kofitalent.com/users/lost-password.php`,{
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

    // console.log('Hidden elems',hiddenElems);

    // for (var pair of fd.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }

    let resetPasswordResp = await fetch(`https://badmin.kofitalent.com/users/lost-password.php`,{
      method: 'POST',
      body: fd,
      'credentials': 'include',
      redirect: 'follow'
  })
  let resetPasswordData = await resetPasswordResp.json()

  // console.log(resetPasswordData);


  setPasswordResetStatus(resetPasswordData)

    }


  return <>
    <Head>
        <title>Login</title>
    </Head>

    <style jsx>
      {
        `
        .loginHeroBGWrap {
          height: calc(100vh - 71px);
        }

        .loginHeroBG {
          // background-image: url('/img/login-hero-img-1.jpg');
          // background-repeat: no-repeat;
          // background-size: cover;
          // background-position: center top;
        }
        `
      }
    </style>

  <NavBar openFPForm={openFPForm} pageTitle='Login' />
  

  <main>
    <div className='container-fluid px-lg-0'>
      <div className='row g-0'>
        <div className='col-lg-6 d-none d-lg-block loginHeroBGWrap'>
          <div className='h-100 bg-light loginHeroBG position-relative'>
            <Image className='w-100 h-100' src='/img/login-hero-img-1.jpg' fill alt='Login hero image' style={{objectFit: 'cover', objectPosition: 'center top'}} priority />
          </div>
        </div>

        <div className='col-lg-6'>
          <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <div style={{maxWidth: '370px'}}>
            {
                openFPForm ? (
                    <div>
                        <div className='text-end'>
                        <div className='d-inline-flex align-items-center mb-5 pointer btn-dark rounded-pill p-2 pe-3' onClick={handleFPFormClose}><MdArrowBack className='me-1 fs-6' /><h6 className='mb-0'>Login</h6></div>
                        </div>
                        <div className='text-center mb-4'>
                        {/* <p className='mb-1 fs-3 secondary-font'>Reset your password</p> */}
                        <p className='px-2 px-lg-5 text-secondary fs-6 mb-5'>You&apos;ll receive instructions on how to reset your password and get you back on track.</p>
                        </div>
                        
                        <form onSubmit={handleSubmit(resetPassword)} autoComplete="off">
                            <div className='d-flex align-items-center rounded-2 border mb-3'>
                                <div className='flex-grow-0 flex-shrink-0 mx-2' style={{width: '20px'}}>
                                <MdOutlineEmail className="text-secondary fs-4" size={20} />
                                </div>
                                
                                <div className="flex-grow-1 flex-shrink-0" style={{}}>
                                  <div className={`form-floating`}>
                                  <input type="email" className={`form-control border-0 rounded-0 bg-transparent fs-6   ${errors?.reset_email ? 'is-invalid' : ''}`} id="resetEmail" placeholder="name@example.com" {...register('reset_email',{ required: "Email is required"})} />
                                  <label className='medium ' htmlFor="resetEmail">Email address</label>
                                  </div>                                
                                </div>
                            </div>
                                  {errors?.k_user_name && <p className={`mb-0 mt-2 text-danger small`} >{`${errors.reset_email.message}`}</p>}

                                  {
                                    Object.keys(passwordResetStatus).length ? (
                                      <p className={`${passwordResetStatus.status === 'ok' ? 'text-success' : 'text-danger'}  small text-center`}>{passwordResetStatus.message}</p>
                                    ) : null
                                  }

                            <button type="submit" className="btn btn-dark py-3 w-100 small">Submit</button>
                        </form>
                    </div>
                ) : (

                    <div className='mt-5 pt-4 mt-lg-0 pt-lg-0'>
                        <p className='mb-4 text-secondary text-center fs-6  mb-5'>Manage your orders, make payments and more...</p>
                        
                        {
                          Object.keys(loginErrors).length ? (
                            <div>{
                              loginErrors.map((loginErrorItem,i)=>{
                                return <p key={`error_${i}`} className='text-danger mb-3 text-center fs-6'>{loginErrorItem}</p>
                              })
                              }</div>
                          ) : null
                        }
                    <form onSubmit={handleSubmit(login)} autoComplete="off">
                    <div className="form-floating mb-3">
                    {/* <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" /> */}
                    <input type="email" className={`form-control  fs-6 ${errors?.k_user_name ? 'is-invalid' : ''}`} name="k_user_name" id="userEmail" placeholder="name@example.com" {...register('k_user_name',{ required: "Username is required"})} />
                    <label className='medium ' htmlFor="userEmail">Email address</label>
                    {errors?.k_user_name && <p className={`mb-0 mt-2 text-danger small`} >{`${errors.k_user_name.message}`}</p>}
                    </div>

                    <div className="form-floating mb-3">
                    {/* <input type="password" className="form-control" id="floatingPassword" placeholder="Password" autoComplete="new-password" /> */}
                    <input type="password" name="k_user_pwd" autoComplete="new-password" className={`form-control  fs-6 ${errors?.k_user_pwd ? 'is-invalid' : ''}`} id="userPassword" placeholder="Password" {...register('k_user_pwd',{ required: "Your password is required" })} />
                    
                    <label className='medium ' htmlFor="floatingPassword">Password</label>

                    {errors?.k_user_pwd && <p className={`mb-0 mt-2 text-danger small`} >{`${errors.k_user_pwd.message}`}</p>}

                    </div>

                    <div className='mb-4 text-center'>
                    <p className='btn-link mb-0 pointer d-inline-block small' onClick={handleFPFormOpen}>Forgot password?</p>
                    </div>
                    <div>
                    
                    <button type="submit" className="btn btn-dark py-3 w-100">{signInIsLoading ? <BarLoader color="#3565F4" /> : 'Submit'}</button>
                    </div>
                    </form>
                    </div>

                )
            }
            </div>
          </div>
        </div>

      </div>

    </div>


  </main>


    </>
}


export async function getServerSideProps({req,res}){

  const loginResp = await fetch(`https://badmin.kofitalent.com/apis/login-api.php`,{
    method: 'GET',
    credentials: 'include',
    headers: {
        Cookie: req.headers.cookie
    },
    redirect: 'follow'
    })


const loginData = await loginResp.json()


    if (loginData.isLoggedIn) {
        return {
          redirect: {
            destination: '/dashboard/my-orders',
            permanent: false,
          },
        }
      }

    return {
      props: {}
    }
}
