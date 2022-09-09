import { useEffect } from "react";
import { PROCESSING_STEPS } from "./constants";
const axios = require('axios').default;

const ResultSection = (props) => {
  const { fileName, hasFinishedUpload, setCurrentStage } = props;

  const analyzeText = (textFileName) => {
    console.log({ textFileName });
    setCurrentStage(PROCESSING_STEPS.transform);
    axios.post('https://s38e2rufuc.execute-api.ap-south-1.amazonaws.com/Test/send-text-to-model', {
      fileName: textFileName,
    })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const PDFToText = () => {
    setCurrentStage(PROCESSING_STEPS.convertToText);
    axios.post('https://s38e2rufuc.execute-api.ap-south-1.amazonaws.com/Test/data-preprocessing', {
      fileName,
    })
      .then(function (response) {
        // handle success
        console.log(response.data);
        analyzeText(response.data.textFileName);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    console.log(props);
    if (!hasFinishedUpload || !fileName) {
      return;
    }

    PDFToText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFinishedUpload, fileName]);

  return <div>

  </div>;
};

export default ResultSection;