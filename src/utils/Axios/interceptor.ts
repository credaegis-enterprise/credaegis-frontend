'use client';

import { useEffect, useRef } from 'react';
import  { AxiosError } from 'axios';
import { myInstance } from './axios';
import { useRouter } from 'next/navigation';

function ResponseInterceptor() {
  const interceptorId = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    interceptorId.current = myInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response) {
            console.log("error in response interceptor");
            console.log(error.response.status);
          switch (error.response.status) {
            case 404:
              router.push('/404');
              break;
            case 403:
              router.push('/login');
              break;
            default:
              console.error("An unexpected error occurred:", error.response.status);
          }
        } else {
          console.error("No response from the server:", error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      if (interceptorId.current !== null) {
        myInstance.interceptors.response.eject(interceptorId.current);
      }
    };
  }, [router]);

  return null;
}

export default ResponseInterceptor;
