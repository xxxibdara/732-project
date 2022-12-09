import { useEffect, useState } from "react";
import axios from "../util/axios";

export default function useBarChartData() {
  // Create a custom React Hook
  const [groupByStarData, setGroupByStarData] = useState([]);
  const [groupByCategoryData, setGroupByCategoryData] = useState([]);

  useEffect(() => {
    async function initialSet() {
      const initGroupByStarData = await getAllGroupByStarData();
      setGroupByStarData(initGroupByStarData);
    }

    initialSet();
  }, []);

  useEffect(() => {
    async function initialSet() {
      const initGroupByCategoryData = await getAllGroupByCategoryData();
      setGroupByCategoryData(initGroupByCategoryData);
    }

    initialSet();
  }, []);

  const getAllGroupByStarData = async () => {
    const response = await axios.get(`/starCount`);
    return response.data;
  };

  const getAllGroupByCategoryData = async () => {
    const response = await axios.get(`/categoryCount`);
    return response.data;
  };


  return {
    groupByStarData,
    groupByCategoryData,
    setGroupByStarData,
    setGroupByCategoryData,
  };
}
