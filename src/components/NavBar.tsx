// @ts-nocheck

import { Button } from "./ui/button"
import { setLoggedIn } from "@/redux/productSlice";
import { useDispatch, useSelector } from "react-redux";


const NavBar = () => {

    const { isLoggedIn } = useSelector((state) => state.products) 

    const dispatch = useDispatch()

 
    const handleLogout = () => {
        dispatch(setLoggedIn(false))
    }

  return (
    <div className="w-[100%] p-5 border">
        <div className="flex flex-row justify-between lg:max-w-[60%] mx-auto">
            <div>  
                <h1 className="font-bold text-xl">Stockflow.js</h1>
            </div>
            <div>
                {isLoggedIn ? <Button variant="destructive" onClick={handleLogout}>Sair</Button> : <div></div>}
            </div>
        </div>
    </div>
  )
}

export default NavBar