import React, {useRef,useEffect, useState,Fragment} from 'react';
import { Link } from 'react-router-dom'

const Landing = () => {
   const [btn,setBtn] = useState(false)

    const refWolverine = useRef(null)

    useEffect(() => {
        refWolverine.current.classList.add('startingImg')
        setTimeout(() => {
             refWolverine.current.classList.remove('startingImg')
             setBtn(true)
        }, 1000)
    }, [])

    const  setleftImg = () =>{
        refWolverine.current.classList.add('leftImg')
         refWolverine.current.classList.remove('rightImg')
    } 

    const setRightImg = () => {
        refWolverine.current.classList.add('rightImg')
        refWolverine.current.classList.remove('leftImg')
    }
     const Supp = () => {
         refWolverine.current.classList.remove('rightImg')
        refWolverine.current.classList.remove('leftImg')
    }

    const displayBtn = btn && (
          <Fragment>
             <div onMouseOver={setleftImg} onMouseOut={Supp}  className='leftBox'>
                <Link className='btn-welcome' to ='/Signup'>Inscription</Link>
            </div>

            <div onMouseOver={setRightImg} onMouseOut={Supp}  className='rightBox'>
                <Link className='btn-welcome' to='/Login'>Connexion</Link>
            </div>
          </Fragment>
    )

    return (
        <main ref={refWolverine} className='welcomePage'>
            {displayBtn}
        </main>
    );
}

export default Landing;
