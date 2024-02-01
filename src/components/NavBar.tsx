// @ts-nocheck

import { Button } from "./ui/button"
import { setLoggedIn } from "@/redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import logoImg from '../assets/logo.webp'
import userImg from '../assets/user.png'


const NavBar = () => {

    const { isLoggedIn } = useSelector((state) => state.products) 

    const dispatch = useDispatch()

 
    const handleLogout = () => {
        dispatch(setLoggedIn(false))
    }

  return (
        <div className="w-[100%] p-5 border">
            <div className={isLoggedIn ? "flex flex-row justify-between lg:max-w-[1280px] mx-auto" : "flex flex-row items-center justify-center"}>
                <div className="flex flex-col items-center justify-center">  
                    <img className="h-[20px] md:h-[30px] lg:h-[100%]" src={logoImg} alt="Stockflow.js"/>
                </div>
                <div>
                    {
                    isLoggedIn
                    ?
                    <div className="flex space-x-4 items-center">
                        <img className="h-5 lg:h-10" src={userImg} alt="" />
                        <Button variant="destructive" className="h-6 lg:h-8" onClick={handleLogout}>Sair</Button> 
                    </div>
                    : 
                    <div></div>}
                </div>
            </div>
        </div>
  )
}

export default NavBar