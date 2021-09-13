import React,{FormEvent, useRef} from 'react'
import Card from '../UI/Card'
let classes = require('./Search.module.css')

const Search: React.FC<{onchange: (text: string)=>void}> = (props) =>{
    const searchtext = useRef<HTMLInputElement>(null)
    const SearchHand=()=>{
        props.onchange(searchtext.current!.value)
    }
    return(
        <Card cname={classes.block}>
            <input id ="search" className={classes.inp} ref={searchtext} enterKeyHint="search" placeholder="Search..." type="text" onChange={SearchHand} ></input>
        </Card>
    )
}

export default Search