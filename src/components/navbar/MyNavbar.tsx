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

export default function MyNavbar() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

  useEffect(() => {
    const getUserRoles = async () => {
      try {
        const response = await myInstance.get("/auth/checker");
        console.log(response.data);
        setAccountType(response.data.accountType);
        setRole(response.data.role);
      } catch (error: any) {
        console.log(error);
      }
    };
    getUserRoles();
  }, [router]);

  console.log(accountType, role);

  const handleLogout = async () => {
    try {
      const response = await myInstance.post("/auth/logout");
      router.push("/login");
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <Navbar className="justify-end" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      </NavbarBrand>

 
      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        {(role === "admin" || role === "clusterAdmin") && (
          <NavbarItem>
            <Link href={`/credaegis/${accountType}/dashboard`}>dashboard</Link>
          </NavbarItem>
        )}

        {(role === "admin" || role === "clusterAdmin") && (
          <NavbarItem>
            <Link href={`/credaegis/${accountType}/approvals`}>approvals</Link>
          </NavbarItem>
        )}

        <NavbarItem>
          <Link href={`/credaegis/${accountType}/certificates`}>certificates</Link>
        </NavbarItem>

        <NavbarItem>
          <Link href={`/credaegis/${accountType}/settings`}>settings</Link>
        </NavbarItem>

        <NavbarItem
          onClick={() => {
            localStorage.setItem("path", window.location.pathname);
          }}
        >
          <Link href={`/verification`}>verification</Link>
        </NavbarItem>
      </NavbarContent>

    

    
      <NavbarMenu>
        {(role === "admin" || role === "clusterAdmin") && (
          <NavbarMenuItem>
            <Link href={`/credaegis/${accountType}/dashboard`}>dashboard</Link>
          </NavbarMenuItem>
        )}

        {(role === "admin" || role === "clusterAdmin") && (
          <NavbarMenuItem>
            <Link href={`/credaegis/${accountType}/approvals`}>approvals</Link>
          </NavbarMenuItem>
        )}

        <NavbarMenuItem>
          <Link href={`/credaegis/${accountType}/certificates`}>certificates</Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link href={`/credaegis/${accountType}/settings`}>settings</Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link href={`/verification`}>verification</Link>
        </NavbarMenuItem>
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
