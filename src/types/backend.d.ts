export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    interface ILogin {
        user: {
            _id: string;
            name: string;
            email: string;
        }
        access_token: string;
    }

    interface ICategory {
        _id: string;
        title: string;
    }

    interface IProduct {
        "_id": string;
        "name": string;
        "categoryId": ICategory;
        "subCategoryId": ICategory;
        "code": string;
        "image": string;
        "tag": string;
        "quantity": number;
        "price": number;
        "createdAt": string;
        "updatedAt": string;
    }

    interface ICart {
        "_id": string;
        "quantity": number;
        "detail": IProduct
    }


    interface IDetailOrder {
        "productId": string;
        "quantity": number;
    }

    interface IOrder {
        "userId": string;
        "totalPrice": number;
        "address": string;
        "phone": string;
        "pay": string; 
        "detail": IDetailOrder[]
    }

    interface IDetailOrderDB {
        "productId": IProduct;
        "quantity": number;
    }
    
    interface IOrderDB {
        "_id": string
        "userId": string;
        "totalPrice": number;
        "address": string;
        "phone": string;
        "pay": string; 
        "detail": IDetailOrderDB[]
        "createdAt": Date
    }

    

}
