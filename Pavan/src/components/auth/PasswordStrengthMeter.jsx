
import { cn } from '@/lib/utils';

const PasswordStrengthMeter = ({ password, className }) => {
  const getStrength = (password) => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    
    strength = checks.filter(Boolean).length;
    return strength;
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Fair';
      case 4:
        return 'Good';
      case 5:
        return 'Strong';
      default:
        return 'Very Weak';
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-blue-500';
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const strength = getStrength(password);
  const strengthText = getStrengthText(strength);
  const strengthColor = getStrengthColor(strength);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-600">Password strength</span>
        <span className={cn('text-xs font-medium', {
          'text-red-600': strength <= 1,
          'text-orange-600': strength === 2,
          'text-yellow-600': strength === 3,
          'text-blue-600': strength === 4,
          'text-green-600': strength === 5,
        })}>
          {strengthText}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              'h-1 w-full rounded-full transition-colors duration-300',
              level <= strength ? strengthColor : 'bg-gray-200'
            )}
          />
        ))}
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex items-center gap-2">
          <div className={cn('w-1 h-1 rounded-full', password.length >= 8 ? 'bg-green-500' : 'bg-gray-300')} />
          <span>At least 8 characters</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn('w-1 h-1 rounded-full', /[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300')} />
          <span>One uppercase letter</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn('w-1 h-1 rounded-full', /[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300')} />
          <span>One lowercase letter</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn('w-1 h-1 rounded-full', /[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300')} />
          <span>One number</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn('w-1 h-1 rounded-full', /[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300')} />
          <span>One special character</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
