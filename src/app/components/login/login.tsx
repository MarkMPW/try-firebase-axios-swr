'use client'

import React, { useState } from 'react'
import { Box, TextField, Button, Paper } from '@mui/material'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { auth } from '../firebase'

interface login {
  email: string
  password: string
}

const Login = () => {
  const [reqLogin, setReqLogin] = useState<login>({
    email: '',
    password: '',
  })

  const router = useRouter()

  const onChangeEmail = (value: string) => {
    setReqLogin((prev) => ({
      ...prev,
      email: value,
    }))
  }

  const onChangePassword = (value: string) => {
    setReqLogin((prev) => ({
      ...prev,
      password: value,
    }))
  }

  const signUp = () => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(auth, reqLogin.email, reqLogin.password)
        .then((userInfo) => {
          router.push('/homepage')
          console.log('UserInfo: ',userInfo)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    })
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ padding: '24px' }}>
        <Box component='h2' mb={3}>
          Sign in 🦊
        </Box>
        <Box component='form'>
          <Box sx={{ display: 'flex' }}>
            <Box mr='20px'>
              <TextField
                label='Email'
                required
                value={reqLogin.email}
                name='email'
                onChange={(e) => onChangeEmail(e.target.value)}
              />
            </Box>
            <Box>
              <TextField
                label='Password'
                type='password'
                required
                value={reqLogin.password}
                name='password'
                onChange={(e) => onChangePassword(e.target.value)}
              />
            </Box>
          </Box>
          <Button
            sx={{ marginTop: '24px' }}
            variant='contained'
            fullWidth={true}
            onClick={signUp}
          >
            Sign in
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login