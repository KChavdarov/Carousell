export interface User {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    password?: string,
    favorites?: [],
    cars?: [],
    comments?: [],
    replies?: [],
    _isAdmin?: boolean,
    _createdAt?: string,
    _updatedAt?: string,
}