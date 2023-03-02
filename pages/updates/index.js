import { useEffect } from "react"
import useSWR from "swr"
import Link from 'next/link'
import Image from 'next/image'
import IndexStyles from '../../components/styles/index-page.module.css'
import NavBar from "../../components/layout/nav-bar"
import Footer from '../../components/layout/footer'


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Updates(){
    // const url = 
    const {data,error} = useSWR(`https://badmin.kofitalent.com/notifications.php`, fetcher)

    useEffect(()=>{
        // console.log('The data',data,);
    },[])

    const isLoading = data === undefined
    const isError = !data && error

    if(!error && !data) return <p>Loading....</p>;
    // if (error) <p>Loading failed...</p>;
    // if (!data) return <h1>Loading...</h1>;

    return <>
        <NavBar />

        <main>
            <section className='mb-lg-5 pb-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 mx-auto'>
                            <div className='py-5'>
                                <h1 className='page-header letter-spacing--05 mb-4 text-black text-center f-500' >Updates</h1>
                            </div>
                        </div>

                        <div className='col-12'>
                            <div>
                                <div className='row gy-4 gx-lg-5 gx-lg-5'>
                                {
                                    !data ? (
                                        <div className='col-md-6 col-lg-6'>
                                            <p>Loading...</p>
                                        </div>
                                    ) : data.updates?.map((update,index)=>{
                                        index++
                                        return (
                                            <div key={update.id} className='col-md-6 col-lg-6'>
                                            <Link className='d-block h-100' href={`/updates/${update.slug}`}>
                                                <div className={`${IndexStyles.updateWrap} rounded-4 h-100 d-flex align-items-center`}>
                                                    <div className={`${IndexStyles.imgWrap} me-4 position-relative`}>
                                                        <Image className='img-fluid' src={update.image || '/img/placeholder-logo.png'} fill style={{objectFit: 'cover'}} alt={update.title} />
                                                    </div>
                                                    <div className={`updateInfoW`}>
                                                        <h5 className={`f-400 lh-base text-black`} dangerouslySetInnerHTML={{__html: update.title}}></h5>
                                                        <p className='grey-color f-300 mb-0 small'>{update.date}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        )
                                    })
                                }
                                   

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