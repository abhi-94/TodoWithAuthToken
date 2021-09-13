import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import Card from '../UI/Card'
import LoginInterfaces from '../Logintypes'
import { useHistory,Redirect } from 'react-router'
import { useDispatch } from 'react-redux'
let styles = require('./Form.module.css')

const FormInputdata = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const DoLogin = (User: LoginInterfaces.UserdataInterface, token: string)=>{
    dispatch({Userdata: User,type:"Login", token: token})
    history.push("/home");
  }
  return (
    <Card cname={styles.section}>
      <Formik
        initialValues={
          {
            firstname: "",
            lastname: "",
            pass: "",
            confpass: '',
            email: '',
            age: ""
          }
        }
        validationSchema={Yup.object({
          firstname: Yup.string().required("Required").max(15, "Maximum 15").trim("Required"),
          lastname: Yup.string().required("Required").max(15, "Maximum 15").trim("Required"),
          pass: Yup.string().required("Required").min(8, "Minimum 8 Character").trim("Reqired"),
          confpass: Yup.string().required("Required").min(8, "Do not match password").trim("Required"),
          email: Yup.string().required("Required").email("enter Valied Mail").trim("Required"),
          age: Yup.string().required("Required")
        })}
        onSubmit={async (values) => {
          let Values: LoginInterfaces.UserdataInterface
          Values = {
            id: values.email.substr(0, values.email.indexOf('@')),
            firstname: values.firstname,
            lastname: values.lastname,
            pass: "Privacy Maintained",
            confpass: "Privacy Maintained",
            email: values.email,
            age: +values.age,
          }
          try {
            const Responce1 = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-6A_j-PdNWV5INf9Xauo2P54iQuRpa9M", {
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
            if (!Responce1.ok) {
              const data = await Responce1.json()
              throw new Error(data.error.message)
            }
            const Responce2 = await fetch(`https://food-order-app-662a0-default-rtdb.firebaseio.com/UserDetails/${values.email.substr(0, values.email.indexOf('@'))}.json`, {
              method: 'POST',
              body: JSON.stringify({
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                age: +values.age,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
            if (!Responce2.ok) {
              const data = await Responce2.json()
              throw new Error(data.error.message)
            }
            const data = await Responce1.json()
            DoLogin(Values, data.idToken)
            history.push('/home')
          }
          catch (e) {
            history.push("/register")
            alert("Error:" + e)
          }
        }}
      >{formik =>
        <Form className={styles.form}>
          <label >First Name:</label>
          <Field name="firstname" placeholder="First Name" type="text" />
          {formik.touched.firstname && formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null}
          <br></br>
          <label >Last Name:</label>
          <Field name="lastname" placeholder="Last Name" />
          {formik.touched.lastname && formik.errors.lastname ? <div>{formik.errors.lastname}</div> : null}
          <br></br>
          <label >Password:</label>
          <Field name="pass" placeholder="enter Strong Password" type="password" />
          {formik.touched.pass && formik.errors.pass ? <div>{formik.errors.pass}</div> : null}
          <br></br>
          <label >Confirm Password:</label>
          <Field name="confpass" id="confpass" placeholder="Confirm Password" type="pasword" />
          {formik.touched.confpass && formik.errors.confpass ? <div>{formik.errors.confpass}</div> : null}
          {formik.touched.confpass && !formik.errors.confpass && formik.values.pass != formik.values.confpass ? <div> Password and Confirm Password does'nt match </div> : null}
          <br></br>
          <label >Email:</label>
          <Field name="email" placeholder="Email" />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <br></br>
          <label >Age:</label>
          <Field name="age" type="number" max="99" min="12" placeholder="18" />
          {formik.touched.age && formik.errors.age ? <div>{formik.errors.age}</div> : null}
          <br></br>
          <br></br>
          <button type="submit">Create Account</button>
        </Form>}
      </Formik>
    </Card >
  )
}

export default FormInputdata