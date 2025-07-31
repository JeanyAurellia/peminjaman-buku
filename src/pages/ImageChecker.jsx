import React, { useState } from 'react';

function ImageChecker() {
  const [isError, setIsError] = useState(false);

  const imageUrl = "https://m.media-amazon.com/images/I/81O7u0dGaWL._SL1500_.jpg";

  return (
    <div>
      <h2>Cek Gambar:</h2>
      {isError ? (
        <p style={{ color: 'red' }}>Gagal memuat gambar. Coba gunakan URL langsung ke gambar (jpg/png).</p>
      ) : (
        <img
          src={imageUrl}
          alt="Cek gambar"
          style={{ maxWidth: '300px' }}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
}

export default ImageChecker;
