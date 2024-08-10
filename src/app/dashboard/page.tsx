import React from 'react';
import myInstance from '@/utils/Axios/axios';
import {toast} from 'sonner';
import { redirect } from 'next/navigation';
import getCookies from '@/utils/cookies/getCookies';



const fetchClusters = async () => {

    const cookie = getCookies();
    console.log(cookie);
    try
    {
    const response = await myInstance.get('/api/cluster/getall',{
        headers:{
            cookie:`test=${cookie}`
        }
    });
    return response.data;
    }
    catch(error: any)
    {
        console.log(error.response?.data.message || "An error occurred");
    }

    redirect('/login');
}


const Page = async () => {


const clusters = await fetchClusters();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center text-blue-600">Static Page Title</h1>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">About This Page</h2>
        <p className="text-lg text-gray-700">
          This is a static page example created to demonstrate how a simple layout can be implemented
          in a React component. The content is static and does not change.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-5">
          <li className="text-lg mb-2">Feature 1: Static content display</li>
          <li className="text-lg mb-2">Feature 2: Basic layout styling with Tailwind CSS</li>
          <li className="text-lg mb-2">Feature 3: Responsive design with padding and margins</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-lg text-gray-700">
          For more information, please reach out to us at:
        </p>
        <p className="text-lg text-blue-600">contact@example.com</p>
      </section>
    </div>
  );
};

export default Page;
