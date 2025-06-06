import LoginStatus from "./login-status";

export function NavBar() {
  return (
    <div className="flex flex-row justify-between p-0.5">
      <div className='font-bold text-xl'>Loan Management App</div>
      <LoginStatus />
    </div>
  );
}