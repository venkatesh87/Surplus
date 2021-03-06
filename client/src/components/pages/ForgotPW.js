import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Input } from "react-materialize";
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
)

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  };

  handleFormSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => this.setState({ ...INITIAL_STATE }))
      .catch(error => this.setState({ error }));

    event.preventDefault();
	};

	handleInputChange = event => {
		const {name, value} = event.target;
		this.setState({	[name]: value });
	};

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <div className="login-form">
        <form onSubmit={this.handleFormSubmit}>
          <Input s={12} type="text" onChange={this.handleInputChange}
            label="Email Address"  value={this.state.email} name="email"
          />
          <button disabled={isInvalid} className="btn indigo darker-4">Reset My Password</button>
          { error && <p>{error.message}</p>}
        </form>
      </div>
    )
  }
};

const PasswordForgetLink = () => (
  <div>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </div>
);

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
