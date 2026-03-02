const variants: Record<string, string> = {
  Active: 'bg-green-50 text-green-700',
  Pending: 'bg-yellow-50 text-yellow-700',
  Graduated: 'bg-blue-50 text-blue-700',
  Inactive: 'bg-gray-100 text-gray-600',
  Monthly: 'bg-indigo-50 text-indigo-700',
  'One-time': 'bg-gray-100 text-gray-700',
  Annual: 'bg-purple-50 text-purple-700',
};

export function StatusBadge({ status }: { status: string }) {
  const cls = variants[status] ?? 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}
