import { useState } from 'react';
import toast from 'react-hot-toast';
import { studentApi } from '../api/student.api';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const selectFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const upload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const res = await studentApi.uploadImage(file);
      const url: string = res.data?.data?.url ?? res.data?.url ?? '';
      return url;
    } catch {
      toast.error('Image upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const reset = () => setPreview(null);

  return { upload, uploading, preview, selectFile, reset };
}
