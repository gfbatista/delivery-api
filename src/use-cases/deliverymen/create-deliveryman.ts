import { DeliverymenRepository } from '@/repositories/deliverymen-repository';
import { DeliverymanAlreadyExistsError } from '../errors/deliveryman-already-exists-error';

interface CreateDeliverymanRequest {
    name: string
    driversLicense: string
    company: string
    phone: string
    street: string
    city: string
    district: string
    state: string
    number?: number,
    zipcode?: string
}

export class CreateDeliverymanUseCase {
    constructor(private deliverymenRepository: DeliverymenRepository) { }

    async execute({ name, driversLicense, company, phone, street, city, district, state, number, zipcode }: CreateDeliverymanRequest) {

        const deliverymanWithSameDriversLicense = await this.deliverymenRepository.findByDriversLicense(driversLicense);

        if (deliverymanWithSameDriversLicense) {
            throw new DeliverymanAlreadyExistsError();
        }

        const deliveryman = await this.deliverymenRepository.create({
            name, driversLicense, company, phone, street, city, district, state, number, zipcode
        });

        return { deliveryman };
    }
}