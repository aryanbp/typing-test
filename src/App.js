import { useEffect, useRef, useState } from 'react'
import randomWords from 'random-words'
const NOW = 200
const tim = 10

function App() {
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState(tim)
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0) 
  const [currCharIndex, setCurrCharIndex]=useState(-1)
  const [currChar,setCurrChar]=useState([])
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("waiting")
  const textInput=useRef(null)

  useEffect(() => {
    setWords(generateWords())
  }, [])

  useEffect(() => {
    if(status === 'started'){
      textInput.current.focus()
    }
  },[status])

  function generateWords() {
    return new Array(NOW).fill(null).map(() => randomWords())
  }

  function start() {
    if(status === 'finished'){
      setWords(generateWords())
      setCurrWordIndex(0)
      setCurrCharIndex(0)
      setCurrChar('')
      setCorrect(0)
      setIncorrect(0)
    }
    if(status !== 'started'){
      setStatus('started')
    let interval = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          clearInterval(interval)
          setStatus('finished')
          setCurrInput('')
          return tim
        } else {
          return prevCountDown - 1
        }
      })
    }, 1000)}
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex]
    const doesItMatch = wordToCompare === currInput.trim()
    if (doesItMatch) {
      setCorrect(correct + 1)
    } else {
      setIncorrect(incorrect + 1)
    }
    console.log(doesItMatch)
  }

  function handleKeyDown({ keyCode , key }) {
    //spaceCode
    if (keyCode === 32) {
      checkMatch()
      setCurrInput("")
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)
    }
    //backspace
    else if(keyCode === 8 ){
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar('')
    }
    
    else{
      setCurrCharIndex(currCharIndex+1)
      setCurrChar(key)
    }
  }
  
  function getCharClass(wordIndex, charIndex, char){
    if(wordIndex === currWordIndex && charIndex === currCharIndex && currChar && status !== 'finished'){
      if (char === currChar){
        return 'has-background-success'
      }else{
        return 'has-background-danger'
      }
    }else if(wordIndex === currWordIndex &&  currCharIndex >= words[currWordIndex].length){
      return 'has-background-danger'
    }
    
    else{
      return ''
    }
  }

  return (
    <div className="App">
      <div className="section is-size-1 has-text-centered has-text-primary">
        <h2>{countDown}</h2>
      </div>
      <div className="control is-expanded section">
        <input ref={textInput} disabled={status !== "started"} type="text" className="input" onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)} />
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start}>
          Start
        </button>
      </div>
      {status === "started" && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, i) => (
                  <span keys={i}>
                    <span>{word.split("").map((char, idx) => (
                      <span className={getCharClass(i , idx , char)} keys={idx}>{char}</span>
                    ))}</span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "finished" && (
      <div className="section">
        <div className="columns">
          <div className="column has-text-centered">
            <p className="is-size-5">Words per minute :</p>
            <p className="has-text-primary is-size-1">
              {correct}
            </p>
          </div>
          <div className="column has-text-centered">
            <div className="is-size-5">Accuracy :</div>
            <p className="has-text-info is-size-1">
              {Math.round((correct / (correct + incorrect)) * 100)} %
            </p>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default App;
