import { Prisma } from "@prisma/client";
import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProviderDto implements Prisma.ProviderCreateWithoutProviderCompanyInput {
    @IsString({
        message: 'name must be a string',
    })
    name: string;

    @IsString({
        message: 'lastname must be a string',
    })
    lastname: string;

    @IsEmail({}, {
        message: 'email1 must be a valid email address',
    })
    email1: string;
    
    @IsOptional()
    @IsEmail({}, {
        message: 'email2 must be a valid email address',
    })
    email2?: string | null | undefined;

    @IsString({
        message: 'phone1 must be a string',
    })
    phone1: string;
    
    @IsOptional()
    @IsString({
        message: 'phone2 must be a string',
    })
    phone2?: string | null | undefined;

    @IsOptional()
    @IsString({
        message: 'notes must be a string',
    })
    notes?: string | null | undefined;
    
    @IsOptional()
    @IsBoolean({
        message: 'isActive must be a boolean',
    })
    isActive?: boolean | undefined;

    @IsOptional()
    @IsUUID('4', { message: 'providerCompanyId must be a valid UUID v4' })
    providerCompanyId?: string;
}
