import MyNavbar from "@/components/navbar/MyNavbar";


export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <MyNavbar />

      <div className="flex-grow lg:overflow-hidden">
         {children}
      </div>
    </div>
  );
}
