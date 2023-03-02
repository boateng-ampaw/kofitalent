
import useSWR from "swr"
import Link from "next/link"
import Image from "next/image"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import LoadingSkeleton from "../../utils/loading-skeleton"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import UpdateStyles from '../../../components/styles/updates/update.module.css'


const fetcher = (url)=>fetch(url,{
    method: 'GET',
    credentials: 'include',
    redirect: 'follow'
  }).then(resp=>resp.json()).then(data=>{
    // console.log(data);
    return data
  }).catch((error) => {
    // Your error is here!
    // console.log('Error from useAuth',error)
    return {"err_status" : true , "error_msg" : "Network request error"}
  });

export default function UpdatesComponent(){
    const token = Cookies.get('token')
    const router = useRouter()

    const user_id = token ? `user_id=${token}` : null
    const filter_query = router.query.filter ? `filter=${router.query.filter}` : null

    const {data,error} = useSWR(`https://badmin.kofitalent.com/notifications.php?${user_id}&${filter_query}`,fetcher)

    const isLoading = !data && !error && !data?.err_status;
    const loginError = error && error.status === 403;
    const errorStatus = data?.err_status 

    if(isLoading) return (
            <LoadingSkeleton count={3} skeletonClass="" >  
            <div className=" mb-4 pb-4 border-bottom">
                <div className="row gy-5"> 
                
                        <div className='col-lg-6'>
                            <div>
                            <Skeleton containerClassName="d-block" className="mb-2" count={1} height={80} />
                            <Skeleton containerClassName="d-block" className="mb-2" count={1} width={90} height={15} />
                            </div>
                        </div>
                        <div className="col-lg-3">
                        <Skeleton containerClassName="d-block" count={1} height={95} />
                        </div>

                        <div className="col-lg-3">
                            <Skeleton containerClassName="d-block" className="mb-2" count={1} height={95} />
                        </div>            
                </div>
            </div>
                      
            </LoadingSkeleton>
    )

    return (
        data.updates ? data.updates.map((update,index)=>{
            index++
            return (
                
            <div key={update.id} className={`${UpdateStyles.updateItem}`}>
            <Link className='text-black' href={`/dashboard/updates/${update.id}`} >
                <div className='row'>
                    <div className='col-lg-6'>
                        <h3 className={`mb-3 ${update.isRead ? 'f-500 text-secondary' : 'f-600 text-black'}`} dangerouslySetInnerHTML={{__html: update.title}}></h3>
                        <p className='mb-0 small grey-color'>{update.date}</p>
                    </div>
                    <div className={`${update.image ? 'col-lg-3' : 'col-lg-6'} mt-2 mt-lg-0`}>
                        <p dangerouslySetInnerHTML={{__html: update.excerpt}}></p>
                    </div>

                    {
                        update.image ? (
                            <div className='col-lg-3'>
                                <div className='position-relative' >
                                    <Image className='img-fluid rounded' src={update.image} width={500} height={500} alt={update.title} />
                                </div>
                            </div>
                        ) : null
                    }
                    
                </div>
            </Link>
            </div>
            )
        }) : []
        )
    
}