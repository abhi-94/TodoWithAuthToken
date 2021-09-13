import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import Card from '../UI/Card'
import LoginInterfaces from '../Logintypes'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
let styles = require('./Form.module.css')

const LoginFormdata = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const CreateAccountHandler = () => {
    history.push('/register')
  }
  const DoLogin = (User: LoginInterfaces.UserdataInterface, token: string)=>{
    dispatch({Userdata: User,type:"Login", token: token})
    history.push("/home");
  }
  return (
    <Card cname={styles.section}>
      <Formik
        initialValues={
          {
            pass: "",
            email: ''
          }
        }
        validationSchema={Yup.object({
          pass: Yup.string().required("Required").min(8, "Minimum 8 Character").trim("Reqired"),
          email: Yup.string().required("Required").email("enter Valied Mail").trim("Required"),
        })}
        onSubmit={async (values) => {
          let Values: LoginInterfaces.UserdataInterface
          try {
            const respo = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-6A_j-PdNWV5INf9Xauo2P54iQuRpa9M", {
              method: 'POST',
              body: JSON.stringify({
                email: values.email,
                password: values.pass,
                returnSecureToken: true
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
            const datarespo = await respo.json()
            if (!respo.ok) {
              throw new Error(datarespo.error.message)
            }
            const res = await fetch(`https://food-order-app-662a0-default-rtdb.firebaseio.com/UserDetails/${values.email.substr(0, values.email.indexOf('@'))}.json`)
            const datares = await res.json()
            if (!res.ok) {
              throw new Error("Occure Some Problem to load details from server, Please try again later")
            }
            for (const key in datares) {
              Values = {
                id: datares[key].email.substr(0, values.email.indexOf('@')),
                firstname: datares[key].firstname,
                lastname: datares[key].lastname,
                pass: "Privacy Maintained",
                confpass: "Privacy Maintained",
                email: datares[key].email,
                age: +datares[key].age
              }
              DoLogin(Values,datarespo.idToken)
              
            }
            history.push('/home')
          }
          catch (e) {
            history.push("/login")
            alert("Error:" + e)
          }
        }}
      >{formik =>
        <Form className={styles.form}>
          <label >Email:</label>
          <Field name="email" placeholder="Email" />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <br></br>
          <label >Password:</label>
          <Field name="pass" placeholder="enter Strong Password" type="password" />
          {formik.touched.pass && formik.errors.pass ? <div>{formik.errors.pass}</div> : null}
          <br></br>
          <br></br>
          <button type="submit">Login</button>
          <button type="button" onClick={CreateAccountHandler}>Create Account</button>
        </Form>}
      </Formik>
    </Card >
  )
}

export default LoginFormdata