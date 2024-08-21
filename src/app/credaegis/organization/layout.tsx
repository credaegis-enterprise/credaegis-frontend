import MyNavbar from "@/components/navbar/myNavbar"
import { TabProvider } from "@/context/tabContext"


export default function OrganizationLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
    
        <MyNavbar /> 
        <TabProvider>
        {children}
        </TabProvider>
      </section>
    )
  }