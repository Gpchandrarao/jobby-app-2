import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updateData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        skills: fetchedData.job_details.skills,
        lifeAtCompany: fetchedData.job_details.life_at_company,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
      }

      const updatedSimilarJobs = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updateData,
        similarJobData: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {jobDetails, similarJobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <div className="jobDetails-container">
        <div className="job-details-items">
          <div className="company-logo-title-con">
            <img
              className="job-details-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details--star-rating">
                <AiFillStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-emp-container">
            <div className="location-emp-items-container">
              <div className="location-container">
                <MdLocationOn className="location" />
                <p>{location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill className="location" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="des-container">
            <div className="job-details-des">
              <p className="des-heading">Description</p>
              <div>
                <a className="company-site" href={companyWebsiteUrl}>
                  Visit
                  <BiLinkExternal />
                </a>
              </div>
            </div>
            <p className="jobDescription">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <p className="skills-heading">Skills</p>
            <ul className="skills-ul-container">
              {skills.map(eachSkills => (
                <li key={eachSkills.name} className="skills-items-container">
                  <img
                    src={eachSkills.image_url}
                    alt={eachSkills.name}
                    className="skills-images"
                  />
                  <p>{eachSkills.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lifeAtCompany-container">
            <h1>Life at Company</h1>
            <div className="lifeAtCompany-items">
              <p className="lifeAtCompany-des">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.image_url}
                alt="life at Company"
                className="lifeAtCompany-img"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-co">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-items-container">
            {similarJobData.map(eachJob => (
              <SimilarJobs key={eachJob.id} similarJobDetails={eachJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  LoadingView = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="job-details-failure-view-container">
      <img
        className="job-details-failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-details-failure-view-error">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-view-message">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="button" onClick={this.onRetryButton}>
        Retry
      </button>
    </div>
  )

  getJobsDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.inProgress:
        return this.LoadingView()
      case apiStatusConstants.failure:
        return this.failureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-details-main-container">
          {this.getJobsDetails()}
        </div>
      </div>
    )
  }
}

export default JobDetails
