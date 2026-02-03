import Image from 'next/image';

interface Column<T> {
  header: string;
  accessor: keyof T | 'custom';
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
  emptyMessage = "No data available"
}: DataTableProps<T>) {
  return (
    <div className="data-table-wrapper">
      <div className="data-table-container">
        <table className="modern-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.render
                        ? column.render(row)
                        : column.accessor !== 'custom'
                          ? String(row[column.accessor])
                          : null
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper component for avatar + name column
interface AvatarNameCellProps {
  name: string;
  avatarUrl?: string;
  subtitle?: string;
}

export function AvatarNameCell({ name, avatarUrl, subtitle }: AvatarNameCellProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="avatar-name-cell">
      <div className="avatar">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="img-cover"
          />
        ) : (
          <span className="avatar-initials">{initials}</span>
        )}
      </div>
      <div className="name-info">
        <div className="name-primary">{name}</div>
        {subtitle && <div className="name-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}

// Status badge component
interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'info' | 'default';
}

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const variantClass = variant === 'success' ? 'active'
    : variant === 'warning' ? 'pending'
      : variant === 'info' ? 'graduated'
        : 'default';

  return (
    <span className={`status-badge ${variantClass}`}>
      {status}
    </span>
  );
}
