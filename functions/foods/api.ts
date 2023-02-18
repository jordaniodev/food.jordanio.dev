import base from "./base";

export interface Product{
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

export const readAll = () =>{
    return base;
}

export const read = (id:number) => {
    return base.find((_b) => _b.id === id);
}

export const update = (id:number,body:Product) => {
    let row = base.find((_b) => _b.id === id);
    const rowUpdated = {
        ...row,
        ...body,
    }

    return rowUpdated;
}

