import { Button } from '@repo/ui';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface Props {
  to?: string;
  onClick?: () => void;
}

export function BackButton({ to, onClick }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button variant="ghost" size="touch" onClick={handleClick} className="gap-2 text-muted-foreground">
      <ArrowLeft className="size-6" />
      <span>{t('common.back')}</span>
    </Button>
  );
}
