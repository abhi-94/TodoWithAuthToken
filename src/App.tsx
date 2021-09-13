import React, { useState, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router';
import Header from './Component/UI/Header';
import LoginFormdata from './Component/Form/LoginForm';
import LoginInterfaces from './Component/Logintypes';
import { useDispatch, useSelector } from 'react-redux';
const Home = React.lazy(() => import('./Home'))
const AddTask = React.lazy(() => import('./Component/Task/AddTask'));
const FormInputdata = React.lazy(() => import('./Component/Form/Form'));
let classes = require('./App.module.css')

function App() {
  const [IsLogin, setIsLogin] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const [ForRe, setForRe] = useState(false)
  const dispatch = useDispatch()
  const data = useSelector<LoginInterfaces.ReduserState, LoginInterfaces.ReduserState>(state => state)
  const DoLogin = (User: LoginInterfaces.UserdataInterface, token: string)=>{
    dispatch({Userdata: User,type:"Login", token: token})
    history.push("/home");
  }

  const CheckLogin = async () => {
    let email: string = ''
    let Values: LoginInterfaces.UserdataInterface
    let idToken: string | null
    if (localStorage.getItem('token')) {
      idToken = localStorage.getItem('token')
      const respo = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC-6A_j-PdNWV5INf9Xauo2P54iQuRpa9M", {
        method: 'POST',
        body: JSON.stringify({
          idToken
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const datarespo = await respo.json()
      if (!respo.ok) {
        throw new Error(datarespo.error.message)
      }
      email = datarespo.users[0].email
      const res = await fetch(`https://food-order-app-662a0-default-rtdb.firebaseio.com/UserDetails/${email.substr(0, email.indexOf('@'))}.json`)
      const datares = await res.json()
      if (!res.ok) {
        throw new Error("Occure Some Problem to load details from server, Please try again later")
      }
      for (const key in datares) {
        Values = {
          id: datares[key].email.substr(0, email.indexOf('@')),
          firstname: datares[key].firstname,
          lastname: datares[key].lastname,
          pass: "Privacy Maintained",
          confpass: "Privacy Maintained",
          email: datares[key].email,
          age: +datares[key].age
        }
        DoLogin(Values, localStorage.getItem('token') || '')
      }
      setIsLogin(true)
      const Currrent_location = location.pathname
      history.push(Currrent_location)
    }
    else {
      setIsLogin(false)
      history.push('/login')
    }
  }

  useEffect(() => {
    CheckLogin()
  }, [])

  const Searchdisplayhandler = () => {
    setForRe((prevForRe: boolean) => {
      return prevForRe ? false : true
    })
  }
  return (
    <div>
      <Header onclick={Searchdisplayhandler}></Header>
      <Suspense fallback={<div className={classes.div}>Loading...</div>}>
        <Switch>
          <Route path="/login">
            <LoginFormdata></LoginFormdata>
          </Route>
          <Route path="/register">
            <FormInputdata></FormInputdata>
          </Route>
          <Route path="/" exact>
            {IsLogin? <Redirect to="/home" />: <Redirect to="/login" />}
          </Route>
          <Route path="/home">
            <Home ForRe={ForRe} />
          </Route>
          <Route path="/addtask">
            {localStorage.getItem('token') ? < AddTask /> : <Redirect to='/login' />}
          </Route>
          <Route path="*">
            {!data.isLogin && <Redirect to="/login" />}
            {data.isLogin && <Redirect to="/home" />}
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;

function ForRe(arg0: string, ForRe: any) {
  throw new Error('Function not implemented.');
}
function setForRe(arg0: (prevForRe: any) => boolean) {
  throw new Error('Function not implemented.');
}

