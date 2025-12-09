import { useEffect, useState } from 'react';
import Installer from '@/components/Installer';
import HomePage from '@/components/HomePage';

const Index = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const installed = localStorage.getItem('valerius_installed');
    if (installed === 'true') {
      setIsInstalled(true);
    }
    setLoading(false);
  }, []);

  const handleInstallComplete = () => {
    localStorage.setItem('valerius_installed', 'true');
    setIsInstalled(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isInstalled) {
    return <Installer onComplete={handleInstallComplete} />;
  }

  return <HomePage />;
};

export default Index;
