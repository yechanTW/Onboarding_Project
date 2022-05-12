import './App.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { v1 , v3, v4 , v5} from 'uuid';


function App() {

  const [randomNanoid , setRandomNanoid ] = useState(0);
  const [randomUuidV1 , setrandomUuidV1] = useState(0);
  const [randomUuidV3 , setrandomUuidV3] = useState(0);
  const [randomUuidV4 , setrandomUuidV4] = useState(0);
  const [randomUuidV5 , setrandomUuidV5] = useState(0);

  const onClickBtnNanoid = () => {
    const ranNanoid = nanoid();
    setRandomNanoid(ranNanoid);
  }   

  const onClickUuidV1 = () => {
    const ranUuid = v1();
    setrandomUuidV1(ranUuid);
  }
  const onClickUuidV3 = () => {
    const ranUuid = v3('https://www.google.com', v3.URL);
    setrandomUuidV3(ranUuid);
  }
  const onClickUuidV4 = () => {
    const ranUuid = v4();
    setrandomUuidV4(ranUuid);
  }
  const onClickUuidV5 = () => {
    const ranUuid = v5('https://www.google.com', v5.URL);
    setrandomUuidV5(ranUuid);
  }
  return (
    <div className="App">
      <div>
        <label>nanoid </label>
        <button onClick={onClickBtnNanoid}>{randomNanoid}</button>
      </div>
      <div>
        <label>uuid v1 ( 타임스탬프 , 시간 기준 ) </label>
        <button onClick={onClickUuidV1}>{randomUuidV1}</button>
      </div>
      <div>
        <label>uuid v3 ( MD5 해시 기준 ) </label>
        <button onClick={onClickUuidV3}>{randomUuidV3}</button>
      </div>
      <div>
        <label>uuid v4 ( 랜덤값 ) </label>
        <button onClick={onClickUuidV4}>{randomUuidV4}</button>
      </div>
      <div>
        <label>uuid v5 ( SHA-1 해시 기준 ) </label>
        <button onClick={onClickUuidV5}>{randomUuidV5}</button>
      </div>
    </div>
  );
}

export default App;
