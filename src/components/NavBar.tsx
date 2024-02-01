// @ts-nocheck

import { Button } from "./ui/button"
import { setDark, setLoggedIn } from "@/redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import logoImg from '../assets/logo.webp'
import logoDark from '../assets/logo-dark.webp'
import userImg from '../assets/user.png'
import { ModeToggle } from "./mode-toggle";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react";



const NavBar = () => {

    const { isLoggedIn } = useSelector((state) => state.products)

    const isDark = useSelector((state) => state.products.isDark)

    useEffect(() => {
        dispatch(setDark(localStorage.getItem('vite-ui-theme') || "light"))
    }, [])

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setLoggedIn(false))
    }

  return (
        <div className="w-[100%] p-5 border">
            <div className={isLoggedIn ? "flex flex-row justify-between lg:max-w-[1280px] mx-auto" : "flex flex-row items-center justify-center"}>
                <div className="flex flex-col items-center justify-center">  
                   <img className="h-[20px] md:h-[30px] lg:h-[35px] text-black" src={isDark === "light" ? logoImg : logoDark} alt="Stockflow.js"/>
                </div>
                <div>
                    {
                    isLoggedIn
                    ?
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex justify-center items-center flex-col h-[100%]"><Settings /></DropdownMenuTrigger>
                        <DropdownMenuContent className="space-y-2">
                            <DropdownMenuLabel>Definições</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <ModeToggle/>
                            <DropdownMenuItem onClick={handleLogout}><Button variant={"destructive"} className="w-[100%]">Sair</Button></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    : 
                    <div></div>}
                </div>
            </div>
        </div>
  )
}

export default NavBar