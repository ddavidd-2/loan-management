import { Loan } from "@/app/generated/prisma";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type FullLoanDetails = {
  debtor: string;
  amount: number;
  interestRate: number;
  duration: number;
  amountPaid: number;
  status?: "PENDING" | "APPROVED" | "PAID" | "REJECTED";
  createdAt?: Date;
}

export function generateFakeLoans(n: number): FullLoanDetails[] {
  const names = ["Jane Smith", "Bob Ross", "Obama", "Jerry"];
  const statuses: FullLoanDetails["status"][] = ["PENDING", "APPROVED", "REJECTED"];
  const loans: FullLoanDetails[] = [];

  for (let i = 0; i < n; i++) {
    const debtor = names[Math.floor(Math.random() * names.length)];
    const amount = 1000 + Math.floor(Math.random() * 91) * 100; // 1000–10000 in steps of 100
    const interestRate = +(0.5 + Math.floor(Math.random() * 41) * 0.1).toFixed(1); // 0.5–4.5 in steps of 0.1
    const duration = 6 + Math.floor(Math.random() * 8) * 6; // 6–48 in steps of 6
    const amountPaid = 0;
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    loans.push({
      debtor,
      amount,
      interestRate,
      duration,
      amountPaid,
      status,
    });
  }

  return loans;
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

export const LOANS_PER_PAGE: number = 5;

export function getFilteredLoans(loans: Loan[], currentPage: number): Loan[] {
  const startIndex = (currentPage - 1) * LOANS_PER_PAGE;
  const endIndex = startIndex + LOANS_PER_PAGE;
  return loans.slice(startIndex, endIndex);
}

// Generate the page numbers to be shown on the pagination section of the table
export function generatePagination(currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
