
export default interface User {
    _id: string;
    names: string;
    firstLastName: string;
    secondLastName: string;
    userName: string;
    email?: string;
    password?: string;
}