'use client';

import { useState } from 'react';
import StudentRegisterModal from './StudentRegisterModal';

export default function StudentRegisterButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn btn-sm" onClick={() => setOpen(true)}>
        + Register New Student
      </button>
      {open && <StudentRegisterModal onClose={() => setOpen(false)} />}
    </>
  );
}
