import { Navbar } from "../../components/navbar";
import { DataTable, AvatarNameCell, StatusBadge } from "../../components/DataTable";
import { Footer } from "../../components/footer";

// Mock Data
const MOCK_STUDENTS = [
  { id: 1, name: "Tenzin Dorjee", grade: "Grade 11", school: "Namkha Khyung Dzong School", region: "Yultsho Dhun", status: "Active", avatar: "" },
  { id: 2, name: "Pema Sherpa", grade: "Grade 12", school: "Himalayan Model School", region: "Limi", status: "Active", avatar: "" },
  { id: 3, name: "Karma Lhamo", grade: "Bachelor 1st Year", school: "Trinity College", region: "Global", status: "Pending", avatar: "" },
  { id: 4, name: "Dorje Gyaltsen", grade: "Grade 11", school: "Namkha Khyung Dzong School", region: "Nyin", status: "Active", avatar: "" },
  { id: 5, name: "Yangchen Dolma", grade: "Grade 12", school: "Golden Gate Box", region: "Chang", status: "Active", avatar: "" },
  { id: 6, name: "Pasang Norbu", grade: "Bachelor 2nd Year", school: "St. Xaviers", region: "Bhalu-Drukpa", status: "Graduated", avatar: "" },
  { id: 7, name: "Tashi Wangmo", grade: "Grade 11", school: "Namkha Khyung Dzong School", region: "Drukchu Lung", status: "Active", avatar: "" },
  { id: 8, name: "Sonam Tsering", grade: "Grade 12", school: "Bernhardt College", region: "Yultsho Dhun", status: "Active", avatar: "" },
  { id: 9, name: "Dawa Phuti", grade: "Bachelor 1st Year", school: "Islington College", region: "Limi", status: "Pending", avatar: "" },
  { id: 10, name: "Ngawang Chodrak", grade: "Grade 11", school: "Namkha Khyung Dzong School", region: "Nyin", status: "Active", avatar: "" },
];

export default function StudentsPage() {
  const columns = [
    {
      header: 'Student',
      accessor: 'custom' as const,
      render: (student: typeof MOCK_STUDENTS[0]) => (
        <AvatarNameCell
          name={student.name}
          subtitle={student.grade}
          avatarUrl={student.avatar}
        />
      ),
      width: '25%'
    },
    {
      header: 'School/Institution',
      accessor: 'school' as const,
      width: '30%'
    },
    {
      header: 'Region',
      accessor: 'region' as const,
      width: '20%'
    },
    {
      header: 'Status',
      accessor: 'custom' as const,
      render: (student: typeof MOCK_STUDENTS[0]) => {
        const variant = student.status === 'Active' ? 'success'
          : student.status === 'Pending' ? 'warning'
            : student.status === 'Graduated' ? 'info'
              : 'default';
        return <StatusBadge status={student.status} variant={variant} />;
      },
      width: '15%'
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <Navbar />

      {/* Header */}
      <header className="page-header">
        <div className="container text-center">
          <h1 className="hero-title text-white">Student Beneficiaries</h1>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            Supporting the bright minds of our community. Below is the list of students currently supported by the Degyal Memorial Society.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container section-padding -mt-10 relative z-10">
        <div className="glass-card">
          <div className="table-header-section">
            <div>
              <h3 className="table-title">Registered Students</h3>
              <p className="table-subtitle">Total students: {MOCK_STUDENTS.length}</p>
            </div>
            <button className="btn btn-sm">Register New Student</button>
          </div>

          <DataTable
            columns={columns}
            data={MOCK_STUDENTS}
            emptyMessage="No students registered yet"
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

