
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Questions from "./Questions"
import QuestionAnswers from "./QuestionAnswers"
import Confetti from "react-confetti"
import { trackPromise } from 'react-promise-tracker';
import { useContext } from "react"
import { ThemeContext } from "../App"
export default function Main({start, resetQuiz, checked, theme}) {
  const {darkMode} = useContext(ThemeContext)
  const [apiData, setApiData] = useState([])
  const [renderBtn, setRenderBtn] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(
    () => {
      trackPromise(fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(responseData => setApiData(
          (prevApiData) => {
            //SET APIDATA TO OBJECT OF QUESTION AND OPTIONS
            const quizQuestions = responseData["results"].map(object => {
              //Get correct answer in an object of value, id, isCorrect and isHeld
              const correctAnswer = {
                value: object.correct_answer,
                id: nanoid(15),
                isHeld: false, isCorrect: true
              }
              //Get correct answer in an object of value, id, isCorrect and isHeld
              const incorrectArr = object.incorrect_answers.map(arr => {
                return { value: arr, id: nanoid(10), isHeld: false, isCorrect: false }
              })
             
              incorrectArr.push(correctAnswer)
              const combinedOptions = incorrectArr
               
              shuffle(combinedOptions)
              return combinedOptions;
            })
            const tiles = quizQuestions.map(
              (arr, index) => ({ question: responseData.results[index].question, options: arr, QID: nanoid() })
            )
        
            return tiles
          }
        ))
        .then(()=>setRenderBtn(true))
      );
    }, [start]
    
  )
  useEffect(()=>{
    setScore(()=>{
      const filterCorrect = apiData.filter(
        obj=>obj.options.filter(ans=>ans.isHeld && ans.isCorrect).length >0)
        const getTotalScore = filterCorrect.length
        return getTotalScore
    })
  },[checked])
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let randNum = Math.floor(Math.random() * (i + 1));
      [array[i], array[randNum]] = [array[randNum], array[i]];
    }
  }

  function getOptionClicked(qID, buttonID) {
    setApiData((prevApiData)=>{
     
        return prevApiData.map(tile =>{
          if (qID === tile.QID){
            const newAnswers = tile.options.map(answer => {

              return answer.id === buttonID 
                  ? {...answer, isHeld: !answer.isHeld}
                  : {...answer, isHeld: false};
          });
          return {...tile, options: newAnswers}
            
        } else {
          return tile;
        }
      
      })
        }
      )
  
       }


const quizElements = apiData.map((arr, index) => {
  return (
    <div key={nanoid()} className="tile">
    <Questions
    title={(index+1) + ". " + arr.question}
    />
    <QuestionAnswers 
    allAnswers={arr.options} 
      handleOptionClick={getOptionClicked}
      qID = {arr.QID}
      checkAnswerBtn={checked}
      isHeld={arr.options.isHeld}
      isCorrect={arr.options.isCorrect}
    />
  </div>
  )
})
const messageStylePerf = {
  color: "var(--theme-color)"
}

const messageStyleNotPerf = {
  color: "#783552"
}
const messageStyleNotPerDark = {
  color: "#783552"
}
let scoreInfo
if(checked && score === apiData.length){
  scoreInfo = <span style={messageStylePerf}> <i class="fa-solid fa-bahai"></i> You got a perfect score! </span>
  }
  else
 { scoreInfo = <span style={darkMode ? messageStyleNotPerDark: messageStyleNotPerf}>You got {score}/5 correct answers</span>}

  return ( renderBtn && <div className={darkMode?"cover-wrapper-dark":"cover-wrapper"}>
    <div className={darkMode?"message-dark":"message"}><h2>GOODLUCK !</h2></div>
    
    <div className={darkMode?"wrapper-dark":"wrapper"}>
    
     {(checked && score === apiData.length)&&<Confetti />}
    <div className={darkMode?"main-container-dark":"main-container"}>
     {quizElements}
    </div>
    <div className={checked?"bottomelements shift":"bottomelements"}>
      {checked && scoreInfo}
    <button className={darkMode?"checkAnswer-btn-dark":"checkAnswer-btn"} onClick={(event)=>resetQuiz(event)}>{checked?"Play again":"Check answers"}</button>
    </div>
    </div>
    </div>
  )
}