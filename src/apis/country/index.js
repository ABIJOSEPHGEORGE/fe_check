import {auth} from '..';
export const countryData = async () => {
    const res = await auth({ method: "GET", url: `/address/countries`});
    return res?.data;
};