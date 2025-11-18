-- CreateTable
CREATE TABLE "providers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email1" TEXT NOT NULL,
    "email2" TEXT,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "providerCompanyId" TEXT,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email1" TEXT NOT NULL,
    "email2" TEXT,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provider_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "providers_email1_key" ON "providers"("email1");

-- CreateIndex
CREATE UNIQUE INDEX "providers_email2_key" ON "providers"("email2");

-- CreateIndex
CREATE UNIQUE INDEX "provider_companies_email1_key" ON "provider_companies"("email1");

-- CreateIndex
CREATE UNIQUE INDEX "provider_companies_email2_key" ON "provider_companies"("email2");

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_providerCompanyId_fkey" FOREIGN KEY ("providerCompanyId") REFERENCES "provider_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
