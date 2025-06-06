import LoginStatus from "./login-status";
import Link from "next/link";

export function NavBar() {
  return (
    <div className="flex flex-row justify-between p-0.5">
      <Link href='/' className='font-bold text-xl'>
        Loan Management App
      </Link>
      <LoginStatus />
    </div>
  );
}