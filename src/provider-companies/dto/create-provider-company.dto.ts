import { Prisma } from "@prisma/client";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateProviderCompanyDto implements Prisma.ProviderCompanyCreateInput {
    @IsString({
        message: 'El nombre debe ser un texto',
    })
    name: string;
    
    @IsEmail({}, {
        message: 'El email1 debe ser un email válido',
    })
    email1: string;
    
    @IsOptional()
    @IsEmail({}, {
        message: 'El email2 debe ser un email válido',
    })
    email2?: string | null | undefined;
    
    @IsString({
        message: 'El teléfono 1 debe ser un texto',
    })
    phone1: string;
    
    @IsOptional()
    @IsString({
        message: 'El teléfono 2 debe ser un texto',
    })
    phone2?: string | null | undefined;
    
    @IsOptional()
    @IsString({
        message: 'La dirección debe ser un texto',
    })
    address?: string | null | undefined;
    
    @IsOptional()
    @IsString({
        message: 'Las notas deben ser un texto',
    })
    notes?: string | null | undefined;
    
    @IsOptional()
    @IsBoolean({
        message: 'isActive debe ser un valor booleano',
    })
    isActive?: boolean | undefined;
}
