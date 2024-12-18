'use client';

import { useEffect, useRef } from 'react';
import  { AxiosError } from 'axios';
import { myInstance } from './axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

function ResponseInterceptor() {
  const interceptorId = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    interceptorId.current = myInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error("Error response from the server:", error.response);
          switch (error.response.status) {
            case 403:

              router.push('/login');
            break;
            case 401:
    
              console.error("Unauthorized request");
              router.push('/login');
              toast.error((error.response.data as any)?.message);
              break;
            default:
              toast.error((error.response.data as any)?.message || "An error occurred");
              break;
          }
        } else {
          console.error("No response from the server:", error);
        }
        return Promise.reject(error);
      },
      

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
