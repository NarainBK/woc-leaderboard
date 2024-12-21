-- CreateEnum
CREATE TYPE "SolutionStatus" AS ENUM ('Open', 'Closed', 'Merged');

-- CreateTable
CREATE TABLE "Participant" (
    "fullName" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bounty" INTEGER DEFAULT 0,
    "accountActive" BOOLEAN DEFAULT true,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Maintainer" (
    "fullName" TEXT NOT NULL,
    "githubURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MaintainersForProjects" (
    "githubURL" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,

    CONSTRAINT "MaintainersForProjects_pkey" PRIMARY KEY ("githubURL","repoId")
);

-- CreateTable
CREATE TABLE "Project" (
    "repoId" TEXT NOT NULL,
    "webhook" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("repoId")
);

-- CreateTable
CREATE TABLE "Issue" (
    "issueId" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "claimedBy" TEXT NOT NULL,
    "issueStatus" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("issueId")
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "status" "SolutionStatus" NOT NULL DEFAULT 'Open',

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountyLog" (
    "id" SERIAL NOT NULL,
    "givenBy" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "givenTo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BountyLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_rollNumber_key" ON "Participant"("rollNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_mobileNumber_key" ON "Participant"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Maintainer_githubURL_key" ON "Maintainer"("githubURL");

-- CreateIndex
CREATE UNIQUE INDEX "Project_webhook_key" ON "Project"("webhook");

-- AddForeignKey
ALTER TABLE "MaintainersForProjects" ADD CONSTRAINT "MaintainersForProjects_githubURL_fkey" FOREIGN KEY ("githubURL") REFERENCES "Maintainer"("githubURL") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintainersForProjects" ADD CONSTRAINT "MaintainersForProjects_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Project"("repoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Project"("repoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_username_fkey" FOREIGN KEY ("username") REFERENCES "Participant"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Project"("repoId") ON DELETE RESTRICT ON UPDATE CASCADE;
