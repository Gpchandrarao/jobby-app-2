import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import './index.css'
import FilterGroup from '../FilterGroup'
import JobItem from '../JobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    allJobs: {},
    employmentType: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, salaryRange, employmentType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.jobs.map(eachJobs => ({
        companyLogoUrl: eachJobs.company_logo_url,
        employmentType: eachJobs.employment_type,
        id: eachJobs.id,
        jobDescription: eachJobs.job_description,
        location: eachJobs.location,
        packagePerAnnum: eachJobs.package_per_annum,
        rating: eachJobs.rating,
        title: eachJobs.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        allJobs: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => this.getAllJobs()

  renderSearchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="searchBar-container">
        <input
          type="search"
          placeholder="search..."
          value={searchInput}
          onChange={this.onChangeSearchInput}
          className="search-input"
        />
        <button
          type="button"
          className="search-img"
          onClick={this.onClickSearch}
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  jobSuccessView = () => {
    const {allJobs} = this.state
    const jobsLength = allJobs.length > 0
    return jobsLength ? (
      <div>
        <ul>
          {allJobs.map(each => (
            <JobItem jobItems={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Founds</h1>
        <p>we could not find any jobs. Try Other filters.</p>
      </div>
    )
  }

  jobLoadingView = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getAllJobs()
  }

  jobFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! something Went Wrong</h1>
      <p>We cannot seem to find page you are looking for.</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.jobSuccessView()
      case apiStatusConstants.inProgress:
        return this.jobLoadingView()
      case apiStatusConstants.failure:
        return this.jobFailureView()
      default:
        return null
    }
  }

  selectSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getAllJobs)
  }

  selectEmploymentType = event => {
    const {value, checked} = event.target

    const {employmentType} = this.state

    if (checked === true) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, value],
        }),
        this.getAllJobs,
      )
    } else {
      const updatedType = employmentType.filter(eachType => eachType !== value)
      this.setState({employmentType: updatedType}, this.getAllJobs)
    }
  }

  render() {
    const {salaryRange, employmentType} = this.state
    return (
      <div className="job-container">
        <Header />
        <div className="job-container-items">
          <div className="job-leftSide-items">
            <Profile />
            <hr className="hr" />
            <FilterGroup
              salaryRange={salaryRange}
              employmentType={employmentType}
              selectEmploymentType={this.selectEmploymentType}
              selectSalaryRange={this.selectSalaryRange}
            />
          </div>
          <div className="job-rightSide-items">
            {this.renderSearchBar()}
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
