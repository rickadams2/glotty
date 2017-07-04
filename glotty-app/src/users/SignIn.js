import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import signIn from '../actions/users/sign-in'
import './SignIn.css'

export class SignIn extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  submitForm(event) {
    event.preventDefault()
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.signIn(user)
  }

  render() {
    return (
      <div className="sign-in grid-container">
        <form onSubmit={this.submitForm.bind(this)}>
          <h2>Sign In</h2>
          <div className="grid-x">
            <div className="medium-offset-4 medium-4 cell">
              <label>Email
                <input ref="email" type="email" placeholder="Email address" />
              </label>
            </div>
            <div className="medium-offset-4 medium-4 cell">
              <label>Password
                <input ref="password" type="password" placeholder="Password" />
              </label>
            </div>
            <div className="medium-offset-4 medium-4 cell right">
              <input type="submit" className="button" value="Sign In" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { signIn })(SignIn)
