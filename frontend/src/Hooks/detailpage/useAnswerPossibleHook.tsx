"use client";
import AnswerPossibleGet from "@/api/surveydetail/answerPossibleGet";
import { useEffect, useState } from "react";

const useAnswerPossibleHook = (id: any) => {
    const [cananswer, setCananswer] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const fetchList = async () => {

            if (accessToken) {

                const data = await AnswerPossibleGet(id);
                if (data.success) {
                    setCananswer(data.response);
                } else {
                    //console.log(data.apiError);
                }
            }
        };
        fetchList();
    }, []);

    return { cananswer };
};

export default useAnswerPossibleHook;
