import { Extension } from '@/utils/getColorByExtension';

export const getExtensionFromFileName = (filename: string) => {
  if (!filename) {
    return '';
  }

  return filename.split('.').pop() as Extension;
};
