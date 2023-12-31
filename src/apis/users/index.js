import { auth } from "..";

export const updateStep = async newStep => {
    const res = await auth({ method: "PUT", url: `/users`, data: { step: newStep } });
    return res?.data;
};

export const updateUserData = async data => {
    const res = await auth({ method: "PUT", url: `/users/profile`, data: data });
    return res?.data;
};

export const imgUpload = async imgStr => {
    const res = await auth({ method: "PUT", url: `/users`, data: { photo: imgStr } });
    return res?.data;
};

export const fetchUser = async () => {
    const res = await auth({ method: "GET", url: '/users/profile',});
    return res?.data;
};

export const fetchUserData = async (id) => {
    const res = await auth({
        method: 'GET',
        url: `/users/${id}`,
    });

    return res?.data;
}


export const updatePartnerPreferences = async data => {
    const res = await auth({method: "PUT", url:'/users/partner-preference', data});
    return res?.data;
}


export const requestVerification = async () => {
    const res = await auth({
        method: 'PUT',
        url: '/users/request-verification',
    });
    return res?.data;
};

export const requestVerificationStatus = async () => {
    const res = await auth({
        method: 'GET',
        url: '/users/verification-status',
    });
    return res?.data;
};

export const blockUser = async (data) => {
    const res = await auth({
        method: 'POST',
        url:"/users/block",
        data,
    });
    return res?.data;
};

export const reportUser = async (data) => {
    const res = await auth({
        method: 'POST',
        url: '/users/report',
        data,
    });
    return res?.data;
};

export const fetchImages = async () => {
    const res = await auth({
        method: 'GET',
        url: '/users/images',
    });

    return res?.data;
}

export const uploadProfileImage = async (data) => {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const res = await auth({
        method: 'PUT',
        url: '/users/profile-image',
        data,
        options
    });

    return res?.data;
}

export const uploadMultiImage = async (data) => {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const res = await auth({
        method: 'PUT',
        url: '/users/multi-image',
        data,
        options
    });

    return res?.data;
}

export const deleteMultiImage = async ({imageId}) => {
    const res = await auth({
        method: 'DELETE',
        url: `/users/multi-image?imageId=${imageId}`,
    });

    return res?.data;
}