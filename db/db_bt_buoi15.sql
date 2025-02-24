DROP TABLE IF EXISTS images;
CREATE TABLE images (
  image_id CHAR(36) NOT NULL DEFAULT (UUID()),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) DEFAULT NULL,
  alt VARCHAR(255) DEFAULT NULL,
  description TEXT,
  created_at DATETIME DEFAULT NULL,
  updated_at DATETIME DEFAULT NULL,
  public_id VARCHAR(255) NOT NULL,
  user_id CHAR(36) NOT NULL,
  PRIMARY KEY (image_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id CHAR(36) NOT NULL DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL,
  pass_word VARCHAR(255) DEFAULT NULL,
  full_name VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
  comment_id CHAR(36) NOT NULL DEFAULT (UUID()),
  content TEXT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id CHAR(36) NOT NULL,
  image_id CHAR(36) NOT NULL,
  PRIMARY KEY (comment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS saves;
CREATE TABLE saves (
  save_id CHAR(36) NOT NULL DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  image_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (save_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
