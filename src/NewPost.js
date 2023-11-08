import React, { useState } from 'react';
import { storage, firestore } from './firebase';

const NewPost = () => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (photo) {
      const uploadTask = storage.ref(`photos/${photo.name}`).put(photo);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('photos')
            .child(photo.name)
            .getDownloadURL()
            .then((url) => {
              firestore.collection('photos').add({
                caption,
                photoUrl: url,
                likes: 0
              })
                .then((docRef) => {
                  const documentId = docRef.id;
                  firestore.collection('photos').doc(documentId).update({ id: documentId });
                })
              setCaption('');
              setPhoto(null);
              setUploadProgress(0);
            });
        }
      );
    }
  };

  return (
    <div className='Upload'>
      <h2>Upload a Photo</h2>
      <input type="file" onChange={handlePhotoChange} accept="image/jpeg, image/png, image/gif image/jpg" />
      <br />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={handleCaptionChange}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && (
        <progress value={uploadProgress} max="100" />
      )}
    </div>
  );
};

export default NewPost;
