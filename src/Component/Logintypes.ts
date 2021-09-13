import { string } from "yup/lib/locale"

namespace LoginInterfaces{
    export interface UserdataInterface{
            id: string,
            firstname?: string,
            lastname?: string,
            email: string,
            age?: number,
            pass: string,
            confpass?: string
        }
    export interface UserContexInterface{
            isLogin: boolean,
            Userdata: UserdataInterface|undefined,
            token: string,
            DoLogin: (User: UserdataInterface, token: string) => void
            DoLogout: () => void
        }
        
    export interface ReduserState{
        isLogin: boolean,
        Userdata: UserdataInterface| undefined,
        token: string
    }
    export interface ReduserAction{
        Userdata?: UserdataInterface| undefined,
        type: string,
        token: string
    }
}

export default LoginInterfaces