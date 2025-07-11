import React, { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { useSettingsStore } from '../stores/settings';

const LoginPage: React.FC = () => {
  const { setAuthenticated } = useSettingsStore();
  const handleLogin = () => {
    window.electron.login();
  };

  useEffect(() => {
    const removeLoginUrlListener = window.electron.onLoginUrl((url) => {
      window.electron.openExternal(url);
    });

    const removeLoginSuccessListener = window.electron.onLoginSuccess(() => {
      setAuthenticated(true);
    });

    return () => {
      removeLoginUrlListener();
      removeLoginSuccessListener();
    };
  }, [setAuthenticated]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Button onClick={handleLogin}>Login with Google</Button>
    </div>
  );
};

export default LoginPage;
