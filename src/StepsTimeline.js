import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { PROCESSING_STEPS, stepsText } from './constants';
import { CircularProgress } from '@mui/material';

const stepsInOrder = Object.entries(PROCESSING_STEPS).sort((a, b) => a[1] - b[1])

export default function StepsTimeline(props) {
  const { currentStep } = props;

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

          return <TimelineItem key={stepId}>
            <TimelineSeparator>
              <TimelineDot color={isDone ? 'success' : 'warning'} />
              {stepId !== PROCESSING_STEPS.transform && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{displayText} &nbsp;
              {isCurrentStep && <CircularProgress size="1rem" color="inherit" />}
            </TimelineContent>
          </TimelineItem>
        }).filter(Boolean)}
      </Timeline>
    </div>
  );
}