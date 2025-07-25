import * as React from 'react';

interface EmailTemplateProps {
  url: string;
}

export function SendVerificationEmail({ url }: EmailTemplateProps) {
  return (
    <div>
      <div>Click the link to verify your email: ${url}</div>
    </div>
  );
}
