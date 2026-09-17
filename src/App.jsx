import {
  Routes,
  Route,
} from 'react-router-dom'

import { useState } from 'react'

import AppLayout from './components/AppLayout/AppLayout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import JobModal from './components/JobModal/JobModal'

import Dashboard from './pages/Dashboard/Dashboard'
import Applications from './pages/Applications/Applications'
import Statistics from './pages/Statistics/Statistics'
import Settings from './pages/Settings/Settings'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)

  function handleAddJob() {
    setEditingJob(null)
    setIsModalOpen(true)
  }

  function handleEditJob(job) {
    setEditingJob(job)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingJob(null)
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        element={
          <ProtectedRoute>
            <>
              <AppLayout
                onAddClick={handleAddJob}
              />

              {isModalOpen && (
                <JobModal
                  editingJob={editingJob}
                  onClose={handleCloseModal}
                />
              )}
            </>
          </ProtectedRoute>
        }
      >
        <Route
          path="/"
          element={
            <Dashboard
              onEditJob={handleEditJob}
            />
          }
        />

        <Route
          path="/applications"
          element={
            <Applications
              onEditJob={handleEditJob}
            />
          }
        />

        <Route
          path="/statistics"
          element={<Statistics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  )
}

export default App