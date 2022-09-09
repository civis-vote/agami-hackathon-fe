import { useEffect } from "react";
import { PROCESSING_STEPS } from "./constants";
const axios = require('axios').default;

const ResultSection = (props) => {
  const { fileName, resultText, currentStage, setResultText, hasFinishedUpload, setCurrentStage, setHasError } = props;

  const analyzeText = (textFileName) => {
    console.log({ textFileName });
    setCurrentStage(PROCESSING_STEPS.transform);
    axios.post('https://s38e2rufuc.execute-api.ap-south-1.amazonaws.com/Test/send-text-to-model', {
      fileName: textFileName,
    })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setResultText(response.data);
        setCurrentStage(PROCESSING_STEPS.done);
      })
      .catch(function (error) {
        // handle error
        setHasError(true)
        console.log(error);
      })
  }

  const PDFToText = () => {
    setCurrentStage(PROCESSING_STEPS.convertToText);
    axios.post('https://e4scfhqzh5dd7fswiywrhawz5e0ebxdh.lambda-url.ap-south-1.on.aws/', {
      fileName,
    })
      .then(function (response) {
        // handle success
        console.log(response.data);
        analyzeText(response.data.textFileName);
      })
      .catch(function (error) {
        // handle error
        setHasError(true)
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

  return <>{
    currentStage === PROCESSING_STEPS.done &&
    resultText &&
    <div>
      <h1>Output</h1>
      <div className="result-section">
        {resultText}
      </div>
    </div>
  }</>;
};

export default ResultSection;