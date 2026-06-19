export const getFullImageUrl = (url?: string): string | undefined => {
  if (!url) return undefined;

  if (url.startsWith('http') || url.startsWith('blob:')) {
    return url;
  }

  const bucketUrl = import.meta.env.VITE_R2_PUBLIC_URL;
  if (!bucketUrl) {
    console.warn('VITE_R2_PUBLIC_URL no está definido en .env');
    return url;
  }

  let cleanUrl = url.replace(/^\//, '');
  
  // El backend guarda la ruta con el formato: {publicBaseUrl}/{bucketName}/{fileName}
  // En R2, el objeto real solo se llama {fileName}, por lo que debemos remover el prefijo.
  cleanUrl = cleanUrl.replace(/^public\/uvoluntapp-bucket\//i, '');
  cleanUrl = cleanUrl.replace(/^public\/default\//i, '');

  const baseUrl = bucketUrl.replace(/\/$/, '');
  return `${baseUrl}/${cleanUrl}`;
};
