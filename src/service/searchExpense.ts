import { Expense } from "@/types/types";
import sanitize from "./sanitize";

export default function searchExpense(term: string, data: Expense[]): Expense[] {
  const sanitizedQuery = sanitize(term);
  const pattern = new RegExp(sanitizedQuery, "i");

  return data.filter(expense =>
    pattern.test(expense.type) ||
    pattern.test(expense.or.toString()) ||
    pattern.test(expense.paidFrom) ||
    pattern.test(expense.paidBy)
  );
}
