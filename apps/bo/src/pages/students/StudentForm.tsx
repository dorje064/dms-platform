import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentApi, CreateStudentDto } from '../../api/student.api';
import { useImageUpload } from '../../hooks/useImageUpload';

type FormData = CreateStudentDto;

const STATUS_OPTIONS = ['Active', 'Pending', 'Graduated', 'Inactive'];

export function StudentForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const fileRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, preview, selectFile, reset: resetPreview } = useImageUpload();
  const [avatarUrl, setAvatarUrl] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { status: 'Pending' } });

  // Load existing student for edit
  useEffect(() => {
    if (!id) return;
    studentApi.getOne(id).then((res) => {
      const s = res.data.data;
      reset(s);
      if (s.avatar) setAvatarUrl(s.avatar);
    }).catch(() => toast.error('Failed to load student'));
  }, [id, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    selectFile(file);
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const url = await upload(file);
    if (url) {
      setAvatarUrl(url);
      toast.success('Image uploaded');
    }
  };

  const onSubmit = async (data: FormData) => {
    const payload = { ...data, avatar: avatarUrl || data.avatar };
    try {
      if (isEdit && id) {
        await studentApi.update(id, payload);
        toast.success('Student updated');
      } else {
        await studentApi.create(payload);
        toast.success('Student created');
      }
      navigate('/students');
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Save failed';
      toast.error(msg);
    }
  };

  const currentPreview = preview || avatarUrl;

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700 mb-2">
          ← Back
        </button>
        <h1 className="text-lg font-semibold text-gray-900">
          {isEdit ? 'Edit Student' : 'New Student'}
        </h1>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit(onSubmit as Parameters<typeof handleSubmit>[0])} className="space-y-5">

          {/* Image Upload */}
          <div>
            <label className="field-label">Profile Image</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                {currentPreview ? (
                  <img src={currentPreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xs text-center leading-tight px-1">No image</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="avatar-upload"
                  onChange={handleFileChange}
                />
                <label htmlFor="avatar-upload" className="btn-secondary btn btn-sm cursor-pointer">
                  Choose File
                </label>
                {preview && (
                  <button
                    type="button"
                    className="btn-primary btn btn-sm"
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading…' : 'Upload'}
                  </button>
                )}
                {currentPreview && (
                  <button type="button" className="btn-ghost btn btn-sm text-red-500"
                    onClick={() => { setAvatarUrl(''); resetPreview(); }}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Name + Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Full Name *</label>
              <input
                className="field-input"
                placeholder="Tenzin Dorjee"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="field-error">{errors.name.message}</p>}
            </div>
            <div>
              <label className="field-label">Grade *</label>
              <input
                className="field-input"
                placeholder="Grade 11"
                {...register('grade', { required: 'Grade is required' })}
              />
              {errors.grade && <p className="field-error">{errors.grade.message}</p>}
            </div>
          </div>

          {/* School + Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">School / Institution *</label>
              <input
                className="field-input"
                placeholder="Namkha Khyung Dzong School"
                {...register('school', { required: 'School is required' })}
              />
              {errors.school && <p className="field-error">{errors.school.message}</p>}
            </div>
            <div>
              <label className="field-label">Region *</label>
              <input
                className="field-input"
                placeholder="Yultsho Dhun"
                {...register('region', { required: 'Region is required' })}
              />
              {errors.region && <p className="field-error">{errors.region.message}</p>}
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                className="field-input"
                placeholder="student@example.com"
                {...register('email')}
              />
            </div>
            <div>
              <label className="field-label">Phone</label>
              <input
                className="field-input"
                placeholder="+977 9800000000"
                {...register('phone')}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="field-label">Status</label>
            <select className="field-input" {...register('status')}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="field-label">Notes</label>
            <textarea
              rows={3}
              className="field-input resize-none"
              placeholder="Additional notes…"
              {...register('notes')}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" className="btn-secondary btn" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary btn" disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : isEdit ? 'Update Student' : 'Create Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
