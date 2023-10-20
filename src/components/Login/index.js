import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userName: '',
    passwor: '',
    errorMsg: '',
    onSubmitFail: false,
  }

  onChangePassword = event => {
    this.setState({passwor: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({onSubmitFail: true, errorMsg})
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
    const {passwor} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          value={passwor}
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

    const {userName, passwor} = this.state
    const userDetails = {username: userName, password: passwor}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {onSubmitFail, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect path="/" />
    }
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
            {onSubmitFail ? <p className="errorMsg">{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
