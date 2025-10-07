/*
  Warnings:

  - The `features` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `technologies` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "features",
ADD COLUMN     "features" TEXT[],
DROP COLUMN "technologies",
ADD COLUMN     "technologies" TEXT[];
