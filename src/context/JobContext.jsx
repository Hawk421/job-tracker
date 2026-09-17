import {
  useEffect,
  useState,
} from 'react'

import { JobContext } from './jobContextValue'

import { useAuth } from './useAuth'
import { apiFetch } from '../api'

export function JobProvider({ children }) {
  const { token } = useAuth()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      return
    }

    apiFetch('/jobs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load jobs')
        }

        return response.json()
      })
      .then((data) => {
        setJobs(data)
      })
      .catch((error) => {
        console.error(error)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token])

  async function addJob(newJob) {
    setActionError(null)
    setActionLoading(true)

    try {
      const response = await apiFetch(
        '/jobs',
        {
          method: 'POST',
          body: JSON.stringify(newJob),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create job')
      }

      const createdJob = await response.json()

      setJobs((currentJobs) => [
        ...currentJobs,
        createdJob,
      ])

      return true
    } catch (error) {
      console.error(error)

      setActionError(
        'Не удалось выполнить операцию. Сервер недоступен.'
      )

      return false
    } finally {
      setActionLoading(false)
    }
  }

  async function updateJob(updatedJob) {
    setActionError(null)
    setActionLoading(true)

    try {
      const response = await apiFetch(
        `/jobs/${updatedJob.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedJob),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update job')
      }

      const savedJob = await response.json()

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === savedJob.id
            ? savedJob
            : job
        )
      )

      return true
    } catch (error) {
      console.error(error)

      setActionError(
        'Не удалось выполнить операцию. Сервер недоступен.'
      )

      return false
    } finally {
      setActionLoading(false)
    }
  }

  async function deleteJob(jobId) {
    setActionError(null)
    setActionLoading(true)

    try {
      const response = await apiFetch(
        `/jobs/${jobId}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete job')
      }

      setJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job.id !== jobId
        )
      )

      return true
    } catch (error) {
      console.error(error)

      setActionError(
        'Не удалось выполнить операцию. Сервер недоступен.'
      )

      return false
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <JobContext.Provider
      value={{
        jobs: token ? jobs : [],
        loading: token ? loading : false,
        error,
        actionError,
        actionLoading,
        addJob,
        updateJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}
