import React from "react";
import { NotificationType } from "@/types/notificationTypes";
import { MyButton } from "../buttons/mybutton";
import { myInstance } from "@/utils/Axios/axios";
import { toast } from "sonner";

interface NotifBoxMemberProps {
  notfications: NotificationType[];
  getNotifications: () => void;

}




const NotifBoxMember: React.FC<NotifBoxMemberProps> = ({ notfications,getNotifications }) => {


    const deleteAllNotifications = async () => {
        try{
            const response = await myInstance.delete("member/account/delete/notifications/all");
            toast.success(response.data.message);
            getNotifications();
        }
        catch(error: any){
            console.log(error);
        }
    }


    const deleteOneNotification = async (id: string) => {
        try{
            const response = await myInstance.delete(`member/account/delete/notifications/${id}`);
            toast.success(response.data.message);
            getNotifications();
        }
        catch(error: any){
            console.log(error);
        }
    }

  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
      <div className="text-lg font-semibold text-white">Notifications</div>
      <div className="text-sm text-green-500  bg-stone-800 px-2 py-1 rounded-full">
        {notfications.length}
      </div>
    </div>

    <div className="notif-box w-full max-h-80 overflow-y-auto   p-1 ">
      {notfications.length > 0 ? (
        notfications.map((notif) => (
          <div
            key={notif.id}
            className={`alert my-2 p-3 rounded-md ${
              notif.type === "ERROR"
                ? "border-red-600 text-red-400"
                : notif.type === "INFO"
                ? "bg-green-700 text-green-200 border-green-500"
                : "bg-gray-700 text-gray-300 border-gray-500"
            } border`}
          >
            <p className="font-medium">{notif.message}</p>
                <div className="flex  gap-4 p-2 justify-between">
                    <MyButton
                        className="bg-black dark:bg-white text-white dark:text-black"
                        size="sm"
                        color="default"
                        onClick={() => deleteOneNotification(notif.id)}
                        >
                            Mark as read
                        </MyButton>

                    <div className="flex justify-end gap-4 mt-2">
            <p className="text-sm text-gray-400 ">{new Date(notif.timestamp).toLocaleTimeString()}</p>
            <p className="text-sm text-gray-400">{new Date(notif.timestamp).toLocaleDateString()}</p>
            </div>

          </div>
          </div>
        ))
      ) : (
        <div className="text-gray-400 text-center">No notifications found</div>
      )}
    </div>
    {notfications.length > 0 && (
      <MyButton
        className=" bg-black dark:bg-white text-white dark:text-black"
        size="md"
        onClick={() => deleteAllNotifications()}
        >
            Mark all as read
        </MyButton>
    )}
    </div>
  );
};

export default NotifBoxMember;
