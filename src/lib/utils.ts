import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type LoanDetails = {
  principal: number;       // initial loan amount
  interestRate: number;
  durationMonths: number;
  amountPaid: number;
};

/* I am not familiar with the actual loan calculation functions so this will have to do :) */
export function debtRemaining({ 
  principal,
  interestRate,
  durationMonths,
  amountPaid,
}: LoanDetails): number {
  const monthlyRate = interestRate / 100 / 12;
  const totalDebt = principal * (1 + monthlyRate * durationMonths);
  const remaining = totalDebt - amountPaid;

  return Math.max(0, Math.round(remaining * 100) / 100);
};