import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderCompanyDto } from './create-provider-company.dto';

export class UpdateProviderCompanyDto extends PartialType(CreateProviderCompanyDto) {}
