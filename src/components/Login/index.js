import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    userName: '',
    password: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  renderUserName = () => {
    const {userName} = this.state
    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          value={userName}
          placeholder="Username"
          id="username"
          className="input"
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          placeholder="password"
          id="password"
          className="input"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {userName, password} = this.state
    const userDetails = {userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <div className="container">
        <div className="login-container">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="logo-img"
            />
          </div>
          <form onSubmit={this.onSubmitForm} className="form-container">
            {this.renderUserName()}
            {this.renderPassword()}
            <button type="submit" className="button">
              Login
            </button>
            {/* <p className="errorMsg">Error</p> */}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
