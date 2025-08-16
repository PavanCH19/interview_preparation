
import { Button } from '@/components/ui/button';

const SocialLoginButton = ({ provider, icon, onClick }) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="w-full py-2.5 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
    >
      {typeof icon === 'string' ? (
        <img src={icon} alt={`${provider} logo`} className="w-5 h-5" />
      ) : (
        icon
      )}
      <span className="text-sm font-medium text-gray-700">{provider}</span>
    </Button>
  );
};

export default SocialLoginButton;

