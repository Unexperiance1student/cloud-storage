import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, notification } from 'antd';
import React, { useState } from 'react';
import styles from '@/styles/Home.module.scss';
import * as Api from '@/api';

const UploadButton: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onUploadSuccess = async (options: any) => {
    try {
      const file = await Api.files.uploadFile(options);

      setFileList([]);

      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Ошибка!',
        description: 'Не удалось загрузить файл',
        duration: 2,
      });
    }
  };
  return (
    <Upload
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      className={styles.upload}>
      <Button
        type='primary'
        icon={<CloudUploadOutlined />}
        size='large'>
        Загрузить файл
      </Button>
    </Upload>
  );
};

export default UploadButton;
