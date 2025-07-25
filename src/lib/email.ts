import { Resend } from 'resend';
import { SendVerificationEmail } from '../../emails/sendVerificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export enum emailType {
  verification,
}

interface sendEmailType {
  email: string;
  url: string;
  type: emailType;
}

export async function sendEmail({ email, url, type }: sendEmailType) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Suzie <me@suziemaster.me>',
      to: email,
      subject:
        type === emailType.verification ? 'Verify your email address' : '',
      react:
        type === emailType.verification ? SendVerificationEmail({ url }) : null,
    });

    if (error) {
      console.log(error);
      throw new Error('Could not send verification email');
    }

    return true;
  } catch (error) {
    return error || 'Internal Server Error';
  }
}
