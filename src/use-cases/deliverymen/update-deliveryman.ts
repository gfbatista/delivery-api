import { DeliverymenRepository } from '@/repositories/deliverymen-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DeliverymanAlreadyExistsError } from '../errors/deliveryman-already-exists-error';

interface UpdateDeliverymanRequest {
    uuid: string,
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

export class UpdateDeliverymanUseCase {
    constructor(private deliverymenRepository: DeliverymenRepository) { }

    async execute({ uuid, name, driversLicense, company, phone, street, city, district, state, number, zipcode }: UpdateDeliverymanRequest) {
        const deliveryman = await this.deliverymenRepository.findByUuid(uuid);

        if (!deliveryman) {
            throw new ResourceNotFoundError();
        }

        const deliverymanWithSameDriversLicense = await this.deliverymenRepository.findByDriversLicense(driversLicense);

        if (deliverymanWithSameDriversLicense && (deliverymanWithSameDriversLicense.uuid !== uuid)) {
            throw new DeliverymanAlreadyExistsError();
        }

        await this.deliverymenRepository.save({
            name,
            driversLicense,
            company,
            phone,
            street,
            city,
            district,
            state,
            number,
            zipcode,
        }, uuid);
    }
}