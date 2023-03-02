import useSWR from "swr";

const fetcher = (url)=> fetch(url).then(resp=>resp.json()).then(data=>{
        // console.log('Test data',data);

        return data
    })


export default function GetPostTest(){
    const {data,error} = useSWR(`https://badmin.kofitalent.com/notifications.php`,fetcher)

    return {
        data,
        error
    }

}