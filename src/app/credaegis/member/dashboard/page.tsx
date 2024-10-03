import { myInstanceNEXT } from "@/utils/Axios/axios";
import getCookies from "@/utils/cookies/getCookies";
import ManageAll from "@/components/pageComponents/dashboard/member/manageAll";


const fetchMembers = async () => {
  const cookie = getCookies();
  try {
    const response = await myInstanceNEXT.get("/member/cluster/getall", {
      headers: {
        cookie: `test=${cookie}`,
      },
    });
    return response.data.memberList;
  } catch (error: any) {
    console.log(error);
  }
};

const fetchEvents = async () => {
  const cookie = getCookies();
  try {
    const response = await myInstanceNEXT.get("/event/cluster/getall", {
      headers: {
        cookie: `test=${cookie}`,
      },
    });

    return response.data.eventList;
  } catch (error: any) {
    console.log(error);
  }
};

const Page = async () => {
  


  return (
      <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
 <ManageAll />
      </div>
  );
};

export default Page;
