/*
  Warnings:

  - You are about to drop the column `status` on the `Solution` table. All the data in the column will be lost.
  - Added the required column `url` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "status",
ADD COLUMN     "url" TEXT NOT NULL;

-- DropEnum
DROP TYPE "SolutionStatus";
