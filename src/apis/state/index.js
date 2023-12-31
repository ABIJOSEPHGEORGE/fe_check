import { auth } from "..";
export const stateData = async ({ country_id }) => {
    const res = await auth({
        method: "GET",
        url: `/address/states?filters[country_id]=${country_id}`,
    });
    return res?.data;
};
