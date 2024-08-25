"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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
    <Navbar className="justify-center" maxWidth="full">
      <NavbarBrand></NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        <NavbarItem>
          <Link href="/credaegis/organization/dashboard">dashboard</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/credaegis/organization/settings">settings</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">certificates</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <MyButton
            className=""
            size="sm"
            spinner={<Spinner size="sm" color="default" />}
            color="default"
            onClick={() => {
              handleLogout();
            }}
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
