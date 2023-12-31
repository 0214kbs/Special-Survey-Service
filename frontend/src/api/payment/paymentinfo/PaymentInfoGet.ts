import api from "../../api";

const PaymentInfoGet = async (id : any) => {
    try {
        console.log(id)
        const accessToken = localStorage.getItem("accessToken");
        const response = await api.get("/payment/" + id, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error: ", error);
        throw error;
      }
    };

export default PaymentInfoGet;
