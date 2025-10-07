-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[];
