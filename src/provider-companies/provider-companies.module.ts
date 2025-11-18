import { Module } from '@nestjs/common';
import { ProviderCompaniesService } from './provider-companies.service';
import { ProviderCompaniesController } from './provider-companies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [ProviderCompaniesController],
    providers: [ProviderCompaniesService],
    imports: [PrismaModule],
})
export class ProviderCompaniesModule { }
