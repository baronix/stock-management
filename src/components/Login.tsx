// @ts-nocheck

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { setLoggedIn } from "@/redux/productSlice";
import { useDispatch } from "react-redux";
import { Ghost, KeyRound, UserRoundCheck } from "lucide-react";
import AnimatedPage from "./AnimatedPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

const Login = () => {

    const dispatch = useDispatch()

 
    const handleClick = () => {
        dispatch(setLoggedIn(true))
    }
   

  return (
    <AnimatedPage>
        <div className="h-[50vh] flex flex-col items-center justify-center">
            <Tabs defaultValue="Login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Login">Entrar</TabsTrigger>
                <TabsTrigger value="Registar">Registar</TabsTrigger>
            </TabsList>
            <TabsContent value="Login" >
                    <AnimatedPage>
                    <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Entrar</CardTitle>
                        <CardDescription>
                        Introduza as suas credenciais para entrar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="nome@exemplo.com" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="password">Username</Label>
                        <Input id="password" type="password" placeholder="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-[100%] justify-between items-center">
                            <Button onClick={handleClick}>Entrar <KeyRound className="h-3 w-3 ml-1"/></Button>
                            <Dialog>
                                <DialogTrigger className="text-sm">Esqueceu a password?</DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                    <DialogTitle>Recuperar password</DialogTitle>
                                    <DialogDescription>
                                        Introduza o seu email para redefinir a respetiva password.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <Input type="email" placeholder="nome@exemplo.com"/>
                                    <div className="w-[100%] flex justify-end space-x-2">
                                        <DialogClose asChild>
                                            <Button variant={Ghost}>Cancelar</Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button>Submeter</Button>
                                        </DialogClose>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardFooter>
                </Card>
                </AnimatedPage>
            </TabsContent>
            <TabsContent value="Registar">
                <AnimatedPage>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Registar</CardTitle>
                        <CardDescription>
                        Registe aqui a sua conta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="nome@exemplo.com" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="password">Username</Label>
                        <Input id="password" type="password" placeholder="password" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex w-[100%] items-center justify-center">
                        <Button onClick={handleClick}>Registar <UserRoundCheck className="h-4 w-4 ml-1"/></Button>
                    </CardFooter>
                </Card>
                </AnimatedPage>
            </TabsContent>
            </Tabs>
            <p className="text-sm fixed bottom-10"><span className="font-bold">PS:</span> Esta ainda é uma página demonstrativa, não precisa colocar credenciais nenhumas basta clicar em "Entrar"</p>
        </div>
    </AnimatedPage>
  )
}

export default Login