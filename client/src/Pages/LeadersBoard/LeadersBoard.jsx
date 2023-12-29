import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function LeadersBoard() {

    const { id } = useParams();
    const [data, setData] =useState([]);
    const token = useSelector((state) => state.token);


    function convertTimeDifference(elapsedTimeInMilliseconds) {
        const seconds = elapsedTimeInMilliseconds / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
      
        if (seconds < 60) {
          return { value: seconds.toFixed(2), unit: 'seconds' };
        } else if (minutes < 60) {
          return { value: minutes.toFixed(2), unit: 'minutes' };
        } else if (hours < 24) {
          return { value: hours.toFixed(2), unit: 'hours' };
        } else {
          return { value: days.toFixed(2), unit: 'days' };
        }
      }
      

    const getLeadersBoardByCours = async () => {
        const { data } = await axios.get(
          `http://localhost:6001/course/leaders-board/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(data);
      };
    
      useEffect(()=>{
        getLeadersBoardByCours();
      },[id])

  return (
    <Box margin={3}>
        <Typography variant='h4' component='h4'>
            {
                data.length > 0 &&

                data[0]?.courseDetails?.title
            }
        </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Time Taken</TableCell>
            <TableCell align="right">Attempts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => {
            const elapsedTime = convertTimeDifference(row?.totalTimeTaken);

            return(
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row?.userDetails?.username}</TableCell>
              <TableCell align="right">{row?.totalScore}</TableCell>
              <TableCell align="right">{`${elapsedTime.value} ${elapsedTime.unit}`}</TableCell>
              <TableCell align="right">{row?.totalAttempts}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}
