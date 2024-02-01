import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useDispatch, useSelector } from "react-redux"
import { setDark } from "@/redux/productSlice"
import { useEffect } from "react"
import { Switch } from "@/components/ui/switch"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const dispatch = useDispatch()

  const handleLight = () => {
    setTheme("light")
    dispatch(setDark("light"))
  }

  const handleDark = () => {
    setTheme("dark")
    dispatch(setDark("dark"))
  }

  const isDark = useSelector((state) => state?.products?.isDark)

    useEffect(() => {
        dispatch(setDark(localStorage.getItem('vite-ui-theme')))
    }, [])

  return (
    <>
        <div onClick={ isDark === "light" ? handleDark : handleLight} className="flex justify-center items-center space-x-3 h-6 lg:h-8">
         <Switch/>
         {
            isDark == "light"
            ?
            <Moon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            :
            <Sun className="h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            
         }
        </div>
    </>
  )
}