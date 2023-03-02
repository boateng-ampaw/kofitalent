import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import NavBar from "../../components/layout/nav-bar"
import Footer from '../../components/layout/footer'
import UpdateStyles from '../../components/styles/updates/update.module.css'
import { MdOutlineArrowBack } from 'react-icons/md'

export default function Update({update}){
    const router = useRouter()

    if(router.isFallback) return (
        <div className="container">
          Loading...
        </div>)

    return <>
        <NavBar />

        <main>
            <section className='mb-lg-5 pb-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-7 mx-auto'>
                            <div className='pt-5 mb-3' >
                                <Link href="/updates" className='d-inline-flex align-items-center'>
                                    <MdOutlineArrowBack className='me-1' size={20} /> Back
                                </Link>                                
                            </div>
                            <div className='pt-3 pb-4 mb-4 pe-lg-5 border-bottom'>
                                <h1 className='letter-spacing--05 mb-0 text-black f-600' dangerouslySetInnerHTML={{__html: update.title}}></h1>
                            </div>

                            <div className='col-12 pt-2'>
                                <div className={`${UpdateStyles.updateContent} fs-5 lh-lg`} dangerouslySetInnerHTML={{__html: update.content}}>
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

export async function getStaticPaths(){

    let resp = await fetch(`https://badmin.kofitalent.com/notifications.php?limit=10`)
    let data = await resp.json()


    let paths = data.updates.map((update,i)=>{
        
        return {
            params: {
                updateId: update.slug.toString()
            }
        }
    })

    
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(context){
    const {params} = context


    // const page_id_query = params.updateId ? `p=${params.updateId}` : null
    // const resp = await fetch(`https://badmin.kofitalent.com/notifications.php?${page_id_query}`)
    // const update = await resp.json()

    const resp = await fetch(`https://badmin.kofitalent.com/notifications.php`)
    const data = await resp.json()

    const {updates} = data
    const update = updates.find(update=>update.slug === params.updateId)

    return {
        props: {
            update
        }
    }
}