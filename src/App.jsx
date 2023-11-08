import React from 'react';
import './App.css';
import PhotosList from './PhotosList';
import NewPost from './NewPost';

function App() {
  return (
    <div className="App">
      <NewPost />
      <PhotosList />
    </div>
  );
}

export default App;
