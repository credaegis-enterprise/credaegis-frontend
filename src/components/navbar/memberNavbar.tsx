"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { BiBell } from "react-icons/bi";
import { GrAppsRounded, GrDocumentVerified, GrVmware, GrPerformance, GrValidate } from "react-icons/gr";
import { MyButton } from "../buttons/mybutton";
import { Spinner } from "@nextui-org/react";
import { ThemeSwitcher } from "../themes/themeSwitcher";
import Link from "next/link";
import { myInstance } from "@/utils/Axios/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NotificationType } from "@/types/notificationTypes";
import MyModal from "../modals/mymodal";
import NotifBoxMember from "../notification/notifBoxMember";

export default function OrganizationNavbar() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    if (!router) return;
    setLoading(true);
    const currentPath = localStorage.getItem("currentPath");
    setSelected(currentPath || "");
    const getUserRoles = async () => {
      try {
        const response = await myInstance.get("member/auth/session-check");
        setAccountType(response.data.responseData.accountType);
        setRole(response.data.responseData.role);
        if (response.data.responseData.role === "CLUSTER_ADMIN") {
          getNotifications();
        }
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };
    getUserRoles();
  }, [router]);

  const getNotifications = async () => {
    try {
      const response = await myInstance.get("member/account/notifications");
      setNotificationCount(response.data.responseData.length);
      setNotifications(response.data.responseData);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await myInstance.post("/member/auth/logout");
      router.push("/login");
      toast.success("Logout successful");
    } catch (error: any) {
      console.log(error);
    }
  };

  const isSelected = (menuItem: string) =>
    selected === menuItem ? "text-green-500" : "hover:text-green-400";

  return (
    <Navbar className="justify-center" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
        <NavbarMenuToggle className="sm:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarBrand>

      <NavbarContent className="flex gap-12 justify-center items-center" justify="center">
        {role === "CLUSTER_ADMIN" && (
          <NavbarItem>
            <Link
                onClick={()=>{
                  setSelected("dashboard");
                    localStorage.setItem("currentPath", "dashboard");
                }}
                href={`/credaegis/${accountType}/dashboard`} className={`${isSelected("dashboard")} transition-colors flex items-center gap-2`}>
              <GrAppsRounded /> Dashboard
            </Link>
          </NavbarItem>
        )}

        {role === "CLUSTER_ADMIN" && (
          <NavbarItem>
            <Link
                onClick={()=>{
                  setSelected("approvals");
                    localStorage.setItem("currentPath", "approvals");
                }}
                href={`/credaegis/${accountType}/approvals`} className={`${isSelected("approvals")} transition-colors flex items-center gap-2`}>
              <GrDocumentVerified /> Approvals
            </Link>
          </NavbarItem>
        )}

        <NavbarItem>
          <Link
            onClick={()=>{
                setSelected("certificates");
                localStorage.setItem("currentPath", "certificates");
            }}
              href={`/credaegis/${accountType}/certificates`} className={`${isSelected("certificates")} transition-colors flex items-center gap-2`}>
            <GrVmware />Certificate Upload
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            onClick={()=> {
              setSelected("settings");
              localStorage.setItem("currentPath", "settings");
            }}
              href={`/credaegis/${accountType}/settings`} className={`${isSelected("settings")} transition-colors flex items-center gap-2`}>
            <GrPerformance /> Settings
          </Link>
        </NavbarItem>

        {role === "CLUSTER_ADMIN" && (
          <NavbarItem
          onClick={()=>{
            localStorage.setItem("path",window.location.pathname);
          }}>
            <Link
                onClick={()=>{
                  setSelected("verification");
                }}
                href={`/verification`} className={`${isSelected("verification")} transition-colors flex items-center gap-2`}>
              <GrValidate /> Verification
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        {role && role === "CLUSTER_ADMIN" && (
          <NavbarItem onClick={() => { setNotificationPopup(true); getNotifications(); }}>
            <div className="flex gap-2 items-center cursor-pointer">
              <BiBell className="text-2xl dark:text-white-600 hover:text-blue-500 dark:hover:text-green-500 hover:scale-110 transition duration-300" />
              <span className="bg-red-500 text-white text-xs rounded-full p-1 flex items-center justify-center">
                {notificationCount}
              </span>
            </div>
          </NavbarItem>
        )}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <MyButton className="bg-black dark:bg-white" size="sm" spinner={<Spinner size="sm" color="default" />} color="default" onClick={handleLogout}>
            <span className="dark:text-black text-white text-md font-medium">Logout</span>
          </MyButton>
        </NavbarItem>
      </NavbarContent>
      {notificationPopup && role === "CLUSTER_ADMIN" && (
        <MyModal
          title=""
          onClose={() => setNotificationPopup(false)}
          size="md"
          isOpen={notificationPopup}
          backdrop="opaque"
          content={<NotifBoxMember notfications={notifications} getNotifications={getNotifications} />} button1={undefined} button2={undefined} onOpen={function (): void {
            throw new Error("Function not implemented.");
          } } />
      )}
    </Navbar>
  );
}
