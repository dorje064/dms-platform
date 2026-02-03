import { Navbar } from "../../components/navbar";

// Mock Data
const MOCK_STUDENTS = [
  { id: 1, name: "Tenzin Dorjee", grade: "Grade 11", school: "Namkha Khyung Dzong School", region: "Yultsho Dhun", status: "Active" },
  { id: 2, name: "Pema Sherpa", grade: "Grade 12", school: "Himalayan Model School", region: "Limi", status: "Active" },
  { id: 3, name: "Karma Lhamo", grade: "Bachelor 1st Year", school: "Trinity College", region: "Global", status: "Pending" },
  { id: 4, name: "Dorje Gyaltsen", grade: "Grade 11", school: "Namkha Khyung Dzong School", region: "Nyin", status: "Active" },
  { id: 5, name: "Yangchen Dolma", grade: "Grade 12", school: "Golden Gate Box", region: "Chang", status: "Active" },
  { id: 6, name: "Pasang Norbu", grade: "Bachelor 2nd Year", school: "St. Xaviers", region: "Bhalu-Drukpa", status: "Graduated" },
  { id: 7, name: "Tashi Wangmo", grade: "Grade 11", school: "Namkha Khyung Dzong School", region: "Drukchu Lung", status: "Active" },
  { id: 8, name: "Sonam Tsering", grade: "Grade 12", school: "Bernhardt College", region: "Yultsho Dhun", status: "Active" },
  { id: 9, name: "Dawa Phuti", grade: "Bachelor 1st Year", school: "Islington College", region: "Limi", status: "Pending" },
  { id: 10, name: "Ngawang Chodrak", grade: "Grade 11", school: "Namkha Khyung Dzong School", region: "Nyin", status: "Active" },
];

export default function StudentsPage() {
  return (
    <div className="page-wrapper">
      {/* Navigation - Reused for consistency */}
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
        <div className="glass-card overflow-hidden">
          <div className="table-header">
            <h3>Registered Students</h3>
            <div className="badge-pill text-dark">
              Total: {MOCK_STUDENTS.length}
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Grade/Year</th>
                  <th>School/Institution</th>
                  <th>Region</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_STUDENTS.map(student => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-cell">
                        <div className="avatar-placeholder">{student.name.charAt(0)}</div>
                        <span className="font-bold">{student.name}</span>
                      </div>
                    </td>
                    <td>{student.grade}</td>
                    <td>{student.school}</td>
                    <td>{student.region}</td>
                    <td>
                      <span className={`status-badge ${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
