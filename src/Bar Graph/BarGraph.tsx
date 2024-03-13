import React from 'react';

interface BarGraphProps {
  data: { label: string; value: number }[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  // Find the maximum value in the data to normalize bar heights
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '300px', backgroundColor: '#f0f0f0', padding: '10px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ textAlign: 'center', width: '20%' }}>
          <div
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: '#3498db',
              color: 'white',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '5px 0',
            }}
          >
            {item.value}
          </div>
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default BarGraph;