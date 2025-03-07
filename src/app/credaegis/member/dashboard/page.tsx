import { myInstanceNEXT } from "@/utils/Axios/axios";
import getCookies from "@/utils/cookies/getCookies";
import ManageAll from "@/components/pageComponents/dashboard/member/manageAll";



const fetchEvents = async () => {
  const cookie = getCookies("CREDAEGIS_SESSION");
  try {
    const response = await myInstanceNEXT.get("/member/event-control/get-all", {
      headers: {
        cookie: `CREDAEGIS_SESSION=${cookie}`,
      },
    });


    return response.data.responseData;
  } catch (error: any) {
    console.log(error.message);
  }
};


const fetchMembers = async () => {
  const cookie = getCookies("CREDAEGIS_SESSION");
  try {
    const response = await myInstanceNEXT.get("/member/member-control/get-all", {
      headers: {
        cookie: `CREDAEGIS_SESSION=${cookie}`,
      },
    });


    return response.data.responseData.members;
  } catch (error: any) {
    console.log(error);
  }
};


const fetchStats = async () => {
  const cookie = getCookies("CREDAEGIS_SESSION");
  try {
    // const response = await myInstanceNEXT.get("/member/member-control/statistics/get-all", {
    //   headers: {
    //     cookie: `MEMBER_SESSION=${cookie}`,
    //   },
    // });
    return "stats";
  } catch (error: any) {
    console.log(error);
  }
}


const Page = async () => {
  
  const membersPromise = fetchMembers();
  const eventsPromise = fetchEvents();
  const statsPromise = fetchStats();
  const [members, events,stats] = await Promise.all([membersPromise, eventsPromise,statsPromise]);
  console.log("skkskskskss")
  console.log(members)
  console.log(events)
  

  return (
      <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 overflow-auto">
 <ManageAll members={members} events={events}  />
      </div>
  );
};

export default Page;
