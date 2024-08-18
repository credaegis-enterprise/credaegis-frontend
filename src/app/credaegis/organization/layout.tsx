import MyNavbar from "@/components/navbar/myNavbar"


export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <MyNavbar /> 
        {children}
      </section>
    )
  }