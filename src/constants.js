export const PROCESSING_STEPS = {
  initial: 0,
  s3Upload: 1,
  convertToText: 2,
  transform: 3,
  done: 4
}

export const stepsText = {
  [PROCESSING_STEPS.s3Upload]: 'Upload PDF',
  [PROCESSING_STEPS.convertToText]: 'Processing PDF',
  [PROCESSING_STEPS.transform]: 'Summarize text'
}
