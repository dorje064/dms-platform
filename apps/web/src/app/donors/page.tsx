import { Navbar } from "../../components/navbar";
import { DataTable, AvatarNameCell, StatusBadge } from "../../components/DataTable";

// Extended Donor Data
const DONORS_LIST = [
  {
    id: 1,
    name: "Donor Name 1",
    amount: "NPR 500,000",
    location: "Kathmandu, Nepal",
    date: "2025-01-15",
    type: "One-time",
    avatar: ""
  },
  {
    id: 2,
    name: "Donor Name 2",
    amount: "NPR 300,000",
    location: "Pokhara, Nepal",
    date: "2025-01-20",
    type: "One-time",
    avatar: ""
  },
  {
    id: 3,
    name: "Donor Name 3",
    amount: "NPR 250,000",
    location: "Boudha, Nepal",
    date: "2025-02-01",
    type: "Monthly",
    avatar: ""
  },
  {
    id: 4,
    name: "Donor Name 4",
    amount: "NPR 200,000",
    location: "Lalitpur, Nepal",
    date: "2025-01-10",
    type: "One-time",
    avatar: ""
  },
  {
    id: 5,
    name: "Donor Name 5",
    amount: "NPR 150,000",
    location: "Bhaktapur, Nepal",
    date: "2025-01-25",
    type: "Monthly",
    avatar: ""
  },
  {
    id: 6,
    name: "Donor Name 6",
    amount: "NPR 125,000",
    location: "Mustang, Nepal",
    date: "2024-12-15",
    type: "One-time",
    avatar: ""
  },
  {
    id: 7,
    name: "Donor Name 7",
    amount: "NPR 100,000",
    location: "Humla, Nepal",
    date: "2024-12-20",
    type: "Monthly",
    avatar: ""
  },
  {
    id: 8,
    name: "Donor Name 8",
    amount: "NPR 75,000",
    location: "Dolpo, Nepal",
    date: "2025-01-05",
    type: "One-time",
    avatar: ""
  },
  {
    id: 9,
    name: "Donor Name 9",
    amount: "NPR 50,000",
    location: "Jomsom, Nepal",
    date: "2025-01-30",
    type: "Monthly",
    avatar: ""
  },
  {
    id: 10,
    name: "Donor Name 10",
    amount: "NPR 50,000",
    location: "Kagbeni, Nepal",
    date: "2025-02-03",
    type: "One-time",
    avatar: ""
  },
  {
    id: 11,
    name: "Donor Name 11",
    amount: "NPR 40,000",
    location: "Manang, Nepal",
    date: "2024-11-28",
    type: "One-time",
    avatar: ""
  },
  {
    id: 12,
    name: "Donor Name 12",
    amount: "NPR 35,000",
    location: "Lo Manthang, Nepal",
    date: "2024-12-10",
    type: "Monthly",
    avatar: ""
  },
];

export default function DonorsPage() {
  const columns = [
    {
      header: 'Donor',
      accessor: 'custom' as const,
      render: (donor: typeof DONORS_LIST[0]) => (
        <AvatarNameCell
          name={donor.name}
          subtitle={donor.location}
          avatarUrl={donor.avatar}
        />
      ),
      width: '30%'
    },
    {
      header: 'Contribution',
      accessor: 'amount' as const,
      render: (donor: typeof DONORS_LIST[0]) => (
        <span style={{ fontWeight: 600, color: '#d97706' }}>{donor.amount}</span>
      ),
      width: '20%'
    },
    {
      header: 'Date',
      accessor: 'date' as const,
      render: (donor: typeof DONORS_LIST[0]) => {
        const formattedDate = new Date(donor.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        return <span>{formattedDate}</span>;
      },
      width: '20%'
    },
    {
      header: 'Type',
      accessor: 'custom' as const,
      render: (donor: typeof DONORS_LIST[0]) => {
        const variant = donor.type === 'Monthly' ? 'success' : 'info';
        return <StatusBadge status={donor.type} variant={variant} />;
      },
      width: '15%'
    }
  ];

  // Calculate total donations
  const totalAmount = DONORS_LIST.reduce((sum, donor) => {
    const amount = parseInt(donor.amount.replace(/[^0-9]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <Navbar />

      {/* Header */}
      <header className="page-header">
        <div className="container text-center">
          <h1 className="hero-title text-white">Our Generous Donors</h1>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            With deep gratitude, we honor all those who have contributed to supporting education and preserving our cultural heritage.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container section-padding -mt-10 relative z-10">
        {/* Stats Cards */}
        <div className="grid-3 gap-6 mb-8">
          <div className="glass-card text-center">
            <div className="stat-value">NPR {totalAmount.toLocaleString()}</div>
            <div className="stat-label">Total Contributions</div>
          </div>
          <div className="glass-card text-center">
            <div className="stat-value">{DONORS_LIST.length}</div>
            <div className="stat-label">Total Donors</div>
          </div>
          <div className="glass-card text-center">
            <div className="stat-value">
              {DONORS_LIST.filter(d => d.type === 'Monthly').length}
            </div>
            <div className="stat-label">Monthly Supporters</div>
          </div>
        </div>

        {/* Donors Table */}
        <div>
          <div className="table-header-section">
            <div>
              <h3 className="table-title">All Donors</h3>
              <p className="table-subtitle">Showing all contributors to DMS</p>
            </div>
            <button className="btn btn-sm">Make a Donation</button>
          </div>

          <DataTable
            columns={columns}
            data={DONORS_LIST}
            emptyMessage="No donors yet"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer mt-auto">
        <div className="container text-center pt-8 pb-8">
          <p className="small-text opacity-50">&copy; {new Date().getFullYear()} Degyal Memorial Society.</p>
        </div>
      </footer>
    </div>
  );
}
