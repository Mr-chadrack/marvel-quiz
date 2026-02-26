import React, { useState } from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth,user } from '../Firebase/firebaseConfig'
import { setDoc } from 'firebase/firestore';



const Signup = () => {
    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')

    const navigate = useNavigate() //cette nous aide 
    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { email, password,pseudo } = loginData
        createUserWithEmailAndPassword(auth, email, password)
        .then(authUser => {
            return setDoc(user(authUser.user.uid),{
                pseudo,
                email
            })
        })
        .then(() => {
            setLoginData({...data})
            navigate('/Welcome')
        })
        .catch(error => {
            setError(error.message)
            setLoginData({...data})
        })
    }

    const { pseudo, email, password, confirmPassword } = loginData

    const btn = pseudo === ''|| pseudo.indexOf('@') > -1 || email === '' || password === '' || password !== confirmPassword 
    ? <button disabled>Inscription</button> : <button type='submit'>Inscription</button> 

    // gestion erreures

    const errorMsg = error !== '' && <span>{error}</span>

    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className='formBoxLeftSignup'>

                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>

                            <div className='inputBox'>
                                <input onChange={handleChange} value={pseudo} type='text'  id='pseudo' autoComplete='off' required />
                                <label htmlFor='pseudo' >Pseudo</label>
                            </div>

                            <div className='inputBox'>
                                <input onChange={handleChange} value={email}  type='email' id='email' autoComplete='off' required />
                                <label htmlFor='email' >email</label>
                            </div>

                            <div className='inputBox'>
                                <input onChange={handleChange} value={password}  type='password' id='password' autoComplete='off' required />
                                <label htmlFor='password' >Mot de passe</label>
                            </div>


                            <div className='inputBox'>
                                <input onChange={handleChange} value={confirmPassword}  type='password' id='confirmPassword' autoComplete='off' required />
                                <label htmlFor='confirmPassword' >Confimer le Mot de passe</label>
                            </div>
                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to ="/login">Déjà inscrit ? connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
