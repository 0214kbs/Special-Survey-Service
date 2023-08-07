import api from "../../api";

const answeredListGet = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await api.get("/survey/answered", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.data.success) {
            return response.data.response;
        } else {
            console.log("error: ", response.data.apiError.message);
        }
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

export default answeredListGet;
