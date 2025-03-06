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
import { MyButton } from "../buttons/mybutton";
import { Spinner } from "@nextui-org/react";
import { ThemeSwitcher } from "../themes/themeSwitcher";
import Link from "next/link";
import { myInstance } from "@/utils/Axios/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BiBell } from "react-icons/bi";
import MyModal from "../modals/mymodal";
import { NotificationType } from "@/types/notificationTypes";
import NotifBoxOrganization from "../notification/notifBoxOrganization";
import { set } from "lodash";

export default function OrganizationNavbar() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);




  useEffect(() => {
    getNotifications();
  }, []);


  useEffect(() => {
    if (!router) return;

    const currentPath = localStorage.getItem("currentPath");
    setSelected(currentPath || "");
    const getUserRoles = async () => {
      try {
        const response = await myInstance.get(
          "organization/auth/session-check"
        );
        console.log(response.data);
        setAccountType(response.data.responseData.accountType);
        setRole(response.data.responseData.role);
      } catch (error: any) {
        console.log(error);
      }
    };
    getUserRoles();
  }, [router]);

  console.log(accountType, role);


  const getNotifications = async () => {
    try {
      const response = await myInstance.get("organization/account/notifications");
      setNotificationCount(response.data.responseData.length);
      setNotifications(response.data.responseData);
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleLogout = async () => {
    try {
      const response = await myInstance.post("/organization/auth/logout");
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
        <NavbarContent
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            justify="start">
          <NavbarMenuToggle

            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"

          />
        </NavbarContent>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        <NavbarItem>
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
        </NavbarItem>

        <NavbarItem>
          <Link
            href={`/credaegis/organization/approvals`}
            className={`${isSelected("approvals")} transition-colors`}
            onClick={() => {
              setSelected("approvals");
              localStorage.setItem("currentPath", "approvals");
            }}
          >
            Approvals
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            href={`/credaegis/organization/certificates`}
            className={`${isSelected("certificates")} transition-colors`}
            onClick={() => {
              setSelected("certificates");
              localStorage.setItem("currentPath", "certificates");
            }}
          >
            Certificates
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            href={`/credaegis/organization/settings`}
            className={`${isSelected("settings")} transition-colors`}
            onClick={() => {
              setSelected("settings"),
                localStorage.setItem("currentPath", "settings");
            }}
          >
            Settings
          </Link>
        </NavbarItem>

        <NavbarItem
          onClick={() => {
            localStorage.setItem("path", window.location.pathname);
          }}
        >
          <Link
            href={`/verification`}
            className={`${isSelected("verification")} transition-colors`}
            onClick={() => setSelected("verification")}
          >
            Verification
          </Link>
        </NavbarItem>
      </NavbarContent>
{/*//mobile view*/}
      <NavbarMenu>
        <NavbarMenuItem className="">
          <Link
              className={`${isSelected("dashboard")} transition-colors`}
            href={`/credaegis/${accountType}/dashboard`}
              onClick={() => {
                setSelected("dashboard");
                    localStorage.setItem("currentPath", "dashboard");
                    setIsMenuOpen(false);

              }}
            >Dashboard</Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
                className={`${isSelected("approvals")} transition-colors`}
              onClick={() => {
                setSelected("approvals");
                    localStorage.setItem("currentPath", "approvals");
                    setIsMenuOpen(false);
              }}
              href={`/credaegis/${accountType}/approvals`}>Approvals</Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
              className={`${isSelected("certificates")} transition-colors`}
              onClick={() => {
                setSelected("certificates");
                    localStorage.setItem("currentPath", "certificates");
                    setIsMenuOpen(false);
              }}
              href={`/credaegis/${accountType}/certificates`}>
            Certificates
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
                className={`${isSelected("settings")} transition-colors`}
                onClick={() => {
                    setSelected("settings"),
                        localStorage.setItem("currentPath", "settings");
                        setIsMenuOpen(false);
                }}
              href={`/credaegis/${accountType}/settings`}>Settings</Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
              className={`${isSelected("verification")} transition-colors`}
              onClick={() => setSelected("verification")}
              href={`/verification`}>Verification</Link>
        </NavbarMenuItem>
      </NavbarMenu>

      <NavbarContent justify="end" className="gap-4">
      <NavbarItem
  onClick={() => {
    setNotificationPopup(true);
    getNotifications();
  }}
  className="flex items-center gap-2"  
>

  <BiBell className="text-2xl dark:text-white-600 hover:text-blue-500 dark:hover:text-green-500 hover:scale-110 transition duration-300 cursor-pointer" />
  <span className="bg-red-500 text-white text-xs rounded-full p-1 flex items-center justify-center">
    {notificationCount}
  </span>
</NavbarItem>
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
      {notificationPopup && (
        <MyModal
          title=""
          onClose={() => setNotificationPopup(false)}
          size="md"
          isOpen={notificationPopup}
          backdrop="opaque"
          content={<NotifBoxOrganization notfications={notifications} getNotifications={getNotifications} />} button1={undefined} button2={undefined} onOpen={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )
        }
    </Navbar>
  );
}
