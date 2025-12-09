-- Add reviews table for customer feedback

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    phone_model VARCHAR(100),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add some sample reviews
INSERT INTO reviews (customer_name, rating, comment, phone_model, is_published) VALUES
('Алексей М.', 5, 'Разблокировали Xiaomi за 20 минут! Очень быстро и профессионально. Рекомендую!', 'Xiaomi Redmi Note 10', true),
('Мария С.', 5, 'Отличный сервис! Помогли с Google FRP на Samsung. Всё объяснили, сделали качественно.', 'Samsung Galaxy A52', true),
('Иван П.', 4, 'Хорошо справились с разблокировкой Mi Account. Единственное - пришлось немного подождать.', 'Xiaomi Poco X3', true),
('Елена К.', 5, 'Спасибо огромное! Думала телефон превратился в кирпич, но ребята спасли ситуацию!', 'Honor Magic V2', true),
('Дмитрий В.', 5, 'Профессионалы своего дела! Удалённо разблокировали телефон за час. Всё чётко!', 'Realme 9 Pro', true)
ON CONFLICT DO NOTHING;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(is_published, created_at DESC);
