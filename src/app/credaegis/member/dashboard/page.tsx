import { myInstanceNEXT } from "@/utils/Axios/axios";
import getCookies from "@/utils/cookies/getCookies";
import ManageAll from "@/components/pageComponents/dashboard/member/manageAll";


const fetchMembers = async () => {
  const cookie = getCookies();
  try {
    const response = await myInstanceNEXT.get("/member/member-control/get-all", {
      headers: {
        cookie: `test=${cookie}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

const fetchEvents = async () => {
  const cookie = getCookies();
  try {
    const response = await myInstanceNEXT.get("/member/event-control/get-all", {
      headers: {
        cookie: `test=${cookie}`,
      },
    });

    return response.data.events;
  } catch (error: any) {
    console.log(error);
  }
};

const Page = async () => {
  
  const membersPromise = fetchMembers();
  const eventsPromise = fetchEvents();
  const [members, events] = await Promise.all([membersPromise, eventsPromise]);
  console.log(members);

  return (
      <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
 <ManageAll members={members.members} events={events} clusterAdminUlid={members.clusterAdminUlid}/>
      </div>
  );
};

export default Page;
