import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProviderCompaniesService } from './provider-companies.service';

import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';
import { CreateProviderCompanyDto } from './dto/create-provider-company.dto';
import { UpdateProviderCompanyDto } from './dto/update-provider-company.dto';

@Controller()
export class ProviderCompaniesController {
    constructor(private readonly providerCompaniesService: ProviderCompaniesService) { }

    @MessagePattern('provider.create.company')
    create(
        @Payload() createProviderCompanyDto: CreateProviderCompanyDto
    ) {
        return this.providerCompaniesService.create(createProviderCompanyDto);
    }

    @MessagePattern('provider.findAll.company')
    findAll(
        @Payload() filterPaginationDto: FilterPaginationDto
    ) {
        return this.providerCompaniesService.findAll(filterPaginationDto);
    }

    @MessagePattern('provider.findOne.company')
    findOne(
        @Payload() id: string
    ) {
        return this.providerCompaniesService.findOne(id);
    }

    @MessagePattern('provider.update.company')
    update(
        @Payload() payload: { id: string, updateProviderCompanyDto: UpdateProviderCompanyDto }
    ) {
        return this.providerCompaniesService.update(payload.id, payload.updateProviderCompanyDto);
    }
}
