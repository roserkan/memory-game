import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css'
import { login as auth } from "../../../services/authService";
import { toastr } from '../../../utilities/toastr';
import { setCookie } from '../../../utilities/cookie';


export default function Login(props) {

    let navigate = useNavigate();



    useEffect(() => {
        if (props.isAuthenticated === true && props.claim === 'admin') {
            navigate('/admin')
        }
    }, [props])



    const login = e => {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value

        if (username != '' && password != '') {
            auth({ username, password })
                .then(res => {
                    if (res.data.status === 200) {
                        let claim = res.data.data.claim;
                        if (claim === 'admin') {
                            toastr('success', 'Başarılı', 'Giriş yapıldı, yönlendiriliyorsunuz')
                            e.target.username.value = '';
                            e.target.password.value = '';
                            setTimeout(() => {
                                window.location.reload()
                            }, 1500);
                            setCookie('auth', res.data.token)
                        }else{
                            document.querySelector('#authError').innerText = 'Kullanıcı bulunamadı!'
                        }



                    } else {
                        document.querySelector('#authError').innerText = 'Kullanıcı bulunamadı!'
                    }

                })
        }



    }

    return (
        <div className='admin-login'>
            <div className="background-admin-login">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={login} className='admin-login-form'>
                <h3>Login Here</h3>

                <label>Username</label>
                <input type="text" placeholder="Email or Phone" id="username" name="username"></input>

                <label>Password</label>
                <input type="password" placeholder="Password" id="password" name="password" autoComplete="off"></input>
                <div id="authError"  
                style={{position: 'absolute', paddingTop: '1rem', color:'#fff', left: '50%', transform:'translateX(-50%)', fontSize:'14px'}}>
                    
                    </div>
                <button>Log In</button>
            </form>
        </div>
    )
}
