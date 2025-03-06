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
import { GrAppsRounded, GrDocumentVerified, GrVmware, GrPerformance, GrValidate } from "react-icons/gr"; // ✅ Imported icons

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
    <Navbar className="justify-end" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
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

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        {[
          { name: "dashboard", icon: GrAppsRounded, label: "Dashboard" },
          { name: "approvals", icon: GrDocumentVerified, label: "Approvals" },
          { name: "certificates", icon: GrVmware, label: "Certificates" },
          { name: "settings", icon: GrPerformance, label: "Settings" }, // ✅ Updated to GrPerformance
        ].map(({ name, icon: Icon, label }) => (
          <NavbarItem key={name}>
            <Link
              href={`/credaegis/${accountType}/${name}`}
              className="transition-colors flex items-center gap-2"
              onClick={() => {
                setSelected(name);
                localStorage.setItem("currentPath", name);
              }}
            >
              <Icon
                className={`text-xl ${
                  selected === name ? "text-green-500" : "text-white hover:text-green-400"
                } transition duration-300`}
              />
              <span
                className={`text-sm font-medium ${
                  selected === name ? "text-green-500" : "text-white hover:text-green-400"
                } transition duration-300`}
              >
                {label}
              </span>
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Link
            href="/verification"
            className="transition-colors flex items-center gap-2"
            onClick={() => setSelected("verification")}
          >
            <GrValidate
              className={`text-xl ${
                selected === "verification" ? "text-green-500" : "text-white hover:text-green-400"
              } transition duration-300`}
            />
            <span
              className={`text-sm font-medium ${
                selected === "verification" ? "text-green-500" : "text-white hover:text-green-400"
              } transition duration-300`}
            >
              Verification
            </span>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right Section */}
      <NavbarContent justify="end" className="gap-4">
        {/* Notifications */}
        <NavbarItem onClick={() => { setNotificationPopup(true); getNotifications(); }}>
          <div className="flex gap-2">
            <BiBell className="text-2xl dark:text-white-600 hover:text-blue-500 dark:hover:text-green-500 hover:scale-110 transition duration-300 cursor-pointer" />
            {notificationCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full p-1 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
        </NavbarItem>

        {/* Theme Switch */}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        {/* Logout Button */}
        <NavbarItem>
          <MyButton
            className="bg-black dark:bg-white"
            size="sm"
            spinner={<Spinner size="sm" color="default" />}
            color="default"
            onClick={handleLogout}
          >
            <span className="dark:text-black text-white text-md font-medium">Logout</span>
          </MyButton>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
