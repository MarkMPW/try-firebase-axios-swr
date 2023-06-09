'use client'

import React, { useEffect, useState } from 'react' 
import { AppBar, Typography, Box, Button, Toolbar, Skeleton} from '@mui/material'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '../firebase'

export function Header() {
  const router = useRouter()
  console.log('Auth: ', auth)
  const [currentUser, setCurrentUser] = useState<string>('')

  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email || '')
      } else {
        setCurrentUser('')
        router.push('/')
        console.log('user logged out')
      }
    })
  }, [])

  if(!currentUser){
    return(
      <Skeleton variant='text' height={84}/>
    )
  }

  const handleSignOut = async () => {
    await signOut(auth).then(()=> {
      localStorage.removeItem('userInfo')
      router.push('/')
      console.log('Logged out successfully')
    }).catch((error) => {
      console.log(error.message)
    })
  }

  return (
    <Box>
      <AppBar>
        <Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Typography variant='h3' sx={{color: 'black'}}>Welcome</Typography>
          <Typography variant='h3' sx={{marginLeft: '20px'}}>{currentUser}</Typography>
          </Box>
          <Button variant='contained' sx={{backgroundColor: '#FF5478', '&:hover': {backgroundColor: '#FF5490'}}} onClick={handleSignOut}>Log-out</Button>
        </Toolbar>
      </AppBar>
    </Box> 
  )
}