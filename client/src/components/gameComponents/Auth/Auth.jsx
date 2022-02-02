import React from 'react'
import './Auth.css'
import { add } from "../../../services/userService";
import { login as auth } from "../../../services/authService";
import { setCookie } from "../../../utilities/cookie";
import { toastr } from '../../../utilities/toastr'
export default function Auth() {



    const signUp = e => {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }

    const signIn = e => {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }

    const validateUsername = e => {
        let value = e.target.value
        let usernameError = document.querySelector('#usernameError');
        if (value === '') {
            usernameError.innerText = 'Zorunlu alan!'
        } else if (value.length < 2) {
            usernameError.innerText = 'En az 2 karakterli olmalı!'
        } else if (value.length > 25) {
            usernameError.innerText = 'En fazla 24 karakterli olmalı!'
        } else {
            usernameError.innerText = ''
        }
    }

    const validatePassword = e => {
        let value = e.target.value
        let passwordError = document.querySelector('#passwordError');
        if (value === '') {
            passwordError.innerText = 'Zorunlu alan!'
        } else if (value.length < 6) {
            passwordError.innerText = 'En az 6 karakterli olmalı!'
        } else if (value.length > 14) {
            passwordError.innerText = 'En fazla 14 karakterli olmalı!'
        } else {
            passwordError.innerText = ''
        }
    }

    const validateUsernameForLogin = e => {
        let value = e.target.value
        let usernameError = document.querySelector('#usernameErrorLogin');
        if (value === '') {
            usernameError.innerText = 'Zorunlu alan!'
        } else if (value.length < 2) {
            usernameError.innerText = 'En az 2 karakterli olmalı!'
        } else if (value.length > 25) {
            usernameError.innerText = 'En fazla 24 karakterli olmalı!'
        } else {
            usernameError.innerText = ''
        }
    }

    const validatePasswordForLogin = e => {
        let value = e.target.value
        let passwordError = document.querySelector('#passwordError');
        if (value === '') {
            passwordError.innerText = 'Zorunlu alan!'
        } else if (value.length < 6) {
            passwordError.innerText = 'En az 6 karakterli olmalı!'
        } else if (value.length > 14) {
            passwordError.innerText = 'En fazla 14 karakterli olmalı!'
        } else {
            passwordError.innerText = ''
        }
    }

    const register = e => {
        e.preventDefault()
        let username = e.target.username.value;
        let password = e.target.password.value
        let usernameError = document.querySelector('#usernameError').innerText;
        let passwordError = document.querySelector('#passwordError').innerText;
        if (usernameError === '' && passwordError === '') {
            add({ username, password })
                .then(res => {
                    if (res.data.status === 200) {
                        toastr('success', 'Başarılı', 'Üyeliğiniz oluşturuldu')
                        e.target.username.value = '';
                        e.target.password.value = ''
                    } else if (res.data.message === 'UNIQUE ERROR') {
                        document.querySelector('#authError').innerText = 'Böyle bir kullanıcı zaten var!'
                    } else {
                        toastr('success', 'Hata', 'Beklenmeyen hata!')
                    }
                })
        }



    }

    const login = e => {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value
        let usernameError = document.querySelector('#usernameErrorLogin').innerText;
        let passwordError = document.querySelector('#passwordErrorLogin').innerText;
        if (usernameError === '' && passwordError === '') {
            auth({ username, password })
                .then(res => {
                    if (res.data.status === 200) {
                        toastr('success', 'Başarılı', 'Giriş yapıldı, yönlendiriliyorsunuz')
                        e.target.username.value = '';
                        e.target.password.value = '';
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500);
                        setCookie('auth', res.data.token)
                    } else if (res.data.message === 'Kullanıcı bulunamadı') {
                        document.querySelector('#authErrorLogin').innerText = 'Kullanıcı bulunamadı!'
                    }else {
                        toastr('success', 'Hata', 'Beklenmeyen hata!')
                    }
                    
                })
        }



    }

    return (
        <div className='auth'>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={login}>
                        <h1>Giriş Yap</h1>
                        <div className="social-container"> </div>
                        <input name="username" placeholder="Kullanıcı adı" onChange={validateUsernameForLogin} />
                        <span className='error' id="usernameErrorLogin"></span>
                        <input name="password" type="password" placeholder="Şifre" autoComplete="off" onChange={validatePasswordForLogin} />
                        <span className='error' id="passwordErrorLogin"></span>
                        <button style={{ marginTop: '1rem' }}>Giriş yap</button>
                        <span className='authError' id="authErrorLogin"></span>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={register}>
                        <h1>Kayıt Ol</h1>
                        <div className="social-container"> </div>
                        <input name="username" placeholder="Kullanıcı adı" onChange={validateUsername} />
                        <span className='error' id="usernameError"></span>
                        <input name="password" type="password" placeholder="Şifre" autoComplete="off" onChange={validatePassword} />
                        <span className='error' id="passwordError"></span>
                        <button style={{ marginTop: '1rem' }}>Kayıt ol</button>
                        <span className='authError' id="authError"></span>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Henüz aramıza katılmadın mı?</h1>
                            <p>Hemen üyeliğini oluştur ve oyuna başla</p>
                            <button className="ghost" id="signIn" onClick={signIn}>Kayıt ol</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Merhaba oyuncu!</h1>
                            <p>Kullanıcı bilgilerini gir ve oyuna başla</p>
                            <button className="ghost" id="signUp" onClick={signUp}>Zaten üyeyim</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


