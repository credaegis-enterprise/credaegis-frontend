import MemberNavbar from "@/components/navbar/memberNavbar";
import { TabProvider } from "@/context/tabContext";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
        <MemberNavbar />

      <div className="flex-grow lg:overflow-hidden">
        <TabProvider>{children}</TabProvider>
      </div>
    </div>
  );
}
