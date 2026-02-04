import React, {useRef,useEffect, useState,Fragment} from 'react';

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
                <button className='btn-welcome'>Inscription</button>
            </div>

            <div onMouseOver={setRightImg} onMouseOut={Supp}  className='rightBox'>
                <button className='btn-welcome'>Connexion</button>
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
