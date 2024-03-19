import React from 'react';
import "./BarGraph.css";

interface BarGraphProps {
  data: {
    label: string;
    value: number; }[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  // Find the maximum value in the data to normalize bar heights
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px'}}>
      {data.map((item, index) => (
        <div key={index} style={{ display: 'grid', alignItems: 'center', width: '100%', gridTemplateColumns: '20% 80%' }}>
          <div><span style={{ marginLeft: '0px', font: '10px' }}>{item.label}</span></div>
          <div
            style={{
              width: `${(item.value / maxValue) * 100}%`, // Width varies based on data
              backgroundColor: '#3498db',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '5px',
              height: '30px', // Fixed height for all bars
              borderRadius: '0px 10px 10px 0px'
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarGraph;