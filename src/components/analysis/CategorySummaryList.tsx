import React from 'react';

interface Item {
  name: string;
  value: number;
  percent: number;
  color: string;
}
interface Props {
  items: Item[];
  currency?: string;
}
const CategorySummaryList: React.FC<Props> = ({ items, currency = '₩' }) => (
  <div className="mt-2">
    {items.map((item, i) => (
      <div key={item.name} className="flex justify-between items-center py-1">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="font-medium">{item.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>
            {currency}
            {item.value.toLocaleString()}
          </span>
          <span className="ml-2 text-gray-400 text-sm">
            {Math.round(item.percent * 100)}%
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default CategorySummaryList;
