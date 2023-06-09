'use client'

import React, { useEffect, useState } from 'react'
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
  TableCell,
  Paper,
  Typography,
  Stack,
  Skeleton
} from '@mui/material'

interface province {
  province: string;
  total_registered_vote: number;
}

interface provinceData {
  province: province[];
}

export const GetSWRData = () => {
  const [data, setData] = useState<provinceData>()

  useEffect(() => {
    fetch('https://static.ectreport.com/data/refs/info_province.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  if (!data) {
    return (
      <Stack>
        <Skeleton variant='text' width={301} height={100}/>
        <Skeleton variant='rectangular' width={301} height={1000}/>
      </Stack>
    )
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))
  return (
    <Paper sx={{ padding: '12px', height: '100%', marginTop: '70px' }}>
      <Typography variant='h3'>SWR API</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Province</StyledTableCell>
              <StyledTableCell>Total Registered Vote</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.province.map((province, index) => (
              <StyledTableRow key={`${province}: ${index}`}>
                <StyledTableCell>{province.province}</StyledTableCell>
                <StyledTableCell>
                  {province.total_registered_vote}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
