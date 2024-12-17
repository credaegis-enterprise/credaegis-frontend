import OrganizationNavbar from "@/components/navbar/organizationNavbar";
import { TabProvider } from "@/context/tabContext";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <OrganizationNavbar />

      <div className="flex-grow lg:overflow-hidden">
        <TabProvider>{children}</TabProvider>
      </div>
    </div>
  );
}
