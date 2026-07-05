import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { Layout } from '../components/Layout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { StudentList } from '../pages/students/StudentList';
import { StudentForm } from '../pages/students/StudentForm';
import { DonorList } from '../pages/donors/DonorList';
import { DonorForm } from '../pages/donors/DonorForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected — all wrapped in Layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/students" element={<StudentList />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/students/:id/edit" element={<StudentForm />} />

            <Route path="/donors" element={<DonorList />} />
            <Route path="/donors/new" element={<DonorForm />} />
            <Route path="/donors/:id/edit" element={<DonorForm />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
