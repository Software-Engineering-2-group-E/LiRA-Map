import { useState } from "react";
import { useHistory } from "react-router-dom";

import { post } from "../queries/fetch";

import '../css/login.css';

interface State {
    username : string,
    email : string,
    password : string,
}

const Login_old = () => {
    const [ state, setState ] = useState<State>({
        username : "",
        email : "",
        password :"",
    });
    
    const handleChange = (event : any) => {
        event.preventDefault();
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }
    
    
    let history = useHistory();
     
    const redirect = () => {
        post('/login', state, (data: any) => {
            if ( data.status === "ok")
                history.push("/rides");
        })
    }

    return (
        <div className='signup-wrapper'>
            <h2>Sign Up</h2>
            <div>
                <div className='signup-input-container'>
                    <label htmlFor="username">Username</label>
                    <input type='text' name='username' onChange={handleChange} />
                </div>
                <div className='signup-input-container'>
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' onChange={handleChange} />
                    
                </div>
                <div className='signup-input-container'>
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' onChange={handleChange}/>
                    
                </div>
                <div className='btn signup-btn' onClick={redirect}>Register Me</div>
            </div>
        </div>
    )
}


export default Login_old;
