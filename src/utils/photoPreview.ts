import { PhotoPreview } from '../types';

const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

export function readPhotoPreviews(
  files: FileList | null,
  onAdd: (photo: PhotoPreview) => void
): void {
  if (!files) return;

  Array.from(files).forEach((file) => {
    if (file.size > MAX_PHOTO_BYTES) {
      alert('File size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      onAdd({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        previewUrl: loadEvt.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  });
}
