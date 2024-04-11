import React, { useCallback, useState } from 'react';

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handles file selection via dialog or drag and drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.type === "drop" ? e.dataTransfer.files : e.target.files;
    const file = files[0]; // Assuming single file upload, but you can handle multiple files
    uploadFile(file);
  }, []);

  // Upload the file to the server
  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://your-dotnet-backend-endpoint/api/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  };

    // Preview the file before uploading
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        };

  return (
      <div className="file-upload">
        <h1>Add Product</h1>
      <div 
        onDragEnter={handleDrag} 
        onDragLeave={handleDrag} 
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={dragActive ? "drag-active" : ""}
      >
        {dragActive ? 
          <p>Drop the files here ...</p> : 
          <p>Drag and drop some files here, or click to select files</p>
        }
        <input 
          type="file" 
          id="fileInput" 
          hidden 
          onChange={handleDrop} 
          onClick={(event) => { 
            event.currentTarget.value = null; 
          }} // To ensure that onSelect fires even if the same file is selected
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
    </div>
  );
};

export default FileUpload;
