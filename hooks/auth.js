import { useState,useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Cookies from "js-cookie";
import { forOwn } from "lodash";


  const userFetcher = (url) => fetch(url,{
    credentials: 'include',
    redirect: 'follow'
  }).then((res) => res.json()).then(data =>{
    return data
  }).catch((error) => {
    return {"err_status" : true , "error_msg" : "Network request error"}
  });


  export default function useAuthUser(){
    const { data,mutate, error } = useSWR(`https://badmin.kofitalent.com/apis/login-api.php`, userFetcher, {revalidateOnMount: true});
    const router = useRouter()

    const isLoading = !data && !error && !data?.err_status ;
    const isLoggedIn = data?.isLoggedIn
    const isLoggedOut = data?.isLoggedOut
    const loginError = error && error.status === 403;
    const errorStatus = data?.err_status

 

      return {
        isLoading,
        isLoggedIn,
        loginError,
        data,
        errorStatus,
        isLoggedOut,
        mutate
      };

  }