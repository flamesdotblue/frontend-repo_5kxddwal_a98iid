import React from 'react';

export default function Legend({ colorMap }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
        {Object.entries(colorMap).map(([subject, color]) => (
          <div key={subject} className="flex items-center gap-2">
            <span className={`inline-block h-3 w-3 rounded-sm ${color}`} />
            <span className="text-sm text-gray-700">{subject}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
