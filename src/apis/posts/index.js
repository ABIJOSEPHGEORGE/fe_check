import { auth, noAuth } from "..";
export const communityPosts = async (currentPage = 1, sortField = "created_at", limit = 6, search = "None", filters = {}) => {
    var url = "";
    (search !== "None") ?
        (url = `/posts?page=${currentPage}&sortField=${sortField}&limit=${limit}&search=${search}`)
        : (url = `/posts?page=${currentPage}&sortField=${sortField}&limit=${limit}`)

    filters['category'] === ("None" || undefined) ?
        (url = url)
        : (url = url + `&filters[category]=` + filters.category)

    const res = await noAuth({ method: "GET", url: url });
    return res;
}

export const getThePost = async (id) => {
    const res = await auth({ method: "GET", url: `/posts/${id}?page=1&limit=5` });
    return res;
}

export const commentOnPost = async (data) => {
    const { props } = data
    delete data['props']
    const res = await auth({ method: "POST", url: `/posts/${props.id}/comment`, data });
    return res?.data;
}