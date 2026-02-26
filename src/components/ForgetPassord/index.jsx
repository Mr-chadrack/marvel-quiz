import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {

    const [email,setEmail]= useState('')
    const navigate = useNavigate()
    const [succes, setSucces] = useState(null)
    const [error, setError] = useState(null)


    const handleSubmit = async(e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth,email)
       
        .then(()=>{
            setError(null)
            setSucces(`consultez votre Email ${email} pour changer le mot de passe`)
            setEmail('')
            
           
            setTimeout(() =>{
                navigate('/Login')
            },5000)
        })
        .catch(error =>{
            setError(error.message)

            setEmail('')
        });
        
    }
   

    const disable = email===""
    return (
      <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftForget'>

                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                       {succes && <span style={{
                            border:'1px solid green',
                            background:'green',
                            color:'#fff'
                       }}
                       >
                        {succes}
                        </span>}

                       {
                        error && <span>{error}</span>
                       }

                        <h2>Mot de passe oublié ?</h2>

                        <form onSubmit={handleSubmit}>

                            <div className='inputBox'>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' autoComplete='off' required />
                                <label htmlFor='email' >email</label>
                            </div>
                            <button disabled={disable}>Récuperer</button>
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/Signup">Déjà inscrit ? connectez-vous.</Link>

                           

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
