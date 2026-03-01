import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentApi } from '../api/student.api';
import { donorApi } from '../api/donor.api';
import { useAuthStore } from '../store/auth.store';

interface Stats {
  students: number;
  donors: number;
}

export function Dashboard() {
  const admin = useAuthStore((s) => s.admin);
  const [stats, setStats] = useState<Stats>({ students: 0, donors: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      studentApi.list({ limit: 1 }),
      donorApi.list({ limit: 1 }),
    ])
      .then(([sRes, dRes]) => {
        setStats({
          students: sRes.data.total ?? 0,
          donors: dRes.data.total ?? 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total Students', value: stats.students, href: '/students', color: 'indigo' },
    { label: 'Total Donors', value: stats.donors, href: '/donors', color: 'emerald' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, {admin?.name}.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link key={card.label} to={card.href} className="card p-5 hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {loading ? '—' : card.value}
            </p>
            <p className="mt-3 text-xs text-indigo-600 font-medium">View all →</p>
          </Link>
        ))}

        {/* Quick actions */}
        <div className="card p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Quick Actions</p>
          <div className="space-y-2">
            <Link to="/students/new" className="btn-secondary btn w-full text-xs">
              + Add Student
            </Link>
            <Link to="/donors/new" className="btn-secondary btn w-full text-xs">
              + Add Donor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
