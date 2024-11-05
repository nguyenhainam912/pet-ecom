'use server'

import { getServerSession, } from "next-auth/next"
import { revalidateTag } from 'next/cache'
import { sendRequest } from "./api";
import { authOptions } from "@/app/api/auth/auth.options";
//user
export const handleCreateUserAction = async (data: any) => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        body: { ...data }
    })
    revalidateTag("list-users")
    return res;
}

export const handleUpdateUserAction = async (data: any) => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`,
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        body: { ...data }
    })
    revalidateTag("list-users")
    return res;
}

export const handleDeleteUserAction = async (id: any) => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
    })

    revalidateTag("list-users")
    return res;
}

//product
export const handleCreateProductAction = async (data: any) => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        body: { ...data }
    })
    revalidateTag("list-product")
    return res;
}

export const handleUpdateProductAction = async (data: any) => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product`,
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        body: { ...data }
    })
    revalidateTag("list-product")
    return res;
}

export const handleDeleteProductAction = async (id: any) => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
    })

    revalidateTag("list-product")
    return res;
}

//category
export const handleGetCatalog = async () => {
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/category/catalog`,
        method: "GET",
    })
    return res;
}

export const handleGetCategory = async () => {
    const res: IBackendRes<IModelPaginate<ICategory>> = await sendRequest<IBackendRes<IModelPaginate<ICategory>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/category`,
        method: "GET",
    })
    return res;
}

export const handleGetSubCategory = async () => {
    const res: IBackendRes<IModelPaginate<ICategory>> = await sendRequest<IBackendRes<IModelPaginate<ICategory>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/subCategory`,
        method: "GET",
    })
    return res;
}


//order
export const handleAddOrderAction = async (data: IOrder) => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<IOrder>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/order`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        body: { ...data }
    })
    revalidateTag('product-by-category')
    revalidateTag('list-product')
    revalidateTag('list-order')
    return res;
}

export const handleGetOrderById = async (id: string) => {
    const session = await getServerSession(authOptions);

    const res = await sendRequest<IBackendRes<IModelPaginate<IOrderDB>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/order`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        queryParams: {
            userId: id,
        },
        nextOption: {
            next: { tags: ["list-order"] },
          },
    })
    return res;
}




