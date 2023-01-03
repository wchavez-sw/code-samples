import { useContractRead } from "wagmi";
import { calcEthUsdFromContract } from "utils";

import SaleUtopiaNFTV2JSON from "contracts/SaleUtopiaNFTV2.json";

export const useEthUsdLatestPrice = () => {
  const { data, isError, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_SALEUTOPIA_CONTRACT,
    abi: SaleUtopiaNFTV2JSON.abi,
    functionName: "getLatestPrice",
    staleTime: 60000, // 1 minute
  });

  return {
    isLoading,
    isError,
    ethUsd: calcEthUsdFromContract(data),
  };
};
