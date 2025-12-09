import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface InstallerProps {
  onComplete: () => void;
}

const Installer = ({ onComplete }: InstallerProps) => {
  const [step, setStep] = useState(1);
  const [installing, setInstalling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'ValeriUs Online',
    phone: '+7 (999) 123-45-67',
    email: 'val337@mail.ru',
    telegram: '@ValeriUs337',
  });

  const handleInputChange = (field: string, value: string) => {
    setSiteSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleInstall = async () => {
    setInstalling(true);
    setStep(3);

    for (let i = 0; i <= 100; i += 2) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setProgress(i);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setStep(4);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0078D4] via-[#0063B1] to-[#004E8C] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-2xl p-8 md:p-12 bg-white/95 backdrop-blur-xl shadow-2xl relative z-10 animate-scale-in">
        {step === 1 && (
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Icon name="Smartphone" size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Добро пожаловать!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Установка системы управления сервисом разблокировки
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8 text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Безопасность</h3>
                  <p className="text-sm text-muted-foreground">Защищённая админ-панель</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Zap" className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Быстрота</h3>
                  <p className="text-sm text-muted-foreground">Мгновенная установка</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Settings" className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Гибкость</h3>
                  <p className="text-sm text-muted-foreground">Полная настройка</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Database" className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">База данных</h3>
                  <p className="text-sm text-muted-foreground">Готова к работе</p>
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full h-14 text-lg" onClick={() => setStep(2)}>
              Начать установку
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Настройка сайта</h2>
              <p className="text-muted-foreground">
                Укажите основные данные для вашего сервиса
              </p>
            </div>
            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="siteName" className="text-base">
                  Название сайта
                </Label>
                <Input
                  id="siteName"
                  value={siteSettings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="h-12 text-lg mt-2"
                  placeholder="ValeriUs Online"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-base">
                  Телефон
                </Label>
                <Input
                  id="phone"
                  value={siteSettings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="h-12 text-lg mt-2"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 text-lg mt-2"
                  placeholder="info@example.com"
                />
              </div>
              <div>
                <Label htmlFor="telegram" className="text-base">
                  Telegram
                </Label>
                <Input
                  id="telegram"
                  value={siteSettings.telegram}
                  onChange={(e) => handleInputChange('telegram', e.target.value)}
                  className="h-12 text-lg mt-2"
                  placeholder="@username"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                Назад
              </Button>
              <Button size="lg" className="flex-1" onClick={handleInstall}>
                Установить
                <Icon name="Download" className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Icon name="Loader" size={40} className="text-white animate-spin" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Установка системы...</h2>
            <p className="text-muted-foreground mb-8">
              {progress < 30 && 'Подготовка базы данных...'}
              {progress >= 30 && progress < 60 && 'Настройка модулей...'}
              {progress >= 60 && progress < 90 && 'Применение конфигурации...'}
              {progress >= 90 && 'Завершение установки...'}
            </p>
            <Progress value={progress} className="h-3 mb-4" />
            <p className="text-sm text-muted-foreground">{progress}%</p>
          </div>
        )}

        {step === 4 && (
          <div className="text-center animate-scale-in">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Установка завершена!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Система готова к работе. Сейчас вы будете перенаправлены...
            </p>
            <div className="bg-muted/50 p-6 rounded-xl">
              <p className="text-sm font-medium mb-2">Данные для входа в админку:</p>
              <p className="text-muted-foreground">
                Логин: <span className="font-mono font-bold">admin</span>
              </p>
              <p className="text-muted-foreground">
                Пароль: <span className="font-mono font-bold">admin</span>
              </p>
            </div>
          </div>
        )}
      </Card>

      <div className="absolute bottom-4 left-4 text-white/60 text-sm">
        ValeriUs Unlock Service v1.0
      </div>
    </div>
  );
};

export default Installer;
