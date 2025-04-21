import React from 'react';
import PieChart from '../../components/analysis/PieChart';
const mockData = [
  { name: '쇼핑', value: 700000 },
  { name: '식비', value: 300000 },
  { name: '쇼핑', value: 700000 },
  { name: '쇼핑', value: 700000 },
  { name: '교통', value: 100000 },
];
const AnalysisPage: React.FC = () => {
  return (
    <div>
      AnalysisPage
      <PieChart data={mockData} />
    </div>
  );
};

export default AnalysisPage;
