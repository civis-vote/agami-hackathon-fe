import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { PROCESSING_STEPS, stepsText } from './constants';
import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import ErrorIcon from '@mui/icons-material/Error';

const stepsInOrder = Object.entries(PROCESSING_STEPS).sort((a, b) => a[1] - b[1])

const StatusIndicator = (props) => {
  const { hasError } = props;

  return <>
    {
      hasError ?
        <ErrorIcon size="1rem" color="error" /> :
        <CircularProgress size="1rem" color="inherit" />

    }
  </>;
}

export default function StepsTimeline(props) {
  const { currentStep, hasError } = props;

  return (
    <div className="timeline-container">
      <Timeline>
        {stepsInOrder.map(([_, stepId]) => {
          const displayText = stepsText[stepId];
          if (!displayText) {
            return null;
          }
          const isCurrentStep = currentStep === stepId;
          const isDone = stepId < currentStep;
          let dotColor = 'success';

          if (!isDone) {
            dotColor = 'warning';
            if (isCurrentStep && hasError) {
              dotColor = 'error';
            }
          }

          return <TimelineItem key={stepId}>
            <TimelineSeparator>
              <TimelineDot color={dotColor} />
              {stepId !== PROCESSING_STEPS.transform && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <span>{displayText}</span>
                {isCurrentStep && <StatusIndicator hasError={hasError} />}
              </Stack>
            </TimelineContent>
          </TimelineItem>
        }).filter(Boolean)}
      </Timeline>
    </div>
  );
}