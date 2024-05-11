import React, { useState } from 'react';
import { storage, firestore } from './firebase';
import firebase from 'firebase/compat/app';

const NewPost = ({ user, handleHide }) => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setProfilePic(e.target.files[0])
      const imageUrl = URL.createObjectURL(e.target.files[0])
      setPreviewImage(imageUrl)
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
                username: user.displayName,
                likes: 0,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
    <div className="UploadDiv">
      <p onClick={handleHide}>&#x274C;</p>
      <div className='Upload'>
        <h2>Upload a Photo</h2>
        <input type="file" onChange={handlePhotoChange} accept="image/jpeg, image/png, image/gif image/jpg"
        />
        <br />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={handleCaptionChange}
        />
        <br />
        <br />
        {profilePic && (
          <img src={previewImage} alt="Preview" className="imgPreview" />
        )}
        <button onClick={handleUpload}>Upload</button>
        {uploadProgress > 0 && (
          <progress value={uploadProgress} max="100" />
        )}
      </div>
    </div>
  );
};

export default NewPost;
