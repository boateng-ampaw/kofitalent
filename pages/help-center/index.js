import Head from 'next/head'
import Nav from '../../components/layout/nav'
import Link from "next/link"

export default function HelpCenter(){
    return <>
    <Head>
        <title>Help Center</title>
    </Head>
{/* <nav className="sticky-top bg-black py-3 border-bottom">
    <div className='container'>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <Link href={`/`}>
            Logo
            </Link>
          </div>
          <div className='text-center'><h2 className='secondary-font mb-0'>Help center</h2></div>
          <div>
            <Link className='btn me-3' href={`/help-center`}>Help</Link>
            <Link className='btn btn-lg pt-1 btn-dark rounded-pill' href={`/login`}>Login</Link>
          </div>
        </div>
    </div>
  </nav> */}

  <Nav pageTitle='Help center' />

  <main>
  <div className='container pt-5 mt-5'>
      <div className='row gx-lg-5 align-items-center'>
        <div className='col-lg-12 mb-5 mb-lg-0'>
          <div className='row'>
            
            <div className='col-lg-6 mb-4'>
                <div className='helpItem pb-4 border-bottom border-secondary h-100'>
                  <h3 className='mb-3 '>Help title</h3>
                  <div className='fw-light  fs-6 lh-base'>
                    <p>The security and integrity of your data are critically important for us, and we’ve built our services around this idea. Once your information enters Typeform’s systems (located in AWS), it’s secured with multiple levels of encryption and access controls, for example:</p>
                  </div>
                </div>
            </div>

            <div className='col-lg-6 mb-4'>
                <div className='helpItem pb-4 border-bottom border-secondary h-100'>
                  <h3 className='mb-3 '>Help title</h3>
                  <div className='fw-light  fs-6 lh-base'>
                    <p>The security and integrity of your data are critically important for us, and we’ve built our services around this idea. Once your information enters Typeform’s systems (located in AWS), it’s secured with multiple levels of encryption and access controls, for example:</p>
                  </div>
                </div>
            </div>

            <div className='col-lg-6 mb-4'>
                <div className='helpItem pb-4 border-bottom border-secondary h-100'>
                  <h3 className='mb-3 '>Help title</h3>
                  <div className='fw-light  fs-6 lh-base'>
                    <p>The security and integrity of your data are critically important for us, and we’ve built our services around this idea. Once your information enters Typeform’s systems (located in AWS), it’s secured with multiple levels of encryption and access controls, for example:</p>
                  </div>
                </div>
            </div>

            <div className='col-lg-6 mb-4'>
                <div className='helpItem pb-4 border-bottom border-secondary h-100'>
                  <h3 className='mb-3 '>Help title</h3>
                  <div className='fw-light  fs-6 lh-base'>
                    <p>The security and integrity of your data are critically important for us, and we’ve built our services around this idea. Once your information enters Typeform’s systems (located in AWS), it’s secured with multiple levels of encryption and access controls, for example:</p>
                  </div>
                </div>
            </div>

            <div className='col-lg-6 mb-4'>
                <div className='helpItem pb-4 border-bottom border-secondary h-100'>
                  <h3 className='mb-3 '>Help title</h3>
                  <div className='fw-light  fs-6 lh-base'>
                    <p>The security and integrity of your data are critically important for us, and we’ve built our services around this idea. Once your information enters Typeform’s systems (located in AWS), it’s secured with multiple levels of encryption and access controls, for example:</p>
                  </div>
                </div>
            </div>

            

          </div>
        </div>
      </div>
  </div>
  </main>

    
    </>
}