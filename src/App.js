import './App.css';
import FileUpload from './FileUpload';
import Navbar from './Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResultSection from './ResultSection';
import { useState } from 'react';
import { PROCESSING_STEPS } from './constants';
import StepsTimeline from './StepsTimeline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F0653A',
    },
  },
});

function App() {
  const [fileName, setFileName] = useState('');
  const [hasFinishedUpload, setHasFinishedUpload] = useState(false);
  const [currentStage, setCurrentStage] = useState(PROCESSING_STEPS.initial);
  console.log('hasFinishedUpload', hasFinishedUpload)

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        {currentStage >= PROCESSING_STEPS.s3Upload && currentStage < PROCESSING_STEPS.done &&
          <StepsTimeline currentStep={currentStage} />
        }
        {(currentStage <= PROCESSING_STEPS.s3Upload || currentStage === PROCESSING_STEPS.done) &&
          <FileUpload currentStage={currentStage} bucketFileName={fileName} setBucketFileName={setFileName} setHasFinishedUpload={setHasFinishedUpload} setCurrentStage={setCurrentStage} />
        }
        <ResultSection fileName={fileName} hasFinishedUpload={hasFinishedUpload} setCurrentStage={setCurrentStage} />
      </div>
    </ThemeProvider>
  );
}

export default App;
