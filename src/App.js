import { useEffect, useRef, useState } from 'react'
import randomWords from 'random-words'
const NOW = 200
const tim = 10

function App() {
  const [words, setWords] = useState([])
  const status='started'

  useEffect(() => {
    setWords(generateWords())
  }, [])



  function generateWords() {
    return new Array(NOW).fill(null).map(() => randomWords())
  }



  return (
    <div className="App">
      <div className="section is-size-1 has-text-centered has-text-primary">
        <h2>{tim}</h2>
      </div>
      <div className="control is-expanded section">
        <input type="text" className="input" />
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" >
          Start
        </button>
      </div>
      {status === "started" && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <span>{words}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
