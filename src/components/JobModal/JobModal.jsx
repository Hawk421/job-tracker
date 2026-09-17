import { useState } from 'react'
import { useJobs } from '../../context/JobContext'
import './JobModal.css'

function JobModal({
  editingJob,
  onClose,
}) {
  const {
  addJob,
  updateJob,
  actionLoading,
  actionError,
} = useJobs()

  const [company, setCompany] = useState(
    editingJob ? editingJob.company : ''
  )

  const [position, setPosition] = useState(
    editingJob ? editingJob.position : ''
  )

  const [status, setStatus] = useState(
    editingJob ? editingJob.status : 'Applied'
  )

  async function handleSubmit(event) {
    event.preventDefault()

const job = {
  company,
  position,
  status,
}

if (editingJob) {
  job.id = editingJob.id
}

let success

if (editingJob) {
  success = await updateJob(job)
} else {
  success = await addJob(job)
}

if (success) {
  onClose()
}
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2>
            {editingJob
              ? 'Edit application'
              : 'Add new application'}
          </h2>

          <button
            className="modal__close"
            onClick={onClose}
            disabled={actionLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {actionError && (
              <div className="modal__error">
                {actionError}
  </div>
)}
          <div className="form-group">
            <label htmlFor="company">
              Company
            </label>

            <input
              id="company"
              type="text"
              value={company}
              onChange={(event) =>
                setCompany(event.target.value)
              }
              placeholder="e.g. Yandex"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">
              Position
            </label>

            <input
              id="position"
              type="text"
              value={position}
              onChange={(event) =>
                setPosition(event.target.value)
              }
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="Applied">
                Applied
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Offer">
                Offer
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
              disabled={actionLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="button button--primary"
              disabled={actionLoading}
            >
            {actionLoading
              ? editingJob
                ? 'Saving...'
                : 'Adding...'
              : editingJob
                ? 'Save'
                : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobModal