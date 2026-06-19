import React, { useRef, useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { Button } from '../atoms/Button';
import ProfileLogo from '../../assets/ProfileLogo.svg';
import { getFullImageUrl } from '../../utils/imageUtils';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  currentImageUrl?: string;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, currentImageUrl, maxSizeMB = 1, maxWidthOrHeight = 800 }) => {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentImageUrl && !currentImageUrl.startsWith('blob:')) {
      setPreview(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const options = { maxSizeMB, maxWidthOrHeight, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      setPreview(URL.createObjectURL(compressedFile));
      onImageSelected(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  const isDefaultImage = !preview || preview.toLowerCase().includes('default') || preview.toLowerCase().includes('deault');
  const imageSrc = isDefaultImage ? ProfileLogo : getFullImageUrl(preview);

  return (
    <div className="flex flex-col items-center p-4 border-2 border-dashed border-white/20 bg-white/5 rounded-xl backdrop-blur-md">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-500 mb-4 bg-black/50">
        <img src={imageSrc} alt="Profile" className="object-cover w-full h-full" />
      </div>
      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} isLoading={isCompressing}>
        {!isDefaultImage ? 'Cambiar Foto' : 'Subir Foto'}
      </Button>
    </div>
  );
};
