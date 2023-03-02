import { useEffect } from "react";
import useSWR from "swr"
import Link from "next/link";
import Image from "next/image";
import IndexStyles from '../../components/styles/index-page.module.css'
import LoadingSkeleton from "./loading-skeleton";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function IndexPageUpdates(){
    const {data,error} = useSWR(`https://badmin.kofitalent.com/notifications.php`, fetcher)

    useEffect(()=>{
        // console.log('The data',data,'general_updates"');
    },[])

    if(!error && !data) return <p>Loading....</p>;
    
    if (error) <p>Loading failed...</p>;

    if (!data) return (
        <div className="row gy-3 gx-5">
            <LoadingSkeleton count={3} skeletonClass="col-6 col-md-4" >                    
                    <div className="d-flex align-items-center">
                        <Skeleton circle count={1} height={90} width={90} className="me-3" />
                        <div className="flex-shrink-0 flex-grow-1">
                            <Skeleton containerClassName="d-block" className="mb-2" count={1} height={40} />
                            <Skeleton containerClassName="d-block" count={0.5} height={10} />
                        </div>
                    </div>
            </LoadingSkeleton>            
        </div>);
    

    return (
        <div className='row gy-4'>

            {
                data.updates.map((item,index)=>{
                    index++
                    var currentDate = new Date(item.date);
                    return (
                        <div key={item.id} className='col-md-6 col-lg-3'>
                                 <Link className='d-block h-100' href={`/updates/${item.slug}`}>
                                    <div className={`${IndexStyles.updateWrap} rounded-4 h-100 d-flex align-items-center`}>
                                        <div className={`${IndexStyles.imgWrap} me-4 position-relative`}>
                                            <Image className='img-fluid' src={item.image || '/img/placeholder-logo.png'} fill style={{objectFit: 'cover'}} alt={item.title} />
                                        </div>
                                        <div className={`updateInfoW`}>
                                            <h5 className='f-300 medium lh-base text-black'>{item.title}</h5>
                                            <p className='grey-color f-300 mb-0 small'>{item.date}</p>
                                        </div>
                                    </div>
                                 </Link>
                            </div>
                    )
                })
            }
        </div>
    )
}