import logo from "../Assets/jury-voting-b.png"
import logo2 from "../Assets/jury-voting-dark1.png"
import { useContext } from "react"
import { ThemeContext } from "../App"
export default function AppCover (props){
    const {darkMode} = useContext(ThemeContext)
    return (
        <div className={darkMode === false? "AppCover":"AppCover-dark"}>
        <div className={darkMode === false? "cover-container":"cover-container-dark"}>
        <img src={darkMode === false? logo:logo2} alt="logoimg"/>
        <h1>Quizzed Now</h1>
        <h5>Are you going to be the next Champion?</h5>
        <button className={darkMode === false? "cover-btn":"cover-btn-dark"} onClick={props.startBtn}>START QUIZ</button>
        </div>
        </div>
    )
}