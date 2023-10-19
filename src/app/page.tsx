'use client';
import { useState } from 'react';
import styles from './page.module.scss'

export default function Home() {
  const [file, setFile] = useState<File>();
  const [base64, setBase64] = useState<string | ArrayBuffer | null>('');

  return (
    <main className={styles.main}>
      <h1>Arquivo para Base64</h1>
      <form>
        <button
          type="button"
          className={styles.openButton}
          onClick={handleOpenButtonClicked}>
            Abrir
        </button>
      </form>
      <div className={styles.fileInfoCard}>
        <div className={styles.field}>
          <span className={styles.label}>Nome do arquivo:</span>
          <span className={styles.value}>{file?.name}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Content-type:</span>
          <span className={styles.value}>{file?.type}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Tamanho:</span>
          <span className={styles.value}>{file?.size} bytes</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Base64:</span>
          <span className={styles.value}>{base64?.toString()}</span>
        </div>
      </div>
    </main>
  );

  function handleOpenButtonClicked() {
    const acceptList = [
      'image/png',
      'image/jpeg',
      'application/zip',
      'application/x-zip-compressed',
    ];

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = acceptList.join(',');
    fileInput.multiple = false;
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', function (e) {
      if (this.files && this.files.length > 0) {
        setFile(this.files[0]);
        const reader = new FileReader();

        reader.addEventListener('load', function () {
          setBase64(reader.result);
          fileInput.remove();
        }, false);
        
        reader.readAsDataURL(this.files[0]);
      }
    }, false);

    document.body.append(fileInput);
    fileInput.click();
  }
}
