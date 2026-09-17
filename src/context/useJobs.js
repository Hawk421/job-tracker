import { useContext } from 'react'
import { JobContext } from './jobContextValue'

export function useJobs() {
  return useContext(JobContext)
}