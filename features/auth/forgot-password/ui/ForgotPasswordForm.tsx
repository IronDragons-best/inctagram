'use client';

import { RECAPTCHA_SITE_KEY } from '@/shared/config/recaptcha';
import { Button, ReCaptcha } from '@irondragons/ui-lib-inctagram';
import { useState } from 'react';

export const ForgotPasswordForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isCaptchaPassed, setIsCaptchaPassed] = useState(false);  
  const handleCaptcha = (token: string) => {
    setCaptchaToken(token);
    setIsCaptchaPassed(true);
  };
  
  const handleSubmit = async () => {
    if (!captchaToken) {
      alert('Подтвердите капчу');
      return;
    }
    
    console.log({ captchaToken });
  };
  
  return (
    <>
      <ReCaptcha siteKey={RECAPTCHA_SITE_KEY} setCaptchaToken={handleCaptcha}
                 isCaptchaPassed={isCaptchaPassed}></ReCaptcha>
      <Button onClick={handleSubmit}>Отправить ссылку</Button>
    </>
  );
};