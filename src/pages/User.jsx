import Login from './Login'
import { ShowContent } from '../services/Get'
import { useState, useEffect } from 'react'

const User = ({ user }) => {
  const [art, setArt] = useState([])

  useEffect(() => {
    const stuff = async () => {
      const response = await ShowContent(user.id)
      console.log('This is the stuff response in Users', response)
      setArt(response)
    }
    stuff()
  }, [])

  // stuff()
  return <div>hello{user.userName}</div>
}

export default User
