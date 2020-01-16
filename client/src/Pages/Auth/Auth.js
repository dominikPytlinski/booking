import React, { Component, Fragment } from 'react';

import './Auth.css';

class Auth extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    emailHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <form className="login-form">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" value={this.state.email} onChange={this.emailHandler}/>
                    </div>
                    <div>
                        <label htmlFor="password">Hasło:</label>
                        <input type="password" id="password" value={this.state.password} onChange={this.passwordHandler} />
                    </div>
                    <button className="btn btn-success" type="submit">Zaloguj</button>
                </form>
            </Fragment>
        )
    }
}

export default Auth
