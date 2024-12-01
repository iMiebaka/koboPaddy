import { ReactNode } from "react";
import { formatCurrency } from "../../utils/numberModifier";

interface ITProps {
  title: string;
  price: number | string;
  className?: string
  icon: ReactNode;
}
export default function DataCard({className="", icon, price, title }: ITProps) {
  return (
    <div className="w-full ">
      <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
        <div className={`p-3 ${className} bg-opacity-75 rounded-full`}>{icon}</div>

        <div className="mx-5">
          <h4 className="text-2xl font-semibold text-gray-700">
            ₦{formatCurrency(price as any)}
          </h4>
          <div className="text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
}
