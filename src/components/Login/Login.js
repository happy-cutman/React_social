import React from 'react';

let LoginForm = (props) => {
    return (
        <form action=''>
            <div>
                <input type='text' placeholder={'login'}/>
            </div>
            <div>
                <input type='text' placeholder={'password'}/>
            </div>
            <div>
                <input type='checkbox'/> remember me
            </div>
            <div>
                <button type={'submit'}>Submit</button>
            </div>
        </form>
    )
};

let Login = (props) => {
    return <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
};

export default Login;