
import he from "he";
export default function Questions({title}) {
return (
       <h4>{he.decode(title)}</h4>
)
    
}