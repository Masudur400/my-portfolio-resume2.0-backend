/*
  Warnings:

  - You are about to drop the column `slug` on the `Project` table. All the data in the column will be lost.
  - Added the required column `technologies` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `thumbnail` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `liveUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frontendRepoUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backendRepoUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Project_slug_key";

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "slug",
ADD COLUMN     "technologies" TEXT NOT NULL,
ALTER COLUMN "features" SET NOT NULL,
ALTER COLUMN "features" DROP DEFAULT,
ALTER COLUMN "features" SET DATA TYPE TEXT,
ALTER COLUMN "thumbnail" SET NOT NULL,
ALTER COLUMN "liveUrl" SET NOT NULL,
ALTER COLUMN "frontendRepoUrl" SET NOT NULL,
ALTER COLUMN "backendRepoUrl" SET NOT NULL;
