import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import LoginInterfaces from './Component/Logintypes';
import Card from './Component/UI/Card';
const FilterTask = React.lazy(() => import('./Component/Task/FilterTask'));
const TasksList = React.lazy(() => import('./Component/Task/TaskList'));
const Search = React.lazy(() => import('./Component/Task/Search'));
const ErrorModel = React.lazy(() => import('./Component/UI/ErrorModel'));

interface todos { task: string, desc: string, id: number, key: string, check: boolean }
let classes = require('./App.module.css');
const Home: React.FC<{ ForRe: boolean }> = (props) => {
    const history = useHistory()
    const [update, setupdate] = useState(true)
    const [contet, setcontet] = useState((<div> Loading... </div>))
    const [enteredTask, setenteredTask] = useState<todos[]>([])
    const [DisplayList, setDisplayList] = useState<todos[]>([])
    const [Completed, setCompleted] = useState(0)
    const [Open, setOpen] = useState(0)
    const [deletekey,setdeletekey] = useState("")
    const storedata = useSelector<LoginInterfaces.ReduserState, LoginInterfaces.ReduserState>(state => state)
    const [DescHand, setconditon] = useState({ conditon: false, message: "" })

    if (!localStorage.getItem('token')) {
        history.push('/login')
    }
    const DataLoder = async (type: string, id?: string) => {
        if (type === "DataFetchRequest") {
            setcontet((<div>Fetch Data From Server ...</div>))
            let email: string = storedata.Userdata!.email
            let idToken: string | null
            if (!email) {
                idToken = localStorage.getItem('token')
                try{
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
                email = datarespo.users[0].email
                if (!respo.ok) {
                    throw new Error(datarespo.error.message)
                }}
                catch{
                    alert("Like occure some problem, please do relogin, Sorry for this Behavior")
                    localStorage.removeItem('token')
                    history.push('/login')
                }
            }
                try {
                    const responce = await fetch(`https://food-order-app-662a0-default-rtdb.firebaseio.com/tasks/${email.substr(0, email.indexOf('@'))}.json`)
                    const data = await responce.json()
                    const tempdata: todos[] = []
                    for (const key in data) {
                        tempdata.push({ task: data[key].task, desc: data[key].desc, id: tempdata.length, key: key, check: data[key].check })
                    }
                    let opn: number = 0
                    let comp: number = 0
                    tempdata.map((task) => {
                        task.check === true ? comp++ : opn++
                    })
                    if (tempdata.length === 0) {
                        setcontet((<div> No data Availabel </div>))
                    }
                    setenteredTask(tempdata)
                    setDisplayList(tempdata)
                    setOpen(opn)
                    setCompleted(comp)
                }
                catch (e) {
                    alert("error in fetching data:"+ e)
                }
            }
            else if (type = "UpadateRequest") {
                const tempdataindex: number = enteredTask.findIndex((task) => {
                    return task.key === id
                })
                try {
                    const responce = await fetch(`https://food-order-app-662a0-default-rtdb.firebaseio.com/tasks/${storedata.Userdata?.email.substr(0, storedata.Userdata.email.indexOf('@'))}/${id}.json`,
                        {
                            method: 'PUT',
                            body: JSON.stringify({ task: enteredTask[tempdataindex].task, desc: enteredTask[tempdataindex].desc, check: true }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                    if (!responce.ok) {
                        throw new Error("This Update Operation fails, we apologize to you")
                    }
                    history.push('home')
                }
                catch (e) {
                    alert("Error:" + e + "Please try again")
                    history.push('home')
                }
            }
        }
        useEffect(() => {
            DataLoder("DataFetchRequest")
        }, [])

        const DescButtonHandler = (uid: number) => {
            setdeletekey(enteredTask[uid].key)
            setconditon({ conditon: true, message: enteredTask[uid].desc })
        }
        const DescCancleHandler = () => {
            setconditon({ conditon: false, message: "" })
        }
        const addbuttonhandler = () => {
            history.push('/addtask')
        }
        const OpenHandler = (id: string) => {
            DataLoder("UpadateRequest", id)
            setOpen((prevOpen) => {
                return (prevOpen + 1)
            })
            setCompleted((prevCompleted) => {
                return (prevCompleted - 1)
            })
        }
        const CompleteHandler = (id: string) => {
            DataLoder("UpadateRequest", id)
            setCompleted((prevCompleted) => {
                return (prevCompleted + 1)
            })
            setOpen((prevOpen) => {
                return (prevOpen - 1)
            })
        }
        const UpHandler = () => {
            setDisplayList((prevDisplayList) => {
                const Sorted = prevDisplayList.sort((a, b) => a.task > b.task && 1 || -1)
                return Sorted
            })
            setupdate((prevupdate)=>{
                return prevupdate? false:true
            })
        }
        const DownHandler = () => {
            setDisplayList((prevDisplayList) => {
                const Sorted = prevDisplayList.sort((a, b) => a.task > b.task && 1 || -1)
                Sorted.reverse()
                return Sorted
            })
            setupdate((prevupdate)=>{
                return prevupdate? false:true
            })
        }
        const DeleteHandler = async()=>{
            let overridedata = enteredTask.filter((task)=> task.key != deletekey)
            try{
                const Responce = await fetch(`https://food-order-app-662a0-default-rtdb.firebaseio.com/tasks/${storedata.Userdata!.email.substr(0, storedata.Userdata!.email.indexOf('@'))}.json`,
                {
                    method:'PUT',
                    body:JSON.stringify(overridedata),
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
                const data = await Responce.json()
                if(!Responce.ok){
                    throw new Error(data.error.message)
                }
                setconditon({ conditon: false, message: "" })
                DataLoder('DataFetchRequest')
            }
            catch(e){
                alert("Error:"+e)
            }
        }

        const SearchHandler = (Searchtext: string) => {
            setDisplayList([])
            setcontet((<div> No Matches Availabel</div>))
            enteredTask.map((task) => {
                if (Searchtext != "") {
                    if (task.task.includes(Searchtext)) {
                        setDisplayList((prevDisplayList) => {
                            return [...prevDisplayList, task]
                        })
                    }
                }
                else {
                    setDisplayList(enteredTask)
                }
            })
            if (DisplayList.length === 0) {
                setcontet((<div> No Matches Availabel</div>))
            }
        }
        return (
            <Fragment>
                {DescHand.conditon && <ErrorModel deletehand={DeleteHandler} DescokHandler={DescCancleHandler} title="Descryption" message={DescHand.message} ></ErrorModel>}
                < FilterTask Complete={Completed} Open={Open} />
                {props.ForRe && < Search onchange={SearchHandler} />}
                < TasksList contet={contet} onUp={UpHandler} onDown={DownHandler} ondescchange={DescButtonHandler} TaskList={DisplayList} onopen={OpenHandler} oncomplete={CompleteHandler} />
                <Card cname={classes.block}>
                    <button className={classes.button} onClick={addbuttonhandler} >Add Task</button>
                </Card>
            </Fragment>
        )
    }

    export default Home
