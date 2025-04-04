-- CreateTable
CREATE TABLE "Migration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sourceDB" TEXT NOT NULL,
    "targetDB" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Migration_pkey" PRIMARY KEY ("id")
);
