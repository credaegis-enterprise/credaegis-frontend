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

export default function OrganizationNavbar() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };
    getUserRoles();
  }, [router]);

  console.log(accountType, role);

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
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
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
                dashboard
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
                approvals
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
              certificates
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
              settings
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
              verification
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
            <Link href={`/credaegis/${accountType}/dashboard`}>dashboard</Link>
          </NavbarMenuItem>
        )}

        {role === "CLUSTER_ADMIN" && (
          <NavbarMenuItem>
            <Link href={`/credaegis/${accountType}/approvals`}>approvals</Link>
          </NavbarMenuItem>
        )}

        <NavbarMenuItem>
          <Link href={`/credaegis/${accountType}/certificates`}>
            certificates
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link href={`/credaegis/${accountType}/settings`}>settings</Link>
        </NavbarMenuItem>

        {role === "CLUSTER_ADMIN" && (
          <NavbarMenuItem>
            <Link href={`/verification`}>verification</Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>

      <NavbarContent justify="end" className="gap-4">
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
    </Navbar>
  );
}
