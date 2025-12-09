import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  icon: string;
  category: string;
}

interface Video {
  id: number;
  title: string;
  thumbnail_url: string;
  phone_model: string;
  video_url: string;
}

const HomePage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    phoneModel: '',
    message: '',
  });

  useEffect(() => {
    loadServices();
    loadVideos();
  }, []);

  const loadServices = async () => {
    const mockServices: Service[] = [
      {
        id: 1,
        title: 'Разблокировка Mi Account',
        description: 'Удаление аккаунта Xiaomi с телефона любой модели',
        price: 1500,
        icon: 'Smartphone',
        category: 'unlock',
      },
      {
        id: 2,
        title: 'Разблокировка Google Account (FRP)',
        description: 'Bypass Factory Reset Protection на Android устройствах',
        price: 1200,
        icon: 'Shield',
        category: 'unlock',
      },
      {
        id: 3,
        title: 'Активация ПО',
        description: 'Активация и настройка программного обеспечения для работы',
        price: 800,
        icon: 'Settings',
        category: 'software',
      },
      {
        id: 4,
        title: 'Пополнение кредитов',
        description: 'Быстрое пополнение кредитов для программ разблокировки',
        price: 500,
        icon: 'CreditCard',
        category: 'credits',
      },
      {
        id: 5,
        title: 'Удалённая разблокировка',
        description: 'Разблокировка телефона удалённо через TeamViewer',
        price: 2000,
        icon: 'Wifi',
        category: 'remote',
      },
      {
        id: 6,
        title: 'Прошивка телефона',
        description: 'Установка официальной или кастомной прошивки',
        price: 1000,
        icon: 'Download',
        category: 'firmware',
      },
    ];
    setServices(mockServices);
  };

  const loadVideos = async () => {
    const mockVideos: Video[] = [
      {
        id: 1,
        title: 'Разблокировка TECNO SPARK GO 2 Android 15',
        thumbnail_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        phone_model: 'TECNO SPARK GO 2',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 2,
        title: 'FRP Bypass INFINIX NOTE 40',
        thumbnail_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
        phone_model: 'INFINIX NOTE 40',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 3,
        title: 'Honor Magic V2 Mi Account Unlock',
        thumbnail_url: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400',
        phone_model: 'Honor Magic V2',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 4,
        title: 'Realme 9 Pro Google Account',
        thumbnail_url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400',
        phone_model: 'Realme 9 Pro',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 5,
        title: 'TECNO CAMON 40 Разблокировка',
        thumbnail_url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
        phone_model: 'TECNO CAMON 40',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 6,
        title: 'Vivo Y71A/Y71 FRP Helper',
        thumbnail_url: 'https://images.unsplash.com/photo-1512054502232-13ded4b1f2a0?w=400',
        phone_model: 'Vivo Y71A',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ];
    setVideos(mockVideos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', email: '', phoneModel: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/20">
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Smartphone" className="text-white" size={26} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  ValeriUs
                </h1>
                <p className="text-xs text-muted-foreground">Online Service</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
                Услуги
              </a>
              <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">
                Портфолио
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Icon name="Phone" size={20} />
              </Button>
              <Button asChild>
                <a href="/admin">Админ</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 text-base px-4 py-2">
              🔓 Профессиональная разблокировка
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Разблокируем любой<br />смартфон
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Mi Account • Google FRP • Активация ПО • Удалённая помощь<br />
              <span className="font-semibold text-primary">1000+ успешных разблокировок</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all">
                <Icon name="MessageCircle" className="mr-2" size={22} />
                Написать в Telegram
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg bg-white/50 backdrop-blur-sm"
              >
                <Icon name="Phone" className="mr-2" size={22} />
                Позвонить
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Разблокировок</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">99.5%</div>
                <div className="text-sm text-muted-foreground">Успеха</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Наши услуги</h3>
            <p className="text-lg text-muted-foreground">
              Полный спектр услуг по разблокировке и настройке
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedService(service.id)}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={service.icon as any} className="text-primary" size={28} />
                  </div>
                  <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">{service.price} ₽</span>
                    <Button size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-white transition-colors">
                      Заказать
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Портфолио работ</h3>
            <p className="text-lg text-muted-foreground">
              Видео-инструкции и примеры наших разблокировок
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <Card
                key={video.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Icon name="Play" className="text-primary ml-1" size={32} />
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-primary text-white">
                    {video.phone_model}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">Оставить заявку</h3>
              <p className="text-lg text-muted-foreground">
                Свяжитесь с нами удобным способом
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Модель телефона"
                      value={formData.phoneModel}
                      onChange={(e) => setFormData({ ...formData, phoneModel: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Опишите проблему"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full h-12">
                    Отправить заявку
                  </Button>
                </form>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon name="MapPin" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Адрес</h4>
                      <p className="text-sm text-muted-foreground">
                        г. Пушкино, ул. Вокзальная 1, корп. 2
                        <br />
                        Внутри магазина "Гастроном 24/7"
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon name="Clock" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Режим работы</h4>
                      <p className="text-sm text-muted-foreground">Ежедневно с 9:00 до 20:00</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon name="Mail" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-sm text-muted-foreground">val337@mail.ru</p>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button className="flex-1" variant="outline" asChild>
                    <a href="https://t.me/ValeriUs337" target="_blank" rel="noopener noreferrer">
                      <Icon name="MessageCircle" className="mr-2" size={18} />
                      Telegram
                    </a>
                  </Button>
                  <Button className="flex-1" variant="outline" asChild>
                    <a href="https://vk.com/valerius337" target="_blank" rel="noopener noreferrer">
                      <Icon name="Users" className="mr-2" size={18} />
                      VK
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Smartphone" className="text-white" size={22} />
                </div>
                <span className="text-xl font-bold">ValeriUs</span>
              </div>
              <p className="text-white/70 text-sm">
                Профессиональная разблокировка смартфонов и активация программного обеспечения
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Разблокировка Mi Account</li>
                <li>Разблокировка Google FRP</li>
                <li>Активация ПО</li>
                <li>Удалённая помощь</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Email: val337@mail.ru</li>
                <li>Telegram: @ValeriUs337</li>
                <li>VK: vk.com/valerius337</li>
                <li>YouTube: @ValeriUs_V</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
            © 2024 ValeriUs Online. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
