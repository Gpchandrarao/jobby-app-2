import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="heder-container">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="web logo"
          className="header-web-logo"
        />
        <div className="header-web-container">
          <div className="header-web-items">
            <Link to="/" className="links">
              <p>Home</p>
            </Link>
            <Link to="/jobs" className="links">
              <p>Jobs</p>
            </Link>
          </div>
          <button type="button" className="btn" onClick={onClickLogOut}>
            Logout
          </button>
        </div>
        <div className="header-mobile-container">
          <div className="header-mobile-items">
            <Link to="/" className="links">
              <AiFillHome className="items" />
            </Link>
            <Link to="/jobs" className="links">
              <BsBriefcaseFill className="items" />
            </Link>
          </div>
          <button type="button" onClick={onClickLogOut}>
            <FiLogOut className="out-btn" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
