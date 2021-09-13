import React, { useState } from 'react'
import classes from './TaskList.module.css'
import Card from '../UI/Card'
import Task from './Task'
import uplogo from './Up.png'
import downlogo from './down.png'

const TasksList: React.FC<{contet: JSX.Element, TaskList: { task: string, desc: string, id: number, check: boolean, key: string }[], onopen: (id: string) => void, onUp: () => void, onDown: () => void, oncomplete: (id: string) => void, ondescchange: (id: number) => void }> = (props) => {

    const completHandler = (id: number) => {

        props.oncomplete(props.TaskList[id].key)
    }
    const openHandler = (id: number) => {
        props.onopen(props.TaskList[id].key)
    }
    const DButtonHandler = (uid: number) => {
        props.ondescchange(uid)
    }
    const UpHandler = () => {
        props.onUp()
    }
    const DownHandler = () => {
        props.onDown()
    }
    const content = (
        <ul>
            {props.TaskList.map(task => (
                <Task Descbutton={DButtonHandler} task={task.task} key={task.key} id={task.id} check={task.check} oncomp={completHandler} onopn={openHandler} />
            ))}
        </ul>)
    return (
        <Card cname={classes.Tasks}>
            <div><button type="button" className={classes.ibutton} onClick={UpHandler} >

                <img src={uplogo} className={classes.icon}></img></button>
                {props.TaskList.length === 0 ? <div className={classes.error} >{props.contet}</div> : content}
                <button type="button" className={classes.ibutton} onClick={DownHandler}>
                    <img src={downlogo} className={classes.icon}></img></button></div>
        </Card>
    )
}
export default TasksList