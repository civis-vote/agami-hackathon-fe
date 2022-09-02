import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
const axios = require('axios').default;

export default function FileUpload() {

  const [fileName, setFileName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [bucketFileName, setBucketFileName] = React.useState('');

  const onFileChange = (event) => {
    const pdfFile = event?.target?.files?.[0];

    if (!pdfFile) {
      console.error('Invalid file');
      return;
    }

    console.log(pdfFile);

    setFileName(pdfFile.name);
    requestUploadUrl(pdfFile);
  };

  const uploadFile = (pdfFile, uploadUrl) => {
    const options = {
      headers: {
        'Content-Type': pdfFile.type
      }
    };

    console.log({ uploadUrl, pdfFile, options });
    axios.put(uploadUrl, pdfFile, options).finally(() => {
      setIsLoading(false);
    });
  }

  const requestUploadUrl = (pdfFile) => {
    setIsLoading(true);
    axios.get('https://7o2zbtjo2c.execute-api.ap-south-1.amazonaws.com/uploads')
      .then(function (response) {
        // handle success
        const { Key: uploadedFileName, uploadURL } = response.data;
        setBucketFileName(uploadedFileName);
        console.log(response);
        uploadFile(pdfFile, uploadURL);
      })
      .catch(function (error) {
        // handle error
        setIsLoading(false);
        console.log(error);
      });
  }

  return (
    <div>
      {fileName && <div>{isLoading && 'Uploading:'} {fileName} {bucketFileName && ` -> ${bucketFileName}`}</div>}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="contained" component="label" disabled={isLoading}>
          Upload
          <input hidden accept="application/pdf" type="file" onChange={onFileChange} />
        </Button>
        {isLoading && <CircularProgress disableShrink />}
      </Stack></div>
  );
}
