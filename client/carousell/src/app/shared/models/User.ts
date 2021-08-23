export interface User {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    _id?: string,
    password?: string,
    favorites?: [],
    cars?: [],
    comments?: [],
    replies?: [],
    isAdmin?: boolean,
    createdAt?: string,
    updatedAt?: string,
}