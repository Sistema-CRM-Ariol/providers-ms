import { Injectable, Logger } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

@Injectable()
export class ProvidersService {

    private readonly logger = new Logger('ProvidersService');

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    // ─── Dashboard Stats ────────────────────────────────────────────
    async getStats() {

        const [totalProviders, activeProviders] = await Promise.all([
            this.prisma.provider.count(),
            this.prisma.provider.count({
                where: { isActive: true },
            }),
        ]);

        return {
            totalProviders,
            activeProviders,
        };
    }

    async create(createProviderDto: CreateProviderDto) {
        try {
            await this.prisma.provider.create({
                data: createProviderDto,
            })

            return {
                message: 'El proveedor ha sido creado exitosamente',
            }

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

        const [totalProviders, providers] = await Promise.all([
            this.prisma.provider.count({
                where: whereClause,
            }),
            this.prisma.provider.findMany({
                take: limit,
                skip: (page! - 1) * limit!,
                orderBy: { updatedAt: 'desc' },
                where: { ...whereClause, },
                omit: {
                    notes: true,
                }
            }),
        ]);

        const lastPage = Math.ceil(totalProviders / limit!);

        return {
            providers,
            meta: {
                page,
                lastPage,
                total: totalProviders,
            },
        };
    }

    async findOne(id: string) {
        const provider = await this.prisma.provider.findUnique({
            where: { id },
            include: {
                providerCompany: true,
            }
        });

        if (!provider) {
            throw new RpcException({
                statusCode: 404,
                message: 'Proveedor no encontrado',
            });
        }

        return {
            provider
        };
    }

    async update(id: string, updateProviderDto: UpdateProviderDto) {

        const provider = await this.prisma.provider.findUnique({
            where: { id },
        });

        if (!provider) {
            throw new RpcException({
                status: 404,
                message: 'Proveedor no encontrado',
            });
        }

        await this.prisma.provider.update({
            where: { id },
            data: updateProviderDto,
        });

        return {
            message: 'El proveedor ha sido actualizado exitosamente',
        };
    }
}
