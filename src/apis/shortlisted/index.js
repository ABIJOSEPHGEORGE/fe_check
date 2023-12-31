import { auth } from '..';

export const shortlistedUsers = async () => {
    const res = await auth({
        method: 'GET',
        url: '/shortlist',
    });

    return res;
}