import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Category = 'all' | 'apartments' | 'equipment' | 'tools';

interface RentalItem {
  id: number;
  title: string;
  category: Category;
  price: number;
  period: string;
  rating: number;
  reviews: number;
  image: string;
  location?: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'apartments', label: 'Жильё', icon: 'Home' },
    { id: 'equipment', label: 'Оборудование', icon: 'Wrench' },
    { id: 'tools', label: 'Инструменты', icon: 'Hammer' },
  ];

  const rentalItems: RentalItem[] = [
    {
      id: 1,
      title: 'Квартира в центре города',
      category: 'apartments',
      price: 3500,
      period: 'месяц',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      location: 'Москва, Центр',
    },
    {
      id: 2,
      title: 'Перфоратор Bosch Professional',
      category: 'tools',
      price: 800,
      period: 'день',
      rating: 4.9,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
    },
    {
      id: 3,
      title: 'Строительные леса 10м',
      category: 'equipment',
      price: 2500,
      period: 'неделя',
      rating: 4.7,
      reviews: 53,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
    },
    {
      id: 4,
      title: 'Студия с панорамными окнами',
      category: 'apartments',
      price: 2800,
      period: 'месяц',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      location: 'Санкт-Петербург',
    },
    {
      id: 5,
      title: 'Бетономешалка 180л',
      category: 'equipment',
      price: 1200,
      period: 'день',
      rating: 4.6,
      reviews: 41,
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
    },
    {
      id: 6,
      title: 'Набор электроинструментов',
      category: 'tools',
      price: 1500,
      period: 'неделя',
      rating: 4.8,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800',
    },
  ];

  const filteredItems = rentalItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/20">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Package" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-secondary">RentHub</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Каталог
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Как работает
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={20} />
              </Button>
              <Button>Войти</Button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              🚀 Аренда без границ
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-secondary">
              Арендуйте всё,
              <br />
              что вам нужно
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Квартиры, оборудование, инструменты — всё в одном месте. Быстро, удобно, безопасно.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Icon
                  name="Search"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <Input
                  placeholder="Что вы ищете?"
                  className="pl-12 h-14 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-14 px-8 text-lg">
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                className="flex items-center gap-2 min-w-fit"
                onClick={() => setSelectedCategory(cat.id as Category)}
              >
                <Icon name={cat.icon as any} size={18} />
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer animate-scale-in border-2 hover:border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                    >
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                  <Badge className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-secondary">
                    {item.category === 'apartments' && '🏠 Жильё'}
                    {item.category === 'equipment' && '⚙️ Оборудование'}
                    {item.category === 'tools' && '🔧 Инструменты'}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <Icon name="MapPin" size={14} />
                      {item.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1 mb-4">
                    <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="font-medium">{item.rating}</span>
                    <span className="text-muted-foreground text-sm">({item.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-secondary">{item.price} ₽</span>
                      <span className="text-muted-foreground text-sm">/{item.period}</span>
                    </div>
                    <Button size="sm" className="group-hover:bg-secondary transition-colors">
                      Арендовать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Как это работает?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="animate-fade-in">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Найдите</h3>
                <p className="text-white/80">
                  Выберите нужный товар из каталога или воспользуйтесь поиском
                </p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Забронируйте</h3>
                <p className="text-white/80">Выберите даты и оформите бронирование онлайн</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Получите</h3>
                <p className="text-white/80">Заберите товар в удобное время или закажите доставку</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Package" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-secondary">RentHub</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                О нас
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Помощь
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Условия
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Контакты
              </a>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 RentHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
