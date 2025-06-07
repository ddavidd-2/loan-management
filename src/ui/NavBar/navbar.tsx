import LoginStatus from "./login-status";
import Link from "next/link";

export function NavBar() {
  return (
    <div className="flex flex-row justify-between p-0.5 border-b border-gray-300">
      <div className='font-bold text-2xl'>
        LMA
      </div>
      <div className='flex gap-4 text-2xl'>
        <Link href='/' className='hover:underline font-bold'>Home</Link> 
        <Link href='/dashboard' className='hover:underline font-bold'>Dashboard</Link> 
        <Link href='/about' className='hover:underline font-bold'>About Us</Link> 
      </div>
      <LoginStatus />
    </div>
  );
}