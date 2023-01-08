CREATE TABLE IF NOT EXISTS videos (
    video_id VARCHAR(255) PRIMARY KEY,
    published_at TIMESTAMP WITH TIME ZONE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail_url VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS title_idx ON videos (title);
CREATE INDEX IF NOT EXISTS description_idx ON videos (description);