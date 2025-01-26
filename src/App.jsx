import { useState } from 'react'
import './App.css'
import LeftColumn from './components/LeftColumn'
import RightColumn from './components/RightColumn'

function App() {
  const [imgUrl, setImgUrl] = useState('');
  const [imgType, setImgType] = useState('');

  return (
    <>
      <h1>Photo to Grid Generator</h1>
      <div id='container'>
        <LeftColumn setImgType={setImgType} imgUrl={imgUrl} setImgUrl={setImgUrl}></LeftColumn>
        <RightColumn gridMode={3} imgUrl={imgUrl} imgType={imgType}></RightColumn>
      </div>
    </>
  )
}

export default App
