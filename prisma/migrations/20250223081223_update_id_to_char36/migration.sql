-- CreateTable
CREATE TABLE `comments` (
    `comment_id` CHAR(36) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_id` CHAR(36) NOT NULL,
    `image_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `image_id` CHAR(36) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `alt` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,
    `public_id` VARCHAR(255) NOT NULL,
    `user_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saves` (
    `save_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `image_id` CHAR(36) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`save_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` CHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `pass_word` VARCHAR(255) NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
