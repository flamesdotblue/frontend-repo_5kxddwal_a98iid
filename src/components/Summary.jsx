import React from 'react';

export default function Summary({ countsBySection, validations }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 mt-8">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800">Summary</h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(countsBySection).map(([section, counts]) => (
            <div key={section} className="">
              <h4 className="font-medium text-gray-700 mb-2">Section {section}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 text-sm">
                {Object.entries(counts).map(([subject, count]) => (
                  <div key={subject} className="flex items-center justify-between pr-2">
                    <span className="text-gray-600">{subject}</span>
                    <span className="font-semibold text-gray-800">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-1">
          <p>
            • No consecutive duplicates: <span className={validations.noConsecutive ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>{validations.noConsecutive ? 'Confirmed' : 'Violation found'}</span>
          </p>
          <p>
            • No blank periods: <span className={validations.noBlanks ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>{validations.noBlanks ? 'Confirmed' : 'Violation found'}</span>
          </p>
          <p>
            • Unique daily order per section: <span className={validations.uniqueDailyOrders ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>{validations.uniqueDailyOrders ? 'Confirmed' : 'Needs attention'}</span>
          </p>
          {validations.note && (
            <p className="text-gray-600">{validations.note}</p>
          )}
        </div>
      </div>
    </section>
  );
}
