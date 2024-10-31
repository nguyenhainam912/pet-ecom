'use server'

import { getServerSession, } from "next-auth/next"
import { revalidateTag } from 'next/cache'
import { sendRequest } from "./api";
import { authOptions } from "@/app/api/auth/auth.options";

export const handleCreateUserAction = async (data: any) => {
    const session = await getServerSession();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: { ...data }
    })
    revalidateTag("list-users")
    return res;
}

export const handleUpdateUserAction = async (data: any) => {
    const session = await getServerSession();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        body: { ...data }
    })
    revalidateTag("list-users")
    return res;
}

export const handleDeleteUserAction = async (id: any) => {
    const session = await getServerSession();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    })

    revalidateTag("list-users")
    return res;
}

export const handleGetCatalog = async () => {
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/category/catalog`,
        method: "GET",
    })
    return res;
}


export const handleAddCartAction = async (data: any) => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cart`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        body: { ...data }
    })

    revalidateTag("cart-by-user")

    return res;
}

export const handleGetCartAction = async () => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cart/byUser`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        queryParams: {
            userId: session?.user?._id
        },
        nextOption: {
            next: { tags: ['cart-by-user'] }
        }
    })
    return res;
}
