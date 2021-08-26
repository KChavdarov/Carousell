export interface CarQuery {
    make?: string,
    model?: string,
    year?: number,
    bodyStyle?: string,
    description?: string,
    engine?: string,
    transmission?: string,
    power?: number,
    color?: string,
    mileage?: number,
    price?: { min?: number, max?: number; },
    location?: string,
    comfort?: {},
    safety?: {},
    others?: {},
    page?: number;
}