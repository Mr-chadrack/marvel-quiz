
import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    //const [btn, setBtn] = useState(false)
    
    const [error, setError] = useState('')
    const isBtnDisabled = (password.length > 5 && email !== '');
    console.log(isBtnDisabled)
     const navigate = useNavigate()


    const handleSubmit = e => {
        e.preventDefault()
       signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/Welcome', {replace :true})
                setEmail('')
                setpassword('')
            })
            .catch( error => {
               setError(error.message)
                setEmail('')
                setpassword('')
                
            })

    }



    return (
        <div className='signUploginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftLogin'>

                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {error!=='' && <span>{error}</span>}
                        <h2>Connexion</h2>

                        <form onSubmit={handleSubmit}>



                            <div className='inputBox'>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' autoComplete='off' required />
                                <label htmlFor='email' >email</label>
                            </div>

                            <div className='inputBox'>
                                <input onChange={(e) => setpassword(e.target.value)} value={password} type='password' autoComplete='off' required />
                                <label htmlFor='password' >Mot de passe</label>
                            </div>


                            {isBtnDisabled ? <button>Connexion</button> : <button disabled>Connexion</button>}

                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/Signup">Nouveau sur Marvel Quiz ? Inscrivez-vous.</Link>
                             <br/>
                             <Link className='simpleLink' to="/ForgetPassword">Mot de passe oublie ? voulez-vous recupérer.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
