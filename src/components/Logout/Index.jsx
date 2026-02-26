import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const Logout = ({score}) => {
    const [checked, setchecked] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (checked) {
            signOut(auth).then(() => {
                // console.log('Deconnexion')
                // Sign-out successful.
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }).catch(() => {

            });
        }
    }, [checked])

    const handleChange = e => {
        setchecked(e.target.checked)
    }
    return (

        <>
            
            <div className='logoutContainer'>

                <label className='switch'>
                    <input
                        onChange={handleChange}
                        type='checkbox'
                        checked={checked}

                    />
                    <span className='slider round'></span>
                </label>


            </div>
        </>
    );
}

export default Logout;
