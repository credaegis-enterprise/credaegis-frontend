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
import { get } from "lodash";


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
        console.log(response.data);
        setAccountType(response.data.responseData.accountType);
        setRole(response.data.responseData.role);
        if(response.data.responseData.role === "CLUSTER_ADMIN"){
          getNotifications();
        }

        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };
    getUserRoles();
  }, [router]);



  console.log(accountType, role);

    const getNotifications = async () => {
      try {
        const response = await myInstance.get("member/account/notifications");
        setNotificationCount(response.data.responseData.length);
        setNotifications(response.data.responseData);
      } catch (error: any) {
        console.log(error);
      }
    }
  
   

  const handleLogout = async () => {
    try {
      const response = await myInstance.post("/member/auth/logout");
      router.push("/login");
      toast.success("Logout successful");
    } catch (error: any) {
      console.log(error);
    }
  };

  const isSelected = (menuItem: string) =>
    selected === menuItem ? "text-green-500" : "hover:text-green-400";



  return (
    <Navbar
      className="justify-end"
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <NavbarContent justify="start">
          <div
              className="sm:hidden w-16 h-16 flex items-center justify-center rounded-md bg-gray-100 dark:bg-black cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <NavbarMenuToggle
                className="sm:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </div>
        </NavbarContent>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        {role === "CLUSTER_ADMIN" && (
          <NavbarItem>
            {!loading ? (
              <Link
                href={`/credaegis/${accountType}/dashboard`}
                className={`${isSelected("dashboard")} transition-colors`}
                onClick={() => {
                  setSelected("dashboard");
                  localStorage.setItem("currentPath", "dashboard");
                }}
              >
                Dashboard
              </Link>
            ) : (
              <Spinner size="sm" color="default" />
            )}
          </NavbarItem>
        )}

        {role === "CLUSTER_ADMIN" && (
          <NavbarItem>
            {!loading ? (
              <Link
                href={`/credaegis/${accountType}/approvals`}
                className={`${isSelected("approvals")} transition-colors`}
                onClick={() => {
                  setSelected("approvals");
                  localStorage.setItem("currentPath", "approvals");
                }}
              >
                Approvals
              </Link>
            ) : (
              <Spinner size="sm" color="default" />
            )}
          </NavbarItem>
        )}

        <NavbarItem>
          {!loading ? (
            <Link
              href={`/credaegis/${accountType}/certificates`}
              className={`${isSelected("certificates")} transition-colors`}
              onClick={() => {
                setSelected("certificates");
                localStorage.setItem("currentPath", "certificates");
              }}
            >
              Certificates
            </Link>
          ) : (
            <Spinner size="sm" color="default" />
          )}
        </NavbarItem>

        <NavbarItem>
          {!loading ? (
            <Link
              href={`/credaegis/${accountType}/settings`}
              className={`${isSelected("settings")} transition-colors`}
              onClick={() => {
                setSelected("settings"),
                  localStorage.setItem("currentPath", "settings");
              }}
            >
              Settings
            </Link>
          ) : (
            <Spinner size="sm" color="default" />
          )}
        </NavbarItem>

        {role === "CLUSTER_ADMIN" && (

          <NavbarItem
            onClick={() => {
              localStorage.setItem("path", window.location.pathname);
            }}
          >
            {!loading ? (
            <Link
              href={`/verification`}
              className={`${isSelected("verification")} transition-colors`}
              onClick={() => setSelected("verification")}
            >
              Verification
            </Link>
          ) : (
            <Spinner size="sm" color="default" />
          )}
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {role === "CLUSTER_ADMIN" && (
          <NavbarMenuItem className="">
            <Link
                className={`${isSelected("dashboard")} transition-colors`}
                onClick={() => {setSelected("dashboard"); localStorage.setItem("currentPath", "dashboard");}}
                href={`/credaegis/${accountType}/dashboard`}>Dashboard</Link>
          </NavbarMenuItem>
        )}

        {role === "CLUSTER_ADMIN" && (
          <NavbarMenuItem>
            <Link
                className={`${isSelected("approvals")} transition-colors`}
                onClick={() => {setSelected("approvals"); localStorage.setItem("currentPath", "approvals");}}
                href={`/credaegis/${accountType}/approvals`}>Approvals</Link>
          </NavbarMenuItem>
        )}

        <NavbarMenuItem>
          <Link
                className={`${isSelected("certificates")} transition-colors`}
                onClick={() => {setSelected("certificates"); localStorage.setItem("currentPath", "certificates");}}
              href={`/credaegis/${accountType}/certificates`}>
            Certificates
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
                className={`${isSelected("settings")} transition-colors`}
                onClick={() => {setSelected("settings"); localStorage.setItem("currentPath", "settings");}}
              href={`/credaegis/${accountType}/settings`}>Settings</Link>
        </NavbarMenuItem>

        {role === "CLUSTER_ADMIN" && (
          <NavbarMenuItem>
            <Link
                className={`${isSelected("verification")} transition-colors`}
                onClick={() => setSelected("verification")}
                href={`/verification`}>Verification</Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>

      <NavbarContent justify="end" className="gap-4">

        {role && role === "CLUSTER_ADMIN" && (
         <NavbarItem
          onClick={() => {
            setNotificationPopup(true);
            getNotifications();
          }}
          className="flex items-center gap-2"  
        >
        <div className="flex gap-2">
          <BiBell className="text-2xl dark:text-white-600 hover:text-blue-500 dark:hover:text-green-500 hover:scale-110 transition duration-300 cursor-pointer" />
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
          <MyButton
            className="bg-black dark:bg-white"
            size="sm"
            spinner={<Spinner size="sm" color="default" />}
            color="default"
            onClick={handleLogout}
          >
            <span className="dark:text-black text-white text-md font-medium">
              Logout
            </span>
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
          } }        />
      )
        }
    </Navbar>
  );
}
