import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-items">
        <h1 className="heading">
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p className="des">
          Millions of people are searching for jobs, salary <br /> information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-btn">
            Find job
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
