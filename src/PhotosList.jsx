import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useState } from 'react'
import { firestore } from './firebase';

const PhotosList = () => {
  const photosRef = firestore.collection('photos')
  const query = photosRef.orderBy('caption')
  const [photos] = useCollectionData(query, { idField: 'id' })
  const [lastClickTime, setLastClickTime] = useState(0)


  function handlePClick(e, index) {
    e.preventDefault()
    const parent = document.getElementById(index)
    parent.querySelector(".svg").classList.toggle("likeAni")
    const childEle = parent.querySelectorAll(".likeAni")
    if (childEle.length > 0) {
      handleLikeClick(e, index)
    } else {
    }
  }

  function DoubleClick(e, index) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastClickTime;
    let timeout;
    const parent = document.getElementById(index)

    if (timeDifference < 500 && timeDifference > 0) {
      parent.querySelector(".bigHeart").classList.toggle("likeAniBig")
      handleLikeClick(e, index)
      const childEle = parent.querySelectorAll(".likeAni")
      if (childEle.length > 0) {
        const parent = document.getElementById(index)
        console.log("red")
        parent.querySelector(".svg").classList.toggle("likeAniBig")
      } else {
        const parent = document.getElementById(index)
        parent.querySelector(".svg").classList.toggle("likeAni")
      }
      setTimeout(() => {
        parent.querySelector(".bigHeart").classList.remove("likeAniBig")
      }, 800);
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, 502);
    }
    setLastClickTime(currentTime);
  }


  const handleLikeClick = (e, index) => {

    const parent = document.getElementById(index);
    const src = parent.querySelector("img").src
    photos.forEach((data) => {
      if (data.photoUrl === src) {
        console.log(data.caption, " is clicked with id", data.id)
        const docId = data.id;
        const documentRef = firestore.collection('photos').doc(docId);
        documentRef.get()
          .then((doc) => {
            const ImgData = doc.data();
            ImgData.likes += 1
            documentRef.update(ImgData)
              .then(() => {
                console.log('Likes Updated Succesfully')
              })
              .catch((error) => {
                console.error('Error updating document: ', error);
              });
          })
      }
    })

  };


  return (
    <div className="photos-list">
      <h2>Photos List</h2>
      {photos &&
        photos.map((photo, index) => (
          (<React.Fragment key={index}>
            <div id={index} className="Post">
              <img src={photo.photoUrl} alt={photo.caption} onClick={e => DoubleClick(e, index)} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-suit-heart-fill bigHeart"
                viewBox="0 0 16 16"
              >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
              <div className='p'>
                <div className="likeDiv">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-suit-heart-fill svg"
                    viewBox="0 0 16 16"
                    onClick={(e) => handlePClick(e, index)}
                  >
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                  </svg>
                  <span className="likeNumber">{photo.likes}</span>
                </div>
                <span>{photo.caption}</span>
              </div>
            </div>
          </React.Fragment>)
        ))}
    </div>
  )
}

export default PhotosList
