/*
  Warnings:

  - You are about to drop the `Maintainer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaintainersForProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaintainersForProjects" DROP CONSTRAINT "MaintainersForProjects_githubURL_fkey";

-- DropForeignKey
ALTER TABLE "MaintainersForProjects" DROP CONSTRAINT "MaintainersForProjects_repoId_fkey";

-- DropTable
DROP TABLE "Maintainer";

-- DropTable
DROP TABLE "MaintainersForProjects";
