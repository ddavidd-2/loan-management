import { NavBar } from "@/ui/NavBar/navbar"
import LoginStatus from "@/ui/NavBar/login-status"

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      {children}
    </div>
  )
}