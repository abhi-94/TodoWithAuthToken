import React, {useState} from 'react'
import classes from './TaskList.module.css'
const Task:React.FC<{task:string,id:number,check: boolean, onopn: (id:number)=>void, oncomp: (id:number)=>void,Descbutton: (id: number)=>void}> = (props) => {
    const [condition, setcondition] = useState(props.check)
    const cdHandler = () => {
        if (condition){
            setcondition(false)
            props.onopn(props.id)
        }
        else{
            setcondition(true)
            props.oncomp(props.id)
        }
    }
    const Descbuttonhandler=()=>{
        props.Descbutton(props.id)
    }
    return (
        <div className={`${classes['block']} ${condition ? classes.invalid: {}}`}> 
        <li className={`${classes['form-control']} ${condition ? classes.invalid: {}}`}>
        <input checked={condition} id="cb" type="checkbox" onChange={cdHandler}/>
        <label className={classes.head} onClick={Descbuttonhandler}>{props.task}</label>
        </li></div>
    )
}
export default Task