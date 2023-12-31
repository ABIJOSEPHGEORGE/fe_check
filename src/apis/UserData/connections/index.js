import { auth } from "../..";

export const getConnectionlist = async (currentPage = 1, limit = 6) => {
    const res = await auth({
        method: "GET",
        url: `/connections?page=${currentPage}&limit=${limit}`,
    });
    return res;
};

export const getConnectionRequestlist = async (currentPage = 1, limit = 6) => {
    const res = await auth({
        method: "GET",
        url: `/connections/requests?page=${currentPage}&limit=${limit}`,
    });
    return res;
};

export const acceptConnectionRequest = async id => {
    const res = await auth({
        method: "POST",
        url: `/connections/accept`,
        data: {
            id,
        },
    });
    return res?.data;
};
