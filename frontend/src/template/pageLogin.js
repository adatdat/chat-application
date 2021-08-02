import React, { useState,useEffect} from 'react'
const PageLogin = () => {

    //set lại trị cho valueinput dùng setvalueinput
    const [valueInput, setValueInput] = useState({
        username : '',
        password : ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState({})

    const handleSubmit = e => {
        e.preventDefault();
    
        setError((valueInput));
        setIsSubmitting(true);
      };
    console.log({valueInput});

    return <div className="wrapper fadeInDown">
        <div id="formContent">
            <h2 className="active"> Sign In </h2>
            <form>

                <input type="text"
                       className="fadeIn second"
                       value={valueInput.username}
                       onChange={(e) =>setValueInput({...valueInput,username : e.target.value})}
                       placeholder="username" />
                <input type="text"
                       className="fadeIn third"
                       value={valueInput.password}
                       onChange={(e) =>setValueInput({...valueInput,pasword : e.target.value})}
                       placeholder="password" />
                <input type="submit"
                       onClick={handleSubmit()}
                       className="fadeIn fourth"
                       value="Log In" />
            </form>
            <div id="formFooter">
                <a className="underlineHover">Forgot Password?</a>
            </div>
        </div>
    </div>
}
export default PageLogin