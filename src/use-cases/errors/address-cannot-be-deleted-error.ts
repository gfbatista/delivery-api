export class AddressCannotBeDeletedError extends Error {
    constructor() {
        super('Primary address cannot be deleted.');
    }
}