import { Autocomplete,AutocompleteItem } from "@nextui-org/react";
import { MyButton } from "@/components/buttons/mybutton";
import { MdSearch } from "react-icons/md";

const ApprovalControl = () => {
  return (
    <div className="flex flex-col border dark:border-stone-800 border-gray-200 mb-2 rounded-lg p-2 ">
        <div className="flex text-lg font-medium ml-2">
            <MdSearch size={26} />
            <div>
              Search and Filter
            </div>
        
        </div>
        <div className="flex flex-col lg:flex-row  gap-4 p-2">
        <Autocomplete
     
            label=" Cluster"
            placeholder="Select an Event"
            size="sm"
            className=""
        >
            <AutocompleteItem key="event1" value="Event 1">Event 1</AutocompleteItem>
            <AutocompleteItem key="event2" value="Event 2">Event 2</AutocompleteItem>
            <AutocompleteItem key="event3" value="Event 3">Event 3</AutocompleteItem>
        </Autocomplete>
        <Autocomplete
            label=" Event"
            placeholder="Select an Event"
            size="sm"
            className=""
        >
            <AutocompleteItem key="event1" value="Event 1">Event 1</AutocompleteItem>
            <AutocompleteItem key="event2" value="Event 2">Event 2</AutocompleteItem>
            <AutocompleteItem key="event3" value="Event 3">Event 3</AutocompleteItem>
        </Autocomplete>
        <div className="flex items-center gap-2">
        <MyButton 
            className="bg-green-400"
            size="md"
        >
            <span className="text-black text-md font-medium">
           Approve certificates
            </span>
            </MyButton>
            <MyButton
           className="bg-red-400"
            size="md"
        >
            <span className="dark:text-black text-white text-md font-medium">
            reject certificates
            </span>
            </MyButton>
            <MyButton
            className="bg-black dark:bg-white"
            size="md"
        >
            <span className="dark:text-black text-white text-md font-medium">
         Select All
            </span>
            </MyButton>
            </div>

         
        </div>
        
      </div>
  );
};

export default ApprovalControl;
