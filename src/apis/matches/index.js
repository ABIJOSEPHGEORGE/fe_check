import { auth } from "../";

export const personalizedMatches = async () => {
    const res = await auth({
        method: "GET",
        url: `/matches/personalized-matches`,
    });

    return res?.data;
};

export const handpickedMatches = async (currentPage = 1, limit = 10) => {
    const res = await auth({
        method: "GET",
        url: `/matches/handpicked-matches?page=${currentPage}&limit=${limit}`,
    });

    return res;
};
