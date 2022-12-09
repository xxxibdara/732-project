import { useEffect, useState } from "react";
import axios from "../util/axios";

export default function useWordCloudData() {
  // Create a custom React Hook
  const [positiveData, setPositiveData] = useState({});
  const [negativeData, setNegativeData] = useState({});

  const getPositiveData = async (id) => {
    const response = await axios.get(`/wordCloudPositive/${id}`);
    return response.data[0];
  };

  const getNegativeData = async (id) => {
    const response = await axios.get(`/wordCloudNegative/${id}`);
    return response.data[0];
  };

  return {
    positiveData,
    setPositiveData,
    getPositiveData,
    getNegativeData,
    negativeData,
    setNegativeData
  };
}
