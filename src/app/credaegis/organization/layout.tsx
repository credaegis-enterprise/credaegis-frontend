import MyNavbar from "@/components/navbar/MyNavbar";
import { TabProvider } from "@/context/tabContext";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <MyNavbar />

      <div className="flex-grow lg:overflow-hidden">
        <TabProvider>{children}</TabProvider>
      </div>
    </div>
  );
}
