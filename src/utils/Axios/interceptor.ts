'use client';

import { useEffect, useRef } from 'react';
import  { AxiosError } from 'axios';
import { myInstance } from './axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ResponseInterceptor() {
  const interceptorId = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    interceptorId.current = myInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response) {
          toast.error((error.response.data as any)?.message || "An error occurred");
          switch (error.response.status) {
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
