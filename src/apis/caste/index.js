import { auth } from "..";
export const casteData = async (religion_id) => {
    const res = await auth({ method: "GET", url: `/castes/${religion_id}` });
    return res?.data;
};
