import * as React from 'react';

interface EmailTemplateProps {
  url: string;
}

export function SendVerificationEmail({ url }: EmailTemplateProps) {
  return (
    <div>
      <h1>Click the link to verify your email: ${url}</h1>
    </div>
  );
}
