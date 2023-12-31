import { auth, noAuth } from "..";

export const login = async data => {
    const res = await noAuth({ method: "POST", url: "/auth/login", data });
    return res?.data;
};

export const sendEmailOtp = async data => {
    const res = await noAuth({ method: "POST", url: "/auth/send-otp", data});
    return res?.data;
};

export const register = async data => {
    data.host = window.origin;
    const options = {
        headers: {
            content_type:"multipart/form-data"
        }
    }
    const res = await noAuth({ method: "POST", url: "/auth/register", data, options});
    return res?.data;
};

export const status = async () => {
    const res = await auth({ method: "GET", url: "/auth/status" });

    return res?.data;
};

export const forgotPassword = async data => {
    data.host = window.origin;
    const res = await noAuth({ method: "POST", url: "/auth/forgot-password", data });
    return res?.success;
};

export const resetPassword = async data => {
    const res = await noAuth({ method: "POST", url: "/auth/reset-password", data });
    return res?.success;
};

export const resendEmail = async data => {
    const res = await noAuth({ method: "POST", url: "/auth/resend-email", data });
    return res?.success;
};

export const verifyEmail = async data => {
    const res = await noAuth({ method: "POST", url: "/auth/verify-email", data });
    return res?.success;
};
