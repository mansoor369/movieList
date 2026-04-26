/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `WatchListitem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchListitem_userId_movieId_key" ON "WatchListitem"("userId", "movieId");
