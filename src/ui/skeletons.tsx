import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function EmptyLoanList() {
  return (
    <Table>
      <TableCaption>A list of your current loans.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Loan ID</TableHead>
          <TableHead>Debtor</TableHead>
          <TableHead>Principal</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Months</TableHead>
          <TableHead>Remaining</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Signed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[0, 1, 2].map((a) => {
          return (
            <TableRow key={a}>
              <TableCell className="font-medium"><br/><br/></TableCell>
              <TableCell className="font-medium"></TableCell>
              <TableCell className="font-medium text-right"></TableCell>
              <TableCell className="font-medium text-right"></TableCell>
              <TableCell className="font-medium text-right"></TableCell>
              <TableCell className="font-medium text-right"></TableCell>
              <TableCell className="font-medium text-right"></TableCell>
              <TableCell className="font-medium text-right"></TableCell>
              <TableCell className="font-medium text-right"></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={9}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
} 