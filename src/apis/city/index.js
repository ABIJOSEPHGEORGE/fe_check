import { auth } from "..";

export const cityData = async ({ state_id }) => {
    const res = await auth({ method: "GET", url: `/address/cities?filters[state_id]=${state_id}` });
    return res?.data;
};
