
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { MyButton } from "../buttons/mybutton";
import { Spinner } from "@nextui-org/react";
import { ThemeSwitcher } from "../themes/themeSwitcher";
import Link from "next/link"; // Import Link from next/link

export default function MyNavbar() {
  return (
    <Navbar className="justify-center" maxWidth="full">
      <NavbarBrand>
        {/* Add content or logo here if needed */}
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        <NavbarItem>
          <Link href="/credaegis/organization/dashboard" >
            dasboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/login" >
            login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            
          </Link>
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
