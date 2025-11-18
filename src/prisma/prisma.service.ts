
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    
    private readonly logger = new Logger('Providers Database');

    async onModuleInit() {
        try {

            this.logger.log('Connecting to the database...');

            await this.$connect();
            
            this.logger.log('Connected to the database.');

        } catch (error) {
            this.logger.error('Failed to connect to the database.', error);
        }
    }
}
