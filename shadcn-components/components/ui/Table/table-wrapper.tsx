"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

// Sample invoice data for demonstration
interface Invoice {
  invoice: string;
  status: string;
  method: string;
  amount: string;
}

const sampleInvoices: Invoice[] = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
];

interface TableWrapperProps {
  caption?: string;
  showCaption?: boolean;
  col1Header?: string;
  col2Header?: string;
  col3Header?: string;
  col4Header?: string;
}

export function TableWrapper({
  caption = "A list of your recent invoices.",
  showCaption = true,
  col1Header = "Invoice",
  col2Header = "Status",
  col3Header = "Method",
  col4Header = "Amount",
}: TableWrapperProps) {
  return (
    <Table>
      {showCaption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{col1Header}</TableHead>
          <TableHead>{col2Header}</TableHead>
          <TableHead>{col3Header}</TableHead>
          <TableHead className="text-right">{col4Header}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleInvoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
