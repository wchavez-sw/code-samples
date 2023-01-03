
import { useEthUsdLatestPrice } from 'hooks/contracts';

export default function Mint() {
  ...

  const { isLoading, ethUsd } = useEthUsdLatestPrice();

  ...

  const calcTotalInEth = () => {
    const subTotal = price * quantity;
    const totalEth = subTotal / ethUsd!
    return totalEth;
  };

  return (
    ...
  );
}
