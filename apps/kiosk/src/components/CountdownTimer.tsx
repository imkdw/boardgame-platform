import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface Props {
  seconds: number;
  redirectTo: string;
  onComplete?: () => void;
}

export function CountdownTimer({ seconds, redirectTo, onComplete }: Props) {
  const [remaining, setRemaining] = useState(seconds);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (remaining <= 0) {
      onComplete?.();
      navigate(redirectTo);
      return;
    }

    const timer = setTimeout(() => {
      setRemaining(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [remaining, navigate, redirectTo, onComplete]);

  return (
    <p className="text-center text-lg text-muted-foreground">{t('common.autoRedirect', { seconds: remaining })}</p>
  );
}
