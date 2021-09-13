import React from 'react';

let styles = require('./button.module.css');


const Button: React.FC<{ cname?: React.CSSProperties, type?: "submit" | "reset" | "button" | undefined, onClick?: () => void }> = (props) => {

    const ButtonClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    return (
        <button
            className={`${styles.button} ${props.cname}`}
            type={props.type ? props.type : 'button'}
            onClick={props.onClick || ButtonClickHandler}
        >
            {props.children || 'Button'}
        </button>
    )
}

export default Button