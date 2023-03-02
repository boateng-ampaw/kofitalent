import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import filter from 'lodash/filter';
import values from 'lodash/values';
import some from 'lodash/some';
import includes from 'lodash/includes';
import orderBy from 'lodash/orderBy';

const fetcher = async (url, params)=>{ 

    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');


    const resp = await fetch(`${url}?${queryString}`,{
        credentials: 'include'
    })
    const data = await resp.json()

    // console.log('SWR data',data);

    return data
}

export default function useGetUserOrders(filters){
    const {data,mutate, error} = useSWR([`https://badmin.kofitalent.com/orders.php`,{...filters,limit:60}],fetcher, { refreshInterval: 5000 })

    const router = useRouter()


    useEffect(()=>{
        // console.log('queryString', router.isReady, data);
    },[data])

    return {
        ordersData: data ? data : [],
        ordersLoading: !error && !data,
        ordersError: error,
        mutate
    }
}