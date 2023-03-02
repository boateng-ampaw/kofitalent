import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingSkeleton({count,skeletonClass,children}){
    // console.log(props);
    return <>
        {[...Array(count)].map((x, i) =>{
        return (
        <div key={i} className={`${skeletonClass}`}>
            {children}
        </div>
        )
        
            
        }    
        )}
    </>
}