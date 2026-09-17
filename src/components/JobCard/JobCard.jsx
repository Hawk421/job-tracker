import { useJobs } from '../../context/JobContext'
import './JobCard.css'

function JobCard({
  company,
  position,
  status,
  onDelete,
  onEdit,
}) {
  const { actionLoading } = useJobs()

  return (
    <div className="job-card">
      <div className="job-card__info">
        <h3 className="job-card__position">
          {position}
        </h3>

        <p className="job-card__company">
          {company}
        </p>
      </div>

      <div className="job-card__right">
        <span
          className={`job-card__status job-card__status--${status.toLowerCase()}`}
        >
          {status}
        </span>

        <div className="job-card__actions">
          <button
            className="job-card__edit"
            onClick={onEdit}
            disabled={actionLoading}
          >
            Edit
          </button>

          <button
            className="job-card__delete"
            onClick={onDelete}
            disabled={actionLoading}
          >
            {actionLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobCard