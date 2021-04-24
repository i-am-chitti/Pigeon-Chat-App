import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {
    const [{user}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div>
            <div className="login">
                <div className="login_container">
                    <img src="./../icon.png" alt="logo" />
                    <div className="login_text">
                        <h1>Sign in to Pigeon</h1>
                    </div>
                    <Button type="submit" onClick={signIn}>
                        Sign In With Google
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
