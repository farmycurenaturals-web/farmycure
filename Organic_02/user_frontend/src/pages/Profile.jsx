import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { useAuth } from '../context/AuthContext'

const MAX_FILE_SIZE = 2 * 1024 * 1024

const Profile = () => {
  const { user, isAuthenticated, updateProfileImage } = useAuth()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const avatarSrc = useMemo(
    () =>
      preview ||
      user?.profileImage ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E5E7EB&color=111827`,
    [preview, user?.name, user?.profileImage]
  )

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: '/profile', message: 'Please login to continue' }} />
  }

  const handleFileChange = (event) => {
    setError('')
    setMessage('')
    const selected = event.target.files?.[0]
    if (!selected) return
    if (!selected.type.startsWith('image/')) {
      setError('Only image files are allowed')
      return
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError('Image must be 2MB or smaller')
      return
    }
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please choose an image file first')
      return
    }
    try {
      setUploading(true)
      setError('')
      setMessage('')
      await updateProfileImage(file)
      setMessage('Profile image updated successfully')
      setFile(null)
      setPreview('')
    } catch (err) {
      setError(err.message || 'Failed to upload profile image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <main className="py-16 min-h-[70vh] bg-background">
      <Container>
        <div className="max-w-xl mx-auto bg-white rounded-card p-6 border border-gray-100">
          <h1 className="font-heading text-2xl font-bold text-text-primary mb-2">Profile</h1>
          <p className="text-sm text-gray-500 mb-6">Manage your profile image.</p>

          <div className="flex items-center gap-4 mb-6">
            <img src={avatarSrc} alt="Profile avatar" className="w-16 h-16 rounded-full object-cover border border-gray-200" />
            <div>
              <p className="font-medium text-text-primary">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {message && <p className="mb-4 text-sm text-green-700">{message}</p>}
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-200 rounded-card px-4 py-3"
            />
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-[#1f4d36] text-white py-3 rounded-lg font-medium hover:bg-[#173c2b] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Profile Image'}
            </button>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Profile

