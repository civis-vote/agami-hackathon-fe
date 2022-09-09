import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { PROCESSING_STEPS } from './constants';
const axios = require('axios').default;

export default function FileUpload(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { setBucketFileName, setHasFinishedUpload, setCurrentStage, currentStage, setHasError } = props;

  const onFileChange = (event) => {
    const pdfFile = event?.target?.files?.[0];

    if (!pdfFile) {
      console.error('Invalid file');
      return;
    }

    console.log(pdfFile);

    requestUploadUrl(pdfFile);
  };

  const uploadFile = (pdfFile, uploadUrl) => {
    const options = {
      headers: {
        'Content-Type': pdfFile.type
      }
    };

    console.log({ uploadUrl, pdfFile, options });
    axios.put(uploadUrl, pdfFile, options).catch(() => {
      setHasError(true);
    }).finally(() => {
      setIsLoading(false);
      setHasFinishedUpload(true);
    });
  }

  const requestUploadUrl = (pdfFile) => {
    setIsLoading(true);
    setHasFinishedUpload(false);
    setCurrentStage(PROCESSING_STEPS.s3Upload)
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
        setHasError(true);
        console.log(error);
      });
  }

  if (currentStage > PROCESSING_STEPS.initial) {
    return <></>;
  }

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Button variant="contained" component="label" disabled={isLoading}>
          Upload PDF
          <input hidden accept="application/pdf" type="file" onChange={onFileChange} />
        </Button>
      </Stack></div>
  );
}
