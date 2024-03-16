import { DeliverymenRepository } from '@/repositories/deliverymen-repository';
import { DeliverymanAlreadyExistsError } from '../errors/deliveryman-already-exists-error';
import { hash } from 'bcryptjs';

interface CreateDeliverymanRequest {
    name: string
    driversLicense: string
    company: string
    password: string
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

    async execute({ name, driversLicense, password, company, phone, street, city, district, state, number, zipcode }: CreateDeliverymanRequest) {
        const password_hash = await hash(password, 6);


        const deliverymanWithSameDriversLicense = await this.deliverymenRepository.findByDriversLicense(driversLicense);

        if (deliverymanWithSameDriversLicense) {
            throw new DeliverymanAlreadyExistsError();
        }

        const deliveryman = await this.deliverymenRepository.create({
            name, 
            driversLicense, 
            password: password_hash, 
            company, 
            phone, 
            street, 
            city, 
            district, 
            state, 
            number, 
            zipcode
        });

        return { deliveryman };
    }
}