// components/ui/summarycard.tsx
type SummaryCardExpenseProps = {
  title: string;
  value: number | string;
  icon: JSX.Element;
};

export default function SummaryCardExpense({ title, value, icon }: SummaryCardExpenseProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-white shadow-md rounded-lg w-[270px] h-[100px]">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="text-3xl text-gray-400">
        {icon}
      </div>
    </div>
  );
}
