import React, { useMemo } from 'react';
import Header from './components/Header';
import TimetableGrid from './components/TimetableGrid';
import Legend from './components/Legend';
import Summary from './components/Summary';

const SUBJECTS = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Geography',
  'Economics',
  'Bengali',
];

// Tailwind color classes per subject
const COLOR_MAP = {
  Physics: 'bg-rose-500',
  Chemistry: 'bg-orange-500',
  Mathematics: 'bg-amber-500',
  Biology: 'bg-emerald-500',
  'Computer Science': 'bg-teal-500',
  English: 'bg-sky-500',
  History: 'bg-indigo-500',
  Geography: 'bg-violet-500',
  Economics: 'bg-fuchsia-500',
  Bengali: 'bg-pink-500',
};

function generateSectionSchedule(sectionIndex) {
  // Each subject should appear exactly 3 times per section (30 teaching slots total)
  const remaining = Object.fromEntries(SUBJECTS.map((s) => [s, 3]));
  const days = [];
  let lastOfPreviousDay = null; // to avoid cross-day consecutive duplicates

  for (let d = 0; d < 5; d++) {
    const day = new Array(7).fill('');
    day[3] = 'Break'; // Period 4 is lunch break (index 3)

    let prevNonBreak = lastOfPreviousDay;

    for (let p = 0; p < 7; p++) {
      if (p === 3) continue; // skip break

      // rotating preference to diversify by section/day/period
      const start = (d * 2 + sectionIndex * 3 + p) % SUBJECTS.length;
      let chosen = null;

      for (let k = 0; k < SUBJECTS.length; k++) {
        const candidate = SUBJECTS[(start + k) % SUBJECTS.length];
        if (remaining[candidate] > 0 && candidate !== prevNonBreak) {
          chosen = candidate;
          break;
        }
      }

      // Fallback (very unlikely): if all remaining subjects equal prevNonBreak, relax constraint
      if (!chosen) {
        for (let k = 0; k < SUBJECTS.length; k++) {
          const candidate = SUBJECTS[(start + k) % SUBJECTS.length];
          if (remaining[candidate] > 0) {
            chosen = candidate;
            break;
          }
        }
      }

      day[p] = chosen;
      remaining[chosen] -= 1;
      prevNonBreak = chosen; // persists across the break inside the same day
    }

    lastOfPreviousDay = prevNonBreak;
    days.push(day);
  }

  // Build counts actually used (should be 3 each)
  const counts = Object.fromEntries(
    SUBJECTS.map((s) => [s, 3 - remaining[s]])
  );

  return { days, counts };
}

function validate(data) {
  // data: { A: days[][], B: ... }
  let noConsecutive = true;
  let noBlanks = true;
  let uniqueDailyOrders = true;

  const sections = Object.keys(data);

  // check blanks and consecutive (including across break and across days)
  for (const s of sections) {
    let prev = null;
    for (let d = 0; d < 5; d++) {
      for (let p = 0; p < 7; p++) {
        const v = data[s][d][p];
        if (!v) noBlanks = false;
        if (v !== 'Break') {
          if (prev && prev === v) noConsecutive = false;
          prev = v;
        }
      }
    }
  }

  // ensure each day's order is unique among sections
  for (let d = 0; d < 5; d++) {
    const seen = new Set();
    for (const s of sections) {
      const signature = data[s][d].join('|');
      if (seen.has(signature)) uniqueDailyOrders = false;
      seen.add(signature);
    }
  }

  return { noConsecutive, noBlanks, uniqueDailyOrders };
}

export default function App() {
  const { schedules, countsBySection, validations } = useMemo(() => {
    const sections = ['A', 'B', 'C', 'D'];
    const schedules = {};
    const countsBySection = {};

    sections.forEach((s, idx) => {
      const { days, counts } = generateSectionSchedule(idx);
      schedules[s] = days;
      countsBySection[s] = counts;
    });

    const validations = validate(schedules);

    return { schedules, countsBySection, validations };
  }, []);

  const note =
    'Each subject appears exactly 3 times per section (30 instructional periods), spread across the week with rotating offsets to avoid clustering.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      <main className="py-8 space-y-6">
        <Legend colorMap={COLOR_MAP} />
        <TimetableGrid data={schedules} colorMap={COLOR_MAP} />
        <Summary countsBySection={countsBySection} validations={{ ...validations, note }} />
      </main>

      <footer className="w-full px-6 pb-10 mt-6">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">
          Visual tips: distinct colors per subject, translucent break, and hover highlights on cells help readability.
        </div>
      </footer>
    </div>
  );
}
