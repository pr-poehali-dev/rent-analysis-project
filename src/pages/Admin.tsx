import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const API_SERVICES = 'https://functions.poehali.dev/d7cbb1b1-5a1d-427f-a20f-d84af8a8ede9';
const API_ORDERS = 'https://functions.poehali.dev/adc8619a-328d-4b31-88bb-b59be3455420';
const API_REVIEWS = 'https://functions.poehali.dev/018fbcbd-1f21-467b-bc14-b163e8eccf97';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  is_active: boolean;
}

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  phone_model: string;
  status: string;
  created_at: string;
}

interface Video {
  id: number;
  title: string;
  phone_model: string;
  video_url: string;
  thumbnail_url: string;
  views: number;
}

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  phone_model: string;
  is_published: boolean;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ unlocks: 1000, clients: 500, successRate: 99.5 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      toast.success('Добро пожаловать в админ-панель!');
      loadData();
    } else {
      toast.error('Неверный логин или пароль');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [servicesRes, ordersRes, reviewsRes] = await Promise.all([
        fetch(API_SERVICES + '?all=true'),
        fetch(API_ORDERS),
        fetch(API_REVIEWS + '?all=true')
      ]);
      
      const [servicesData, ordersData, reviewsData] = await Promise.all([
        servicesRes.json(),
        ordersRes.json(),
        reviewsRes.json()
      ]);
      
      setServices(servicesData.services || []);
      setOrders(ordersData.orders || []);
      setReviews(reviewsData.reviews || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStats = () => {
    toast.success('Статистика обновлена');
  };

  const handleDeleteOrder = async (id: number) => {
    try {
      await fetch(API_ORDERS + `?id=${id}`, { method: 'DELETE' });
      setOrders(orders.filter((o) => o.id !== id));
      toast.success('Заказ удалён');
    } catch (error) {
      toast.error('Ошибка удаления заказа');
    }
  };

  const handleChangeOrderStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(API_ORDERS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
      toast.success('Статус изменён');
    } catch (error) {
      toast.error('Ошибка изменения статуса');
    }
  };

  const handlePublishReview = async (id: number, isPublished: boolean) => {
    try {
      await fetch(API_REVIEWS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: isPublished })
      });
      setReviews(reviews.map((r) => (r.id === id ? { ...r, is_published: isPublished } : r)));
      toast.success(isPublished ? 'Отзыв опубликован' : 'Отзыв скрыт');
      loadData();
    } catch (error) {
      toast.error('Ошибка модерации отзыва');
    }
  };

  const handleDeleteReview = async (id: number) => {
    try {
      await fetch(API_REVIEWS + `?id=${id}`, { method: 'DELETE' });
      setReviews(reviews.filter((r) => r.id !== id));
      toast.success('Отзыв удалён');
    } catch (error) {
      toast.error('Ошибка удаления отзыва');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Icon name="Lock" size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Админ-панель</h1>
            <p className="text-muted-foreground">Введите данные для входа</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 mt-2"
                placeholder="admin"
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 mt-2"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" size="lg" className="w-full h-12">
              <Icon name="LogIn" className="mr-2" size={20} />
              Войти
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Button variant="ghost" onClick={() => navigate('/')}>
              ← Вернуться на главную
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                <Icon name="Shield" className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Админ-панель</h1>
                <p className="text-xs text-muted-foreground">ValeriUs Online</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <Icon name="Home" className="mr-2" size={18} />
                На сайт
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAuthenticated(false);
                  toast.success('Вы вышли из системы');
                }}
              >
                <Icon name="LogOut" className="mr-2" size={18} />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Разблокировок</p>
                  <p className="text-3xl font-bold text-primary">{stats.unlocks}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="Smartphone" className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Клиентов</p>
                  <p className="text-3xl font-bold text-primary">{stats.clients}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Успешность</p>
                  <p className="text-3xl font-bold text-primary">{stats.successRate}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="TrendingUp" className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Новых заказов</p>
                  <p className="text-3xl font-bold text-primary">
                    {orders.filter((o) => o.status === 'new').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="ShoppingCart" className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-white p-1">
            <TabsTrigger value="orders" className="gap-2">
              <Icon name="ShoppingCart" size={18} />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Icon name="Settings" size={18} />
              Услуги
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Icon name="Video" size={18} />
              Видео
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <Icon name="MessageSquare" size={18} />
              Отзывы
              {reviews.filter((r) => !r.is_published).length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {reviews.filter((r) => !r.is_published).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Sliders" size={18} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Управление заказами</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Модель</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{order.customer_name}</TableCell>
                        <TableCell>{order.customer_phone}</TableCell>
                        <TableCell>{order.phone_model}</TableCell>
                        <TableCell>
                          {order.status === 'new' && (
                            <Badge variant="default">Новый</Badge>
                          )}
                          {order.status === 'in_progress' && (
                            <Badge className="bg-yellow-500">В работе</Badge>
                          )}
                          {order.status === 'completed' && (
                            <Badge className="bg-green-500">Завершён</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString('ru-RU')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {order.status === 'new' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangeOrderStatus(order.id, 'in_progress')}
                              >
                                В работу
                              </Button>
                            )}
                            {order.status === 'in_progress' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangeOrderStatus(order.id, 'completed')}
                              >
                                Завершить
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление услугами</CardTitle>
                  <Button>
                    <Icon name="Plus" className="mr-2" size={18} />
                    Добавить услугу
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <Card key={service.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Icon name={service.icon as any} className="text-primary" size={24} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{service.title}</h4>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{service.price} ₽</p>
                            <Badge variant={service.is_active ? 'default' : 'secondary'}>
                              {service.is_active ? 'Активна' : 'Неактивна'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Портфолио видео</CardTitle>
                  <Button>
                    <Icon name="Plus" className="mr-2" size={18} />
                    Добавить видео
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2">
                          {video.views} просмотров
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-1">{video.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{video.phone_model}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Icon name="Edit" className="mr-2" size={14} />
                            Редактировать
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Модерация отзывов</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Оценка</TableHead>
                      <TableHead>Отзыв</TableHead>
                      <TableHead>Модель</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.customer_name}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={14}
                                className={
                                  i < review.rating
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                        <TableCell>{review.phone_model}</TableCell>
                        <TableCell>
                          {review.is_published ? (
                            <Badge className="bg-green-500">Опубликован</Badge>
                          ) : (
                            <Badge variant="secondary">На модерации</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {!review.is_published && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePublishReview(review.id, true)}
                              >
                                <Icon name="Check" size={16} className="mr-1" />
                                Опубликовать
                              </Button>
                            )}
                            {review.is_published && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePublishReview(review.id, false)}
                              >
                                <Icon name="X" size={16} className="mr-1" />
                                Скрыть
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика сайта</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Количество разблокировок</Label>
                    <Input
                      type="number"
                      value={stats.unlocks}
                      onChange={(e) =>
                        setStats({ ...stats, unlocks: parseInt(e.target.value) })
                      }
                      className="h-12 mt-2"
                    />
                  </div>
                  <div>
                    <Label>Количество клиентов</Label>
                    <Input
                      type="number"
                      value={stats.clients}
                      onChange={(e) =>
                        setStats({ ...stats, clients: parseInt(e.target.value) })
                      }
                      className="h-12 mt-2"
                    />
                  </div>
                  <div>
                    <Label>Процент успеха</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={stats.successRate}
                      onChange={(e) =>
                        setStats({ ...stats, successRate: parseFloat(e.target.value) })
                      }
                      className="h-12 mt-2"
                    />
                  </div>
                  <Button onClick={handleUpdateStats} className="w-full h-12">
                    <Icon name="Save" className="mr-2" size={18} />
                    Сохранить статистику
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Телефон</Label>
                    <Input defaultValue="+7 (999) 123-45-67" className="h-12 mt-2" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue="val337@mail.ru" className="h-12 mt-2" />
                  </div>
                  <div>
                    <Label>Telegram</Label>
                    <Input defaultValue="@ValeriUs337" className="h-12 mt-2" />
                  </div>
                  <div>
                    <Label>Адрес</Label>
                    <Textarea
                      defaultValue="г. Пушкино, ул. Вокзальная 1, корп. 2"
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                  <Button className="w-full h-12">
                    <Icon name="Save" className="mr-2" size={18} />
                    Сохранить контакты
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;