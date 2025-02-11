import { useState } from 'react'
import './App.css'
import LeftColumn from './components/LeftColumn'
import RightColumn from './components/RightColumn'

function App() {
  const [imgUrl, setImgUrl] = useState('');
  const [imgType, setImgType] = useState('');
  const [gridMode, setGridMode] = useState(3);

  return (
    <>
      <h1>Photo to Grid Generator</h1>
      <div id='container'>
        <LeftColumn gridMode={gridMode} setGridMode={setGridMode} setImgType={setImgType} imgUrl={imgUrl} setImgUrl={setImgUrl}></LeftColumn>
        <RightColumn gridMode={gridMode} imgUrl={imgUrl} imgType={imgType}></RightColumn>
      </div>
    </>
  )
}

export default App
