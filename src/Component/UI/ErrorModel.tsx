import React from 'react'
import Card from './Card'
import Button from './button'
let classes = require('./ErrorModel.module.css')

const ErrorModel: React.FC<{deletehand: ()=>void,DescokHandler: ()=>void,title: string,message:string}> = (props) => {
    const DescOkHandler = () =>{
        props.DescokHandler()
    }
    const DeleteHandler = () => {
        props.deletehand()
    }
    return (
        <div className={classes.backdrop}>
            <div />
            <Card cname={classes.modal}>
                <header className={classes.header}> 
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={classes.actions}>
                    <Button onClick={DeleteHandler}>Delete</Button>
                    <Button onClick={DescOkHandler}>Okay</Button>
                </footer>
            </Card>
        </div>
    )
}

export default ErrorModel