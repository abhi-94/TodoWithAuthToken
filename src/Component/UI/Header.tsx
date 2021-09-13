import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import LoginInterfaces from '../Logintypes'
let classes = require('./Header.module.css')

const Header: React.FC<{ onclick: () => void }> = (props) => {
    const [SearchHand, setSearchHand] = useState(false)
    const location = useLocation()
    const history = useHistory()
    const data = useSelector<LoginInterfaces.ReduserState, LoginInterfaces.ReduserState>(state => state)
    if (location.pathname === "/home" && SearchHand == false) {
        setSearchHand(true)
    }
    else if(location.pathname !== "/home" && SearchHand === true){
        setSearchHand(false)
    }
    const searchhandler = () => {
        props.onclick();
    }
    const logouthandler=()=>{
        localStorage.removeItem('token')
        history.push('/')
    }
    const Cancelhandler = () => {
        if(location.pathname === "/addtask"){
        history.push('home')}else{
            history.push('/login')
        }
    }
    return (
        <header className={classes.section}>
            <label> Flow up</label>
            <div>
            {SearchHand && <button onClick={searchhandler}>Search</button>}
            {SearchHand && <button onClick={logouthandler}>Logout</button>}
            {location.pathname === "/register" || location.pathname ==="/addtask" ? <button onClick={Cancelhandler}>Cancel</button>:null}
            </div>
        </header>
    )
}

export default Header