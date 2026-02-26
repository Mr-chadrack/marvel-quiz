import React, { useState, Fragment, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout/Index';
import Quiz from '../Quiz/Index';
import { getDoc } from 'firebase/firestore';


const Welcome = () => {
    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

   
    

   
    useEffect(() => {
         // 1. Premier effet : Gérer uniquement l'écoute de la session
        const listener = onAuthStateChanged(auth, user => {
            user ? setUserSession(user) : navigate("/")

        })
         // 2. Deuxième effet : Réagir UNIQUEMENT quand userSession est rempli
        if (userSession !== null) {
            console.log(userData)
            const colRef = user(userSession.uid)

            getDoc(colRef)
                .then(snapshot => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.data()) // objet
                      

                    }
                })
                .catch(error => {
                    console.log(error.message)
                });
        }
            return listener

    },[userSession]);

    console.log(userSession)

    return userSession === null ? (

        <Fragment>
            <div className='loader'>

            </div>

        </Fragment>

    ) : (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    )


}

export default Welcome;
