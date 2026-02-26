import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { QuizMarvel } from '../quiZmarvel/index';
import Levels from '../Levels';
import ProgresseBarre from '../ProgresseBarre/Index';
import Logout from '../Logout/Index';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';




const Quiz = ({ userData }) => {
    const [levelName] = useState(["debutant", "confirme", "expert"]);
    const [quizLevel, setQuizLevel] = useState(0);
    const [maxQuestions] = useState(10);
    const [storedQuestions, setStoredQuestions] = useState([]);
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [idQuestion, setIdQuestion] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [userAnswer, setUserAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const storeDataRef = useRef() // une reference
    const [showWelcomeM, setShowWelcomeM] = useState(false)
    const [quizEnd, setQuizEnd] = useState(false)



    const loadQuestions = (quizz) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        // verifier que marvelQuiz est definie avant tous
        if (fetchedArrayQuiz.length >= maxQuestions) {

            storeDataRef.current = fetchedArrayQuiz;
            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
            setStoredQuestions(newArray);

        }
    };


    // Mes functions 

    const gameOver = () => {
        setQuizEnd(true)
    }

    const showWelcomeMsg = pseudo => {
        if (!showWelcomeM) {
            setShowWelcomeM(true)
            toast.warn(` Bienvenue ${pseudo} et bonne chance`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",


            });
        }

    }

    const changeDisabled = (val) => {
        setBtnDisabled(val)

    }
    const submitanswer = (selectedAnswer) => {
        setUserAnswer(selectedAnswer)

    }

    const nextQuestions = () => {
        // Vérifiez si nous avons atteint la dernière question
        if (idQuestion === maxQuestions - 1) {
            gameOver()
            console.log("over")
        } else {
            // Vérifiez si un userAnswer a été donné
            if (userAnswer !== null) {
                const currentQuestion = storeDataRef.current[idQuestion]; // Récupérer la question actuelle
                const goodAnswer = currentQuestion.answer; // Obtenez la bonne réponse




                // Vérifiez si la réponse est correcte et mettez à jour le score
                if (userAnswer === goodAnswer) {
                    setScore(prevScore => prevScore + 1); // Incrémentez le score

                    toast.success('Bravo! +1', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",

                    });
                } else {
                    toast.error('Ouf! reponse raté', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",

                    });
                }
                <Logout score={score} />
            }

            // Préparez la prochaine question
            setIdQuestion(prev => prev + 1);
            setUserAnswer(null); // Réinitialisez la réponse de l'utilisateur
            setBtnDisabled(false); // Réactivez le bouton pour la prochaine question
        }
    };


    // Mes useEffect

    useEffect(() => {
        loadQuestions(levelName[quizLevel]);
    }, [quizLevel]);

    useEffect(() => {
        if (storedQuestions.length > 0 && idQuestion < storedQuestions.length) {
            setQuestion(storedQuestions[idQuestion].question);
            setOptions(storedQuestions[idQuestion].options);

        }

        setUserAnswer(null);
        changeDisabled(true)



    }, [storedQuestions, idQuestion]);

    useEffect(() => {
        if (userData.pseudo) {
            showWelcomeMsg(userData.pseudo)
        }
    })

    return (quizEnd === true) ? (
        <QuizOver />
    )
        :
        (
            <Fragment>

                <div className="scoreContainer">
                    <div className='text-score'>
                        <h3><strong>Score : {score}</strong></h3>
                    </div>
                </div>
                <ToastContainer />
                <Levels />
                <ProgresseBarre idQuestion={idQuestion} maxQuestions={maxQuestions} />

                <h2>Question : {question} : {userAnswer}</h2>
                {options.map((option, index) => (
                    <p key={index}
                        onClick={() => {
                            submitanswer(option);
                            changeDisabled();
                        }}

                        className={`answerOptions ${userAnswer === option ? 'selected' : ''}`}
                    >
                        {option}

                    </p>
                ))}
                <button
                    disabled={btnDisabled}
                    className='btnSubmit'
                    onClick={nextQuestions}
                > {idQuestion < maxQuestions -1 ? "Suivant" : "Terminer"}
                </button>

            </Fragment>
        )


};

export default Quiz;
