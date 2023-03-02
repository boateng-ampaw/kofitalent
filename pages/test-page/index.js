import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url,{
    method: 'GET',
    credentials: 'include',
    redirect: 'follow'
}).then(resp=>{
    console.log(resp);
    return resp.json()

}).then(data=>{
    // console.log(data);

    return data
})

export default function TestPage ({posts}) {
    const [ pageIsLoading, setPageIsLoading ] = useState(true)
    const { data, error, mutate} = useSWR(`https://badmin.kofitalent.com/apis/login-api.php`,fetcher)

    useEffect(()=>{
        // console.log(data?.user);

        if(data?.user){
        setPageIsLoading(false)
        } else {
            setPageIsLoading(true)
        }

    },[data])

    if(pageIsLoading) return <p>Page is Loading... </p>
    if(error) return <p>Oops! there seems to be an error somewhere...</p>

    return (
        <div>
            <h4>Test page</h4>

            <div className="container-fluid">
                <div className="row">
                {posts.map(post=>{
                    return (
                        <div key={post.id} className="col-3">
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        
                        </div>
                    )
                })}
                </div>
                
            </div>
        </div>
    )
}

export async function getStaticProps(){

    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts`)

    const data = await resp.json()

    console.log(data);

    return {
        props: {
            posts: data || []
        }
    }
}