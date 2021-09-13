import LoginInterfaces from '../Logintypes'

const defaultvalue = {
    isLogin: false,
    Userdata: {
        id: '',
        firstname: '',
        lastname: '',
        pass: '',
        confpass: '',
        email: '',
        age: 0
    },
    token: ''
}

const CartReducer = (state: LoginInterfaces.ReduserState = defaultvalue, action: LoginInterfaces.ReduserAction): LoginInterfaces.ReduserState => {
    if (action.type == "Login") {
        localStorage.setItem('token',action.token)
        return {
            isLogin: true,
            Userdata: action.Userdata,
            token: action.token
        }
    }
    if(action.type == "Logout"){
        return defaultvalue;
    }
    return defaultvalue;
};


export default CartReducer