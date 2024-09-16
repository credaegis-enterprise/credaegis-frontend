import { MyButton } from "@/components/buttons/mybutton";
import { Checkbox } from "@nextui-org/react";


const ApproveCertificates = () => {
    const certificates = [
        {
            eventName: "Tech Conference 2024 sckskjcbjkbkjbcjkkjsbskjbxkjsbxjknjksxjkskbsxjkbxsjbxsbkjxbkjsbkjbxskbxjkbskjxkjxbkjsbxjkbxkjsbkjsbxkjsxkjbxsjkbxskjbxksbxkjxbsjkxbjksbxkjsbxkjsbxjk",
            issuedTo: "John Doe",
            uploadedBy: "Admin",
            expiry: "2025-01-01",
            comments: "Pending review",
        },
        {
            eventName: "Tech Conference 2024",
            issuedTo: "John Doe",
            uploadedBy: "Admin",
            expiry: "2025-01-01",
            comments: "Pending review",
        },
      
       

    ];

    return (
        
        <div className="h-full border dark:border-stone-800 rounded-lg p-4 w-full">
        <div className="h-full overflow-x-auto w-full">
            <div className="overflow-y-auto h-full">
                <table className="min-w-full table-fixed">
            
                    <thead className="bg-gray-100 dark:bg-stone-900 sticky top-0 z-30">
                        <tr>
                            <th className="px-4 py-2 text-left">Event Name</th>
                            <th className="px-4 py-2 text-left">Issued To</th>
                            <th className="px-4 py-2 text-left">Uploaded By</th>
                            <th className="px-4 py-2 text-left">Expiry</th>
                            <th className="px-4 py-2 text-left">Comments</th>
                            <th className="px-4 py-2 text-center w-12 "></th>
    
                        </tr>
                    </thead>
                    <tbody>
                        {certificates.map((certificate, index) => (
                            <tr key={index} className="border-b dark:border-stone-800  ">
                                <td className="px-4 py-2 break-words">{certificate.eventName}</td>
                                <td className="px-4 py-2 break-words">{certificate.issuedTo}</td>
                                <td className="px-4 py-2 break-words">{certificate.uploadedBy}</td>
                                <td className="px-4 py-2">{certificate.expiry}</td>
                                <td className="px-4 py-2">{certificate.comments}</td>
                                <td className="px-4 py-2 flex">
                                    <Checkbox />
                                    </td>
                    
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    );
};

export default ApproveCertificates;
