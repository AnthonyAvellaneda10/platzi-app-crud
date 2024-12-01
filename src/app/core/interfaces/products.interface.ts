export interface Products {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    images:      string[];
    creationAt:  Date;
    updatedAt:   Date;
    category:    Category;
}

export interface Category {
    id:         number;
    name:       Name;
    image:      string;
    creationAt: Date;
    updatedAt:  Date;
}

export enum Name {
    ChangeTitle = "Change title",
    Electronics = "Electronics",
    Food = "Food",
    Miscellaneous = "Miscellaneous",
    Shoes = "Shoes",
}
