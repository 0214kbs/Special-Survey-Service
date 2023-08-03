import { useState, useEffect } from "react";
import useTimerHook from "@/Hooks/card/useTimerHook";
import normalListGet from "@/api/surveylist/normalListGet";
import useUserStore from "@/stores/useUserStore";
import useSortSurveyListHook from "./useSortSurveyListHook";

const useNormalListHook = () => {
  const [surveys, setSurveys] = useState<any>([]);
  const accessToken = useUserStore((state: any) => state.accessToken);

  useEffect(() => {
    // 데이터 패칭
    const fetchList = async () => {
      const data = await normalListGet(accessToken);
      setSurveys(data);
      console.log(data);
    };
    fetchList();
  }, []);


  const [sortType, setSortType] = useState("recommend");
  const sortedSurveys = useSortSurveyListHook(surveys, sortType, useTimerHook);

  return { sortedSurveys, setSortType };
};
export default useNormalListHook;
