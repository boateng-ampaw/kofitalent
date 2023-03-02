import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '../components/layout/nav-bar'
import IndexStyles from '../components/styles/index-page.module.css'
import Footer from '../components/layout/footer'
import { MdOutlineStorefront, MdOutlineEventAvailable, MdOutlinePersonalInjury } from 'react-icons/md'
import { TbLeaf, TbNews } from 'react-icons/tb'
import { FiBriefcase, FiMessageSquare, FiBox, FiShoppingBag, FiBook, FiExternalLink } from 'react-icons/fi'
import IndexPageUpdates from '../components/utils/ip-updates'
import WebsitePackages from '../hooks/getWebsitePackages'
import WebsitePortfolio from '../hooks/getWebsitePortfolio'



export default function Home() {

  useEffect(()=>{
    
  },[])

  return <>
  <Head>
    <title>KT Business</title>

    <meta name="description" content="Power your business with the perfect website" />

    {/* KEYWORDS */}
    <meta name="keywords" content="website developer, website developers in ghana, react js developer, next js developer in ghana, website developer jobs, ecommerce website developer, website developer near me, website developer and designer,frontend developer, backend developer, affordable website developer, best website developer, professional website developer, best website developer in ghana, website developer cost, website developer contract, cheapest website developer, digital website developer, website basic plan, website corporate plan, e-Commerce website, websites for businesses/corporate organizations, website for online shops and marketplaces, personal, corporate, blog/news portal, online store, online marketplace, non-profit, membership, event" />

    {/* OPEN GRAPH */}
    <meta property="og:title" content="Kofi Talent Business" />
    <meta property="og:image" content="/img/ip-hero-img.jpg" />
    <meta property="og:url" content="business.kofitalent.com" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Kofi Talent Business" />
    <meta property="og:description" content="Power your business with the perfect website"/>
   

    <meta name="twitter:title" content="<cms:show k_template_title />" />
    <meta name="twitter:description" content="Power your business with the perfect website" />
    <meta name="twitter:image" content="/img/ip-hero-img.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
 


  <NavBar />

  <header className={`${IndexStyles.header}`} >
    <div className='container'>
        <div className='row'>

            <div className='col-lg-8 mx-auto'>
                <div className={`text-center ${IndexStyles.landingPageWrap} d-flex flex-column align-items-center justify-content-center`}>
                    <h1 className={`${IndexStyles.indexHeroText} text-black mb-5 f-600 letter-spacing--2`}>Power your business with the perfect website</h1>
                    <Link className='kb-s-btn' href="#websitePlans" >See Packages</Link>
                </div>
            </div>


        </div>
    </div>
    <div className={`${IndexStyles.ipHeroImg} text-center mt-5 mt-lg-5`}> 
        <Image className='mx-auto' src={`/img/ip-hero-img.jpg`} width={2560} height={1975} alt="index hero image" priority />
    </div>
  </header>

  <main>

  <section className='mb-lg-4 pb-5'>
    <div className='container'>
        <div className='row'>
            <div className='col-12'>
                <div className='border-top pb-4 pt-5'>
                </div>
            </div>
            <div className='col-lg-10 mx-auto'>
                <div className=''>
                    <div className={`row gx-3 gy-4 justify-content-center flex-wrap ${IndexStyles.websiteTypesWrap}`}>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><MdOutlinePersonalInjury size={30} className="text-primary" /></span>
                            Personal
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><FiBriefcase size={30} className="text-primary" /></span>
                            Corporate
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><TbNews size={30} className="text-primary" /></span>
                            Blog/News Portal
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><FiShoppingBag size={30} className="text-primary" /></span>
                            Online Store
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><MdOutlineStorefront size={30} className="text-primary" /></span>
                            Online marketplace
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><TbLeaf size={30} className="text-primary" /></span>
                            Non-Profit
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><FiBook size={30} className="text-primary" /></span>
                            Membership
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><MdOutlineEventAvailable size={30} className="text-primary" /></span>
                            Event
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><FiMessageSquare size={30} className="text-primary" /></span>
                            Online Forum
                        </h1>
                        <h1 className='col-auto text-dark mb-0 d-flex align-items-center f-400'>
                            <span className='me-2 border rounded-3 p-2 p-lg-3 d-flex align-items-center shadow-sm'><FiBox size={30} className="text-primary" /></span>
                            Portfolio
                        </h1>
                    </div>

                    <div className='pt-5 d-lg-flex justify-content-center align-items-center text-center'><p className='text-center mb-1 mb-lg-0 pe-lg-2'>A list of the types of websites I develop. </p> <WebsitePortfolio /></div>
                </div>
            </div>
        </div>
    </div>
    </section>

    <section className='mb-lg-5 pb-5' id='websitePlans'>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='border-top pb-4 pt-5'>
                        <h3 className='letter-spacing--05 mb-0 text-black f-500'>Choose the plan that works best for you</h3>
                    </div>
                </div>
                <div className='col-12'>
                    <div>
                        <div className='row g-4'>
                            
                            <WebsitePackages />                            

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section className='mb-lg-5 pb-5'>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='border-top pt-3 pb-5'>
                        <h5 className='letter-spacing--05 mb-0 text-black f-500'>Updates</h5>
                    </div>
                </div>

                <div className='col-12'>
                    <div>
                        <IndexPageUpdates />
                        
                    </div>
                </div>

            </div>
        </div>
    </section>

  </main>

  <Footer />
    </>
}

