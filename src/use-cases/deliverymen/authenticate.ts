import { DeliverymenRepository } from '@/repositories/deliverymen-repository';
import { compare } from 'bcryptjs';
import { Deliveryman } from '@prisma/client';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

interface AuthenticateDeliverymenRequest {
    driversLicense: string
    password: string
}

interface AuthenticateUseCaseResponse {
    deliveryman: Deliveryman
}

export class AuthenticateUseCase {
    constructor(private deliverymenRepository: DeliverymenRepository) { }

    async execute({
        driversLicense,
        password,
    }: AuthenticateDeliverymenRequest): Promise<AuthenticateUseCaseResponse> {
        const deliveryman = await this.deliverymenRepository.findByDriversLicense(driversLicense);

        if (!deliveryman) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, deliveryman.password);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return { deliveryman };
    }
}
