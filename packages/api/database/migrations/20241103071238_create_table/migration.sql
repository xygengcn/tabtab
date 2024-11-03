-- CreateTable
CREATE TABLE "tabtab_user_custom" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tabtab_grids" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "tabtab_widgets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gridId" INTEGER NOT NULL,
    "wdiget" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tabtab_widgets_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "tabtab_grids" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
