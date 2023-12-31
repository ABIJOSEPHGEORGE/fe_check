import { auth } from "..";

export const singleS3 = async (file, type) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", type);

    const res = await auth({
        method: "POST",
        url: "/upload/single-s3",
        data: formData,
        options: {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    });

    return res?.data;
};
