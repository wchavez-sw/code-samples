import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cryptoServices, phaseServices } from "services";
import { ethers } from "ethers";

export const usePhase = () => {
  const [price, setPrice] = useState(1);
  const [feePercentage, setFeePercentage] = useState(1);
  const [priceEthUsd, setPriceEthUsd] = useState(1);

  const phaseQuery = useQuery(["GET_APP_PHASE"], phaseServices.getAppPhase, {
    onSuccess: (data) => {
      setPrice(data.price);
      setFeePercentage(data.gas_rate / 100);
    },
  });

  const ethToUsdQuery = useQuery(["GET_ETH_USD"], cryptoServices.getEthUsd, {
    onSuccess: (data) => {
      const rateEthUsd = data.ethereum.usd;
      setPriceEthUsd(rateEthUsd);

      if (phaseQuery.data) {
        const priceInEth = +ethers.utils.formatEther(phaseQuery.data.price_wei);
        const priceInUsd = phaseQuery.data.price_usd
          ? phaseQuery.data.price
          : priceInEth * rateEthUsd;

        setPrice(priceInUsd);
      }
    },
    enabled: !phaseQuery.isLoading,
  });

  return {
    isLoading: phaseQuery.isLoading,
    price,
    feePercentage,
    maxNfts: phaseQuery.data?.max_sales_per_wallet!,
    priceEthUsd,
  };
};
