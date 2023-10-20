import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {
    salaryRange,
    employmentType,
    selectEmploymentType,
    selectSalaryRange,
  } = props

  const renderEmployment = () => (
    <div className="type-of-employment">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-ul-container">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.employmentTypeId}>
            <input
              id={eachItem.employmentTypeId}
              type="checkbox"
              className="filter-input"
              checked={employmentType.includes(eachItem.employmentTypeId)}
              value={eachItem.employmentTypeId}
              onChange={selectEmploymentType}
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalary = () => (
    <div className="salary-range">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-ul-container">
        {salaryRangesList.map(eachSalary => (
          <li key={eachSalary.salaryRangeId}>
            <input
              id={eachSalary.salaryRangeId}
              type="radio"
              className="filter-input"
              checked={salaryRange === eachSalary.salaryRangeId}
              value={eachSalary.salaryRangeId}
              onChange={selectSalaryRange}
            />
            <label htmlFor={eachSalary.salaryRangeId}>{eachSalary.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filter-container">
      {renderEmployment()}
      <hr className="hr" />
      {renderSalary()}
    </div>
  )
}
export default FilterGroup
