import { auth } from '..';

export const fetchConnections = async (
    {currentPage = 1,
    sortField = "created_at",
    limit = 6,
    connectionType}
) => {
    const res = await auth({
        method: 'GET',
        url: `/connections/connection/${connectionType}?page=${currentPage}&sortField=${sortField}&limit=${limit}`
    });

    return res;
};

export const acceptConnection = async requested_user => {
    const res = await auth({
        method: 'POST',
        url: `/connections/accept/${requested_user}` 
    });

    return res?.data;
};

export const rejectConnection = async requested_user => {
    const res = await auth({
        method: 'POST',
        url: `/connections/reject/${requested_user}`,
    });

    return res?.data;
}