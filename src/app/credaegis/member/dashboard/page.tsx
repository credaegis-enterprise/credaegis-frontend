import { myInstanceNEXT } from "@/utils/Axios/axios";
import getCookies from "@/utils/cookies/getCookies";
import EventView from "@/components/pageComponents/dashboard/member/eventView";
import MemberView from "@/components/pageComponents/dashboard/member/memberView";

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
  const membersPromise = fetchMembers();
  const eventsPromise = fetchEvents();

  const [members, events] = await Promise.all([membersPromise, eventsPromise]);
  console.log(events);
  console.log(members);

  return (
    <div className="p-6 h-full bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 h-full">
        {/* Left Section */}
        <div className="lg:col-span-2 flex flex-col gap-5 overflow-auto">
          <div className="flex-1 border border-gray-200 dark:border-stone-800 box-border p-2 rounded-lg overflow-auto">
          <MemberView
              members={members}
              cluster_ulid={members[0]?.cluster_ulid}
            />
           
          </div>
          <div className="flex-1 border border-gray-200 dark:border-stone-800 box-border p-2 rounded-lg overflow-auto">
          <EventView
              events={events}
              cluster_ulid={events[0]?.cluster_ulid}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-5 border border-gray-200 dark:border-stone-800 rounded-lg p-2">
          To be implemented
        </div>
      </div>
    </div>
  );
};

export default Page;
