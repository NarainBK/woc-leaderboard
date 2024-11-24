-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "githubURL" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintainer" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "githubURL" TEXT NOT NULL,

    CONSTRAINT "Maintainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintainersForProjects" (
    "maintainerId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "MaintainersForProjects_pkey" PRIMARY KEY ("maintainerId","projectId")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsForProjects" (
    "projectId" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsForProjects_pkey" PRIMARY KEY ("projectId","tagId")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "issueNumber" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT false,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bounty" (
    "id" SERIAL NOT NULL,
    "maintainerGithub" TEXT NOT NULL,
    "issueId" INTEGER NOT NULL,
    "participantGitHub" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" SERIAL NOT NULL,
    "issueId" INTEGER NOT NULL,
    "participantGitHub" TEXT NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_rollNumber_key" ON "Participant"("rollNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_mobileNumber_key" ON "Participant"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_githubURL_key" ON "Participant"("githubURL");

-- CreateIndex
CREATE UNIQUE INDEX "Maintainer_githubURL_key" ON "Maintainer"("githubURL");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_issueNumber_projectId_key" ON "Issue"("issueNumber", "projectId");

-- AddForeignKey
ALTER TABLE "MaintainersForProjects" ADD CONSTRAINT "MaintainersForProjects_maintainerId_fkey" FOREIGN KEY ("maintainerId") REFERENCES "Maintainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintainersForProjects" ADD CONSTRAINT "MaintainersForProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsForProjects" ADD CONSTRAINT "TagsForProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsForProjects" ADD CONSTRAINT "TagsForProjects_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_maintainerGithub_fkey" FOREIGN KEY ("maintainerGithub") REFERENCES "Maintainer"("githubURL") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_participantGitHub_fkey" FOREIGN KEY ("participantGitHub") REFERENCES "Participant"("githubURL") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_participantGitHub_fkey" FOREIGN KEY ("participantGitHub") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
