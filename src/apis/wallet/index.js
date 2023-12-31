import { auth } from '..'

export const getTransactions = async (page) => {
    const limit = 10;
    const res = await auth({
        method: "GET",
        url: `/wallet/transactions?page=${page}&limit=${limit}`,
    });
    return res;
}

export const intiatePayment = async (data) => {
    const res = await auth({
        method: "POST",
        url: '/wallet/recharge',
        data
    })

    return res?.data;
};

export const authorizePayment = async (data) => {
    const res = await auth({
        method: 'POST',
        url: '/wallet/payment/authorize',
        data,
    })

    return res?.data;
};

export const paymentStatus = async (data) => {
    const res = await auth({
        method: 'PUT',
        url: '/wallet/payment-status',
        data,
    });
    return res?.data;
}