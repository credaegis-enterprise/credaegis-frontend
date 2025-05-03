"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { MyButton } from "../buttons/mybutton";
import { Spinner } from "@nextui-org/react";
import { ThemeSwitcher } from "../themes/themeSwitcher";
import Link from "next/link";
import MyModal from "../modals/mymodal";
import { myInstance } from "@/utils/Axios/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BiBell } from "react-icons/bi";
import NotifBoxOrganization from "../notification/notifBoxOrganization";
import { GrAppsRounded, GrDocumentVerified, GrVmware, GrPerformance, GrValidate } from "react-icons/gr";

export default function OrganizationNavbar() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
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
        const response = await myInstance.get("organization/auth/session-check");
        setAccountType(response.data.responseData.accountType || "organization");
        setRole(response.data.responseData.role);
      } catch (error: any) {
        console.log(error);
      }
    };
    getUserRoles();
  }, [router]);

  const getNotifications = async () => {
    try {
      const response = await myInstance.get("organization/account/notifications");
      setNotificationCount(response.data.responseData.length);
      setNotifications(response.data.responseData);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await myInstance.post("/organization/auth/logout");
      router.push("/login");
      toast.success("Logout successful");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Navbar className="justify-between" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-12" justify="center">
        {[
          { name: "dashboard", icon: GrAppsRounded, label: "Dashboard" },
          { name: "approvals", icon: GrDocumentVerified, label: "Approvals" },
          { name: "certificates", icon: GrVmware, label: "Certificate Upload" },
          { name: "settings", icon: GrPerformance, label: "Settings" },
        ].map(({ name, icon: Icon, label }) => (
          <NavbarItem key={name}>
            <Link
              href={`/credaegis/${accountType}/${name}`}
              className="group flex items-center gap-2 transition-colors"
              onClick={() => {
                setSelected(name);
                localStorage.setItem("currentPath", name);
              }}
            >
              <Icon
                className={`text-xl transition duration-300 group-hover:text-green-400 ${
                  selected === name ? "text-green-500" : "text-gray-900 dark:text-white"
                }`}
              />
              <span
                className={`text-sm font-medium transition duration-300 group-hover:text-green-400 ${
                  selected === name ? "text-green-500" : "text-gray-900 dark:text-white"
                }`}
              >
                {label}
              </span>
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem >
          <Link
              href={`/verification`}
              className="group flex items-center gap-2 transition-colors"
              onClick={() => {
                setSelected("verification");
                localStorage.setItem("path",window.location.pathname);
              }}
          >
            <GrValidate
                className={`text-xl transition duration-300 group-hover:text-green-400 ${
                    selected === "verification" ? "text-green-500" : "text-gray-900 dark:text-white"
                }`}
            />
            <span
                className={`text-sm font-medium transition duration-300 group-hover:text-green-400 ${
                    selected === "verification" ? "text-green-500" : "text-gray-900 dark:text-white"
                }`}
            >
                Verification
              </span>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem onClick={() => { setNotificationPopup(true); getNotifications(); }}>
          <div className="flex gap-2">
            <BiBell className="text-2xl text-gray-900 dark:text-white hover:text-green-500 transition duration-300 cursor-pointer" />
            {notificationCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full p-1 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
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
            <span className="dark:text-black text-white text-md font-mediumtext-md font-medium">Logout</span>
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
      )}
    </Navbar>
  );
}