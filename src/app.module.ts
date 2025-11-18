import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProvidersModule } from './providers/providers.module';
import { ProviderCompaniesModule } from './provider-companies/provider-companies.module';

@Module({
    imports: [PrismaModule, ProvidersModule, ProviderCompaniesModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
