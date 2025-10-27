import React from 'react';

export default function Header() {
  return (
    <header className="w-full px-6 py-8 bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white rounded-b-2xl shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">College Timetable Generator</h1>
        <p className="mt-2 text-white/90 max-w-3xl">
          Weekly schedules for Sections A, B, C, and D. Period 4 is a fixed lunch break. Subjects are distributed evenly with no consecutive duplicates and unique daily patterns across sections.
        </p>
      </div>
    </header>
  );
}
