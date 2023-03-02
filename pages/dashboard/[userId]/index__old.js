

export default function User(){
    return <div>
        User
    </div>
}


export const getServerSideProps = async (context)=>{
    const {params} = context

    const user_id = params.userId ? `user_id=${params.userId}` : ''

    // console.log(params);

    let resp = await fetch(`https://badmin.kofitalent.com/orders.php?${user_id}`,{
        credentials: 'include'
    })
    let data = await resp.json()

    // console.log(data);

    const orders = data.orders ? data.orders : []

    // const products = data.status === 'ok' && data.products.length ? data.products : []

    return {
        props: {
            orders
        }
    }
}