import React from 'react';

export interface PayItem {
  category: string;
  amount: number;
  color: string;
}

interface RecentPayCardProps {
  pays: PayItem[];
  total: number;
}

const RecentPayCard: React.FC<RecentPayCardProps> = ({ pays, total }) => (
  <div className="border rounded-lg p-4 flex flex-col gap-2 mx-6">
    <div className="font-bold mb-2">
      최근 소비 <span className="float-right">{total.toLocaleString()}원</span>
    </div>
    {pays.length === 0 ? (
      <div className="text-gray-400">최근 소비 내역이 없습니다.</div>
    ) : (
      pays.map((item) => (
        <div
          key={item.category + item.amount}
          className="flex items-center gap-2"
        >
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: item.color }}
          />
          <span className="text-gray-700">{item.category}</span>
          <span className="ml-auto">{item.amount.toLocaleString()}원</span>
        </div>
      ))
    )}
  </div>
);

export default RecentPayCard;
