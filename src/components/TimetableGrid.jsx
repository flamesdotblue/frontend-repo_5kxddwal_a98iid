import React from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function SectionTable({ name, schedule, colorMap }) {
  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Section {name}</h3>
        <p className="text-xs text-gray-500">7 periods/day · Period 4 = Break</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="text-left px-3 py-2 bg-gray-50 text-gray-600 font-medium">Day</th>
              {Array.from({ length: 7 }).map((_, i) => (
                <th key={i} className="px-2 py-2 bg-gray-50 text-gray-600 font-medium">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((dayRow, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-3 py-2 font-medium text-gray-700 bg-gray-50">{days[idx]}</td>
                {dayRow.map((cell, i) => {
                  const isBreak = cell === 'Break';
                  return (
                    <td key={i} className="px-2 py-2 text-center">
                      <div
                        className={
                          isBreak
                            ? 'px-2 py-1 rounded-md bg-white/60 text-gray-600 border border-dashed border-gray-300 backdrop-blur'
                            : `px-2 py-1 rounded-md text-white shadow-sm ${colorMap[cell]}`
                        }
                      >
                        {cell}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TimetableGrid({ data, colorMap }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data).map(([section, schedule]) => (
          <SectionTable key={section} name={section} schedule={schedule} colorMap={colorMap} />
        ))}
      </div>
    </section>
  );
}
