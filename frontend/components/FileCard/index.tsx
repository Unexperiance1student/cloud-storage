import React from 'react';
import styles from './FileCard.module.scss';
import { getExtensionFromFileName } from '@/utils/getExtensionFromFileName';
import { isImage } from '@/utils/isImage';
import { getColorByExtension } from '@/utils/getColorByExtension';
import { FileTextOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface FileCardProps {
  filename: string;
  originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({
  originalName,
  filename,
}) => {
  const ext = getExtensionFromFileName(filename);
  const imageUrl =
    ext && isImage(ext) ? 'http://localhost:7772/uploads/' + filename : '';
  const color = getColorByExtension(ext);
  const classColor = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {isImage(ext) ? (
          <Image
            width={80}
            height={80}
            className={styles.image}
            src={imageUrl}
            alt='File'
          />
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};