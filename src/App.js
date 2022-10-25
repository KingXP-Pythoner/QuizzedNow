import AppCover from "./Components/AppCover";
import Main from "./Components/Main";
import {useState, createContext} from "react"

export const ThemeContext = createContext()
function App() {
  const [quiz, setQuiz] = useState(false)
  const [checkAnswer, setCheckAnswer] = useState(false)
  const [checkCount, setCheckCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  //Change quiz state to true to start the quiz 
  function startBtnHandler()
  {
    setQuiz(true)
    
  }

  function resetQuiz(target){
    
  setCheckCount((prevCount)=>prevCount + 1)
   setCheckAnswer(true)
   if(checkCount > 0){
    setQuiz(false)
    setCheckAnswer(false)
    setCheckCount(0)
   }
  }
  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
    
    
      <div onClick={()=>setDarkMode((prev)=>!prev)} className={darkMode === true ?"theme-mode-on":"theme-mode-off"}>
      </div>
     {quiz?
    
     <Main start={quiz}
      resetQuiz={resetQuiz}
      checked={checkAnswer}
    
     />
     
     
     :<AppCover 
      startBtn={startBtnHandler}
     />}
    </ThemeContext.Provider>
  );
}

export default App;
