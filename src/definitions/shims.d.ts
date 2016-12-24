import * as AWS_SDK from 'aws-sdk';

declare global {
  const AWS: typeof AWS_SDK;
}