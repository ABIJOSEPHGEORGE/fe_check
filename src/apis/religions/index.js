import {auth} from '..';
export const religionData = async () => {
    const res = await auth({ method: "GET", url: `/religions`});
    return res?.data;
};