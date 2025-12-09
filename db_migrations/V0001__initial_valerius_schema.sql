-- ValeriUs Unlock Service Database Schema

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    icon VARCHAR(50),
    category VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio videos table
CREATE TABLE IF NOT EXISTS portfolio_videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    video_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    phone_model VARCHAR(100),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100),
    service_id INTEGER REFERENCES services(id),
    phone_model VARCHAR(100),
    imei VARCHAR(50),
    message TEXT,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Statistics table
CREATE TABLE IF NOT EXISTS statistics (
    id SERIAL PRIMARY KEY,
    unlocks_count INTEGER DEFAULT 1000,
    clients_count INTEGER DEFAULT 500,
    success_rate DECIMAL(5, 2) DEFAULT 99.5,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin - hashed with simple method for demo)
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', 'admin', 'admin') 
ON CONFLICT (username) DO NOTHING;

-- Insert default services
INSERT INTO services (title, description, price, icon, category) VALUES
('Разблокировка Mi Account', 'Удаление аккаунта Xiaomi с телефона любой модели', 1500.00, 'Smartphone', 'unlock'),
('Разблокировка Google Account (FRP)', 'Bypass Factory Reset Protection на Android устройствах', 1200.00, 'Shield', 'unlock'),
('Активация ПО', 'Активация и настройка программного обеспечения для работы', 800.00, 'Settings', 'software'),
('Пополнение кредитов', 'Быстрое пополнение кредитов для программ разблокировки', 500.00, 'CreditCard', 'credits'),
('Удалённая разблокировка', 'Разблокировка телефона удалённо через TeamViewer', 2000.00, 'Wifi', 'remote'),
('Прошивка телефона', 'Установка официальной или кастомной прошивки', 1000.00, 'Download', 'firmware')
ON CONFLICT DO NOTHING;

-- Insert default portfolio videos
INSERT INTO portfolio_videos (title, video_url, thumbnail_url, phone_model) VALUES
('Разблокировка TECNO SPARK GO 2 Android 15', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 'TECNO SPARK GO 2'),
('FRP Bypass INFINIX NOTE 40', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', 'INFINIX NOTE 40'),
('Honor Magic V2 Mi Account Unlock', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400', 'Honor Magic V2'),
('Realme 9 Pro Google Account', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400', 'Realme 9 Pro'),
('TECNO CAMON 40 Разблокировка', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400', 'TECNO CAMON 40'),
('Vivo Y71A/Y71 FRP Helper', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/phone-1512054502232-13ded4b1f2a0?w=400', 'Vivo Y71A')
ON CONFLICT DO NOTHING;

-- Insert site settings
INSERT INTO site_settings (key, value) VALUES
('site_name', 'ValeriUs Online'),
('phone', '+7 (999) 123-45-67'),
('email', 'val337@mail.ru'),
('telegram', '@ValeriUs337'),
('telegram_channel', '@ValeriUs_A'),
('vk', 'vk.com/valerius337'),
('youtube', '@ValeriUs_V'),
('address', 'г. Пушкино, ул. Вокзальная 1, корп. 2'),
('work_hours', 'Ежедневно с 9:00 до 20:00'),
('hero_title', 'Профессиональная разблокировка смартфонов'),
('hero_subtitle', 'Mi Account • Google FRP • Активация ПО • Удалённая помощь'),
('is_installed', 'false')
ON CONFLICT (key) DO NOTHING;

-- Insert statistics
INSERT INTO statistics (unlocks_count, clients_count, success_rate) 
VALUES (1000, 500, 99.5)
ON CONFLICT DO NOTHING;