import { Controller} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

@Controller('providers')
export class ProvidersController {
    constructor(private readonly providersService: ProvidersService) { }

    @MessagePattern('providers.create')
    create(
        @Payload() createProviderDto: CreateProviderDto
    ) {
        return this.providersService.create(createProviderDto);
    }

    @MessagePattern('providers.findAll')
    findAll(
        @Payload() filterPaginationDto: FilterPaginationDto,
    ) {
        return this.providersService.findAll(filterPaginationDto);
    }

    @MessagePattern('providers.findOne')
    findOne(
        @Payload() id: string
    ) {
        return this.providersService.findOne(id);
    }

    @MessagePattern('providers.update')
    update(
        @Payload() {id, updateProviderDto}: {id: string ,updateProviderDto :UpdateProviderDto}
    ) {
        return this.providersService.update(id, updateProviderDto);
    }
}
