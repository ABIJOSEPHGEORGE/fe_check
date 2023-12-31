import { noAuth } from "..";

export const getEvents = async ({ page, limit, mode, type, audience }) => {
    const requestUrl =
        `/events?page=` +
        page +
        `&limit=` +
        limit +
        (mode !== "none" ? `&filters[mode]=` + mode : "") +
        (type !== "none" ? `&filters[type]=` + type : "") +
        (audience !== "none" ? `&filters[audience]=` + audience : "");
    const res = await noAuth({
        method: "GET",
        url: requestUrl,
    });
    const data = res?.data;
    const pagination = res?.pagination;
    return { data, pagination };
};

export const getSingleEvent = async ({ id }) => {
    const res = await noAuth({ method: "GET", url: `/events/${id}` });
    return res?.data;
};
