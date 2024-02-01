// @ts-nocheck

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { setLoggedIn } from "@/redux/productSlice";
import { useDispatch } from "react-redux";
import { KeyRound } from "lucide-react";
import AnimatedPage from "./AnimatedPage";

const Login = () => {

    const dispatch = useDispatch()

 
    const handleClick = () => {
        dispatch(setLoggedIn(true))
    }
   

  return (
    <AnimatedPage>
        <div className="h-[50vh] w-[100%] flex flex-col items-center justify-center">
            <div className="flex flex-col max-w-[50%] items-center space-y-4">
                <h1 className="font-bold text-3xl">Olá,</h1>
                <p className="text-sm pb-3">Introduza as suas credenciais para entrar</p>
                <form className="space-y-2">
                    <Input type="email" placeholder="nome@exemplo.com"/>
                    <Input type="password"  placeholder="password"/>
                    <Button className="w-[100%]" onClick={handleClick}>Entrar<KeyRound className="h-3 w-3 ml-1"/></Button>
                </form>
                <div>
                    <p className="text-sm">Não tem uma conta?</p>
                    <p className="text-sm">Esqueceu a password?</p>
                </div>
                <p className="text-sm fixed bottom-10">(Esta é uma página demonstrativa, não precisa colocar credenciais nenhumas basta clicar em "Entrar")</p>
            </div>   
        </div>
    </AnimatedPage>
  )
}

export default Login