import React, { useState } from 'react';
import PieChart, { PieChartData } from '../../components/analysis/PieChart';
import CategorySummaryList from '../../components/analysis/CategorySummaryList';
import { useExpenses } from '../../hooks/expense/useExpense';
import ExpensePage from './ExpensePage';

const defaultColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

function getPieChartData(expenses: any[]) {
  const map: { [key: string]: number } = {};
  expenses.forEach((e) => {
    if (!map[e.category]) map[e.category] = 0;
    map[e.category] += e.amount;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function getSummaryItems(data: PieChartData[], colors: string[]) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return data.map((d, i) => ({
    ...d,
    percent: total ? d.value / total : 0,
    color: colors[i % colors.length],
  }));
}

function getMonthOptions(expenses: any[]) {
  const set = new Set<string>();
  expenses.forEach((e) => {
    if (e.date && e.date.toDate) {
      const d = e.date.toDate();
      const m =
        d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
      set.add(m);
    }
  });
  return Array.from(set).sort().reverse();
}

const AnalysisPage: React.FC = () => {
  const { expenses, loading } = useExpenses();
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('전체');

  const monthOptions = getMonthOptions(expenses);
  const filtered = expenses.filter((e) => {
    if (month) {
      const d = e.date?.toDate?.();
      const ym = d
        ? d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
        : '';
      if (ym !== month) return false;
    }
    if (category !== '전체' && e.category !== category) return false;
    return true;
  });

  const categoryOptions = Array.from(new Set(expenses.map((e) => e.category)));
  const pieData = getPieChartData(filtered);
  const summaryItems = getSummaryItems(pieData, defaultColors);

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3">Expenses</h2>
      <div className="flex gap-2 mb-2">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">전체</option>
          {monthOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="전체">전체</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <>
          <PieChart data={pieData} colors={defaultColors} />
          <CategorySummaryList items={summaryItems} />
        </>
      )}
      <ExpensePage />
    </div>
  );
};

export default AnalysisPage;
