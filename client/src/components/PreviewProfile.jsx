import React, { useState } from 'react';

function PreviewProfile({ file }) {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div>
      <img
        src={preview}
        alt="preview"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    </div>
  );
}

export default PreviewProfile;
