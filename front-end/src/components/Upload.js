import React from 'react'
import { Box } from '@mui/system'
import Imageww from '../img/upload_icon.svg'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";
import axios from "axios";

const chunkSize = 10 * 1024;

function Upload(props) {

  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(null);

  function handleDrop(e) {
    e.preventDefault();
    setFiles([...files, ...e.dataTransfer.files]);
  }

  function readAndUploadCurrentChunk() {
    const reader = new FileReader();
    const file = files[currentFileIndex];
    if (!file) {
      return;
    }
    const from = currentChunkIndex * chunkSize;
    const to = from + chunkSize;
    const blob = file.slice(from, to);
    reader.onload = e => uploadChunk(e);
    reader.readAsDataURL(blob);
  }

  function uploadChunk(readerEvent) {
    const file = files[currentFileIndex];
    const data = readerEvent.target.result;
    const params = new URLSearchParams();
    params.set('name', file.name);
    params.set('size', file.size);
    params.set('currentChunkIndex', currentChunkIndex);
    params.set('totalChunks', Math.ceil(file.size / chunkSize));
    const headers = { 'Content-Type': 'application/octet-stream' };
    const url = 'http://localhost:5050/upload?' + params.toString();
    axios.post(url, data, { headers })
      .then(response => {
        const file = files[currentFileIndex];
        const filesize = files[currentFileIndex].size;
        const chunks = Math.ceil(filesize / chunkSize) - 1;
        const isLastChunk = currentChunkIndex === chunks;
        if (isLastChunk) {
          file.finalFilename = response.data.finalFilename;
          setLastUploadedFileIndex(currentFileIndex);
          setCurrentChunkIndex(null);
          var courses = response.data.trim().split(',')
          console.log(courses)
          props.handleCallBack(courses)
        } else {
          setCurrentChunkIndex(currentChunkIndex + 1);
        }
      });
  }

  useEffect(() => {
    if (lastUploadedFileIndex === null) {
      return;
    }
    const isLastFile = lastUploadedFileIndex === files.length - 1;
    const nextFileIndex = isLastFile ? null : currentFileIndex + 1;
    setCurrentFileIndex(nextFileIndex);
  }, [lastUploadedFileIndex]);

  useEffect(() => {
    if (files.length > 0) {
      if (currentFileIndex === null) {
        setCurrentFileIndex(
          lastUploadedFileIndex === null ? 0 : lastUploadedFileIndex + 1
        );
      }
    }
  }, [files.length]);

  useEffect(() => {
    if (currentFileIndex !== null) {
      setCurrentChunkIndex(0);
    }
  }, [currentFileIndex]);

  useEffect(() => {
    if (currentChunkIndex !== null) {
      readAndUploadCurrentChunk();
    }
  }, [currentChunkIndex]);


  return (
    <div
      onDragOver={e => { setDropzoneActive(true); e.preventDefault(); }}
      onDragLeave={e => { setDropzoneActive(false); e.preventDefault(); }}
      onDrop={e => handleDrop(e)}
      className={"dropzone" + (dropzoneActive ? " active" : "")}>
        <Box
          sx={{
            height: '25rem',
            borderStyle: 'dashed',
            borderRadius: 5,
            borderWidth: 4,
            transition: '.4s',
            '&:hover': {
              backgroundColor: 'secondary.main',
              opacity: [.3, .3, .7],
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box paddingTop={10}
                component="img"
                sx={{
                  height: 233,
                }}
                alt="Upload here"
                src={Imageww}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5Thin'>UPLOAD DEGREE WORKS HTML</Typography>
            </Grid>
          </Grid>

        </Box>
    </div>


  )
}

export default Upload