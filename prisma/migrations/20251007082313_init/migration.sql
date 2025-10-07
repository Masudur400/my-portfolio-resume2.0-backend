/*
  Warnings:

  - You are about to drop the column `technologies` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "technologies",
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "liveUrl" DROP NOT NULL,
ALTER COLUMN "frontendRepoUrl" DROP NOT NULL,
ALTER COLUMN "backendRepoUrl" DROP NOT NULL,
ALTER COLUMN "features" SET DEFAULT ARRAY[]::TEXT[];
