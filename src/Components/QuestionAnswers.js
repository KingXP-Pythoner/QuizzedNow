import he from "he"
import {useState, useEffect} from "react"
import { useContext } from "react"
import { ThemeContext } from "../App"
export default function QuestionAnswers
({allAnswers, handleOptionClick, qID,checkAnswerBtn, isHeld, isCorrect})
{


const {darkMode} = useContext(ThemeContext)
const answerElements = allAnswers.map( (arr, index) => {

    let styles={}
    if(checkAnswerBtn){
       styles ={
            background: arr.isHeld === false && arr.isCorrect?"#94D7A2":
            arr.isHeld && arr.isCorrect?"#94D7A2":
            arr.isHeld && arr.isCorrect ===false?"#F8BCBC":"transparent",
            transition: "3s ease-in-out",
            opacity: arr.isHeld || arr.isCorrect?"100%":"50%"
        }
    }else{
    styles = {
        background: arr.isHeld?"#D6DBF5":"transparent"
    }
}
let darkStyles = {}
if(checkAnswerBtn){
    darkStyles ={
         background: arr.isHeld === false && arr.isCorrect?"#2ed1b0dc":
         arr.isHeld && arr.isCorrect?"#2ed1b0dc":
         arr.isHeld && arr.isCorrect ===false?"#294d4cdc":"transparent",
         color: arr.isHeld === false && arr.isCorrect?"#294d4cdc":
         arr.isHeld && arr.isCorrect?"black":
         arr.isHeld && arr.isCorrect ===false?"#1e2524dc":"#077866",
         transition: "3s ease-in-out",
         opacity: arr.isHeld || arr.isCorrect?"100%":"50%"
     }
 }else{
 darkStyles = {
     background: arr.isHeld?"#1c8367dc":"transparent"
 }
}
return (
    <button className={darkMode?"answer-buttons-dark":"answer-buttons"}
     onClick={(event)=>handleOptionClick(qID, arr.id, isHeld, isCorrect)}
     style={darkMode?darkStyles: styles}
     key={arr.id}>
        {he.decode(arr.value)}
    </button>
)
})

return (
    <div className="answers-container">
    {answerElements}
    </div>
)
}