import { auth } from "../..";
export const getShortlistedlist = async (currentPage = 1, limit = 6) => {
    const res = await auth({
        method: "GET",
        url: `/shortlist?page=${currentPage}&limit=${limit}`,
    });
    return res;
};
