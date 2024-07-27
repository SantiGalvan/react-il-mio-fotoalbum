-- AlterTable
ALTER TABLE `message` ADD COLUMN `photoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_photoId_fkey` FOREIGN KEY (`photoId`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
