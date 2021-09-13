import React from 'react'
let classes = require('./Card.module.css');

const Card: React.FC<{cname?: string}> = (props) =>{
    return(
        <div className={`${classes.Card} ${props.cname}`}>
            {props.children}
        </div>
    )
}

export default Card