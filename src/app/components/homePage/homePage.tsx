'use client'
import React from 'react'
import { GetAxiosData } from '../axiosAPI'
import { Header } from '../header'
import { GetSWRData } from '../swrAPI'
import { Box } from '@mui/material'

const HomePage = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '24px',
          // marginTop: '70px'
        }}
      >
        <GetSWRData />
        <GetAxiosData />
      </Box>
    </>
  )
}

export default HomePage
