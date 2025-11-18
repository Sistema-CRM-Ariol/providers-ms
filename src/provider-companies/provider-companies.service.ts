import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { PrismaService } from 'src/prisma/prisma.service';

import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';
import { CreateProviderCompanyDto } from './dto/create-provider-company.dto';
import { UpdateProviderCompanyDto } from './dto/update-provider-company.dto';

@Injectable()
export class ProviderCompaniesService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(createProviderCompanyDto: CreateProviderCompanyDto) {
        try {

            await this.prisma.providerCompany.create({
                data: createProviderCompanyDto
            });

            return {
                message: 'Empresa proveedora creada exitosamente',
            };

        } catch (error) {
            if (
                error.code === 'P2002'
                && error.meta?.target?.includes('email1') || error.meta?.target?.includes('email2')
            ) {
                throw new RpcException({
                    statusCode: 400,
                    message: 'El numero de documento esta siendo utilizado'
                })
            }
        }


    }

    async findAll(filterPaginationDto: FilterPaginationDto) {
        const { isActive, limit, page, search } = filterPaginationDto;

        const filters: any[] = [];

        if (search) {
            filters.push({
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { phone1: { contains: search, mode: 'insensitive' } },
                    { phone2: { contains: search, mode: 'insensitive' } },
                    { email1: { contains: search, mode: 'insensitive' } },
                    { email2: { contains: search, mode: 'insensitive' } },
                ],
            });
        }

        // Si status viene definido, lo agregamos
        if (isActive !== undefined) {
            filters.push({ isActive });
        }

        const whereClause = filters.length > 0 ? { AND: filters } : {};

        const [totalProviderCompanies, providerCompanies] = await Promise.all([
            this.prisma.providerCompany.count({
                where: whereClause,
            }),
            this.prisma.providerCompany.findMany({
                take: limit,
                skip: (page! - 1) * limit!,
                orderBy: { updatedAt: 'desc' },
                where: { ...whereClause, },
                omit: {
                    notes: true,
                }
            }),
        ]);

        const lastPage = Math.ceil(totalProviderCompanies / limit!);

        return {
            providerCompanies,
            meta: {
                page,
                lastPage,
                total: totalProviderCompanies,
            },
        };
    }

    async findOne(id: string) {

        const providerCompany = await this.prisma.providerCompany.findUnique({
            where: { id },
            include: {
                contacts: true,
            }
        });

        if (!providerCompany) {
            throw new RpcException({
                statusCode: 404,
                message: 'Empresa proveedora no encontrada',
            });
        }

        return {
            providerCompany
        };

    }

    async update(id: string, updateProviderCompanyDto: UpdateProviderCompanyDto) {

        try {
            await this.prisma.providerCompany.update({
                where: { id },
                data: updateProviderCompanyDto,
            });

            return {
                message: 'Empresa proveedora actualizada exitosamente',
            };

        } catch (error) {
            if (
                error.code === 'P2002'
                && error.meta?.target?.includes('email1') || error.meta?.target?.includes('email2')
            ) {
                throw new RpcException({
                    statusCode: 400,
                    message: 'El numero de documento esta siendo utilizado'
                })
            }
        }
    }
}
