export class DeliverymanAlreadyExistsError extends Error {
    constructor() {
        super('Drivers License already exists.');
    }
}