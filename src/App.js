import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import Word from './Word';
import Sound1 from './audioclips/sound1.mp3';
import { Howl, Howler } from 'howler';

const App = () => {
  const sound = new Howl({
    src: Sound1,
  });
  Howler.volume(1.0);

  const [input, setInput] = useState('');
  const [wordList, setWordList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [result, setResult] = useState('');

  const onRemove = useCallback(
    (key) => setWordList(wordList.filter((value, index) => key !== index)),
    [wordList]
  );
  const res = useRef(0);

  const start = (newWordList) => {
    setWordList(newWordList);

    sound.play();

    setResult(newWordList[res.current]);
    res.current += 1;
    setTimeout(() => {
      setResult('');
    }, 3000);

    const func = setInterval(() => {
      if (res.current > wordList.length - 1) {
        setResult('Testing is over');
        clearInterval(func);
      } else {
        sound.play();
        setResult(newWordList[res.current]);
        res.current += 1;

        setTimeout(() => {
          setResult('');
        }, 3000);
      }
    }, 5000);
  };

  if (!clicked) {
    return (
      <div id="template">
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (input) setWordList((i) => i.concat(input));
            setInput('');
          }}
        >
          <input
            id="input"
            placeholder="Enter words here..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button id="btn" type="submit">
            add
          </button>
          <button
            id="start"
            onClick={() => {
              setClicked(true);
              let aleady = true;
              const newWordList = [];
              for (let i = 0; i < wordList.length; i++) {
                newWordList[i] = null;
              }
              const max = wordList.length;
              for (let i = 0; i < wordList.length; i++) {
                while (aleady) {
                  const random = Math.floor(Math.random() * max);
                  if (!newWordList[random]) {
                    newWordList[random] = wordList[i];
                    aleady = false;
                  }
                }
                aleady = true;
              }
              start(newWordList);
            }}
          >
            start text
          </button>
        </form>
        <ul>
          {wordList.map((v, i) => (
            <Word key={i} keyProp={i} valueProp={v} onRemove={onRemove}></Word>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h1 id="result">{result}</h1>
    </div>
  );
};

export default App;
