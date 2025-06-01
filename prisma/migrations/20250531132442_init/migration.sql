-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `recipient` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `payload` JSON NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
