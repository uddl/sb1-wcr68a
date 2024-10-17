import React, { useEffect } from 'react';

const KeyboardShortcuts: React.FC = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'u':
          // Implement upload PDF shortcut
          console.log('Upload PDF shortcut triggered');
          break;
        case 'd':
          // Implement navigate to dashboard shortcut
          console.log('Navigate to dashboard shortcut triggered');
          break;
        case 'l':
          // Implement logout shortcut
          console.log('Logout shortcut triggered');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};

export default KeyboardShortcuts;
