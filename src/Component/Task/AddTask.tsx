import Card from '../UI/Card'
import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useHistory } from "react-router"
import { useSelector } from 'react-redux'
import LoginInterfaces from '../Logintypes'
let classes = require('./AddTask.module.css')

const AddTask: React.FC = (props) => {
    const history = useHistory()
    const data = useSelector<LoginInterfaces.ReduserState, LoginInterfaces.ReduserState>(state => state)
    if(!localStorage.getItem('token')){
        history.push('/')
    }
    return (
        <Card cname={classes.input}>
            <Formik
                initialValues={
                    {
                        task: "",
                        desc:""
                    }
                }
                validationSchema={Yup.object({
                    task:Yup.string().required("Required"),
                    desc:Yup.string().required("Required").min(15,"Please Describe some more...")
                })}
                onSubmit={ async (values)=>{
                    try{
                        const Responce = await fetch(
                            `https://food-order-app-662a0-default-rtdb.firebaseio.com/tasks/${data.Userdata?.email.substr(0,data.Userdata.email.indexOf('@'))}.json`,
                            {
                              method: 'POST',
                              body: JSON.stringify({ task: values.task,desc:values.desc,check: false}),
                              headers: {
                                'Content-Type': 'application/json',
                              },
                            }
                          );
                        if(!Responce.ok){
                          throw new Error("Request failed")
                        }
                        else{
                            history.push('/home')
                        }
                }
            catch{
                alert("Request Failed")
                history.push('addtask')
            }}}
            >{formik=>
                <Form>
                    <label >Task Name:</label>
                    <Field id="task" name="task" type="text" placeholder="enter Task" />
                    {formik.touched.task && formik.errors.task ? <div>{formik.errors.task}</div>:null}
                    <br></br>
                    <label >Descrypttion:</label>
                    <Field id="desc" name="desc" type="text"  placeholder="enter descryption of task"/>
                    {formik.touched.desc && formik.errors.desc ? <div>{formik.errors.desc}</div>:null}
                    <button type="submit">Add Task</button>
                </Form>}
            </Formik>
        </Card>
    )
}

export default AddTask