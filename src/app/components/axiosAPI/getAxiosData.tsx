'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Paper, Typography, Skeleton, Stack } from '@mui/material'

interface dog {
  message: string;
  status: boolean;
}

export const GetAxiosData = () => {

  const [dogData, setDogData] = useState<dog>({ message: '', status: false })
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    try {
      setLoading(true)
      const url = 'https://dog.ceo/api/breeds/image/random'
      const response = await axios.get<dog>(url)
      const data = response.data
      setDogData({ message: data.message, status: data.status })
    } catch (error){
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <>
      {isLoading ? 
      (
        <Stack>
          <Skeleton variant='text' width={401} height={100}/>
          <Skeleton variant='rectangular' width={401} height={250}/>
        </Stack>
      ): (
        <Paper
        sx={{
          width: '50%',
          height: 'fit-content',
          padding: '12px',
          marginTop: '70px'
        }}
      >
        <Box>
          <Typography variant='h3'>Axios API</Typography>
            <img
              src={dogData.message}
              alt='Random Dog Image'
              style={{ width: '100%', height: 'auto' }}
            />
        </Box>
      </Paper>
      )} 
    </>
  )
}