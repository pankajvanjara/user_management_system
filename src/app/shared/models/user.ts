export class User {

    firstName!: string;
    lastName!: string;
    address!: string;
    email!: string;
    phone_number!: number;

    constructor(firstName: string, lastName: string, address: string, email: string, phone_number: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone_number = phone_number;
    }

}