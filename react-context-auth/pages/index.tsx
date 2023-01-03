import { NextPage } from "next";

import { DashboardLayout } from "@layouts";
import { DisplayError, LoadingContent } from "@components";
import { PageTitle } from "@components/sections";
import {
  ExchangeRate,
  HihgtRiskWalletList,
  Metric,
  MoneyFlowChart,
  UserList,
  UsersRejectedByKycList,
  FeeValueMetric,
} from "@components/dashboard";

import { useAuthContext } from "@contexts";
import { useDashboard } from "@hooks/compose";

import WalletIcon from "@public/assets/dashboard/wallet-icon.svg";
import PiggyBankIcon from "@public/assets/dashboard/piggy-bank-icon.svg";
import ContactsIcon from "@public/assets/dashboard/contacts-icon.svg";
import SendIcon from "@public/assets/dashboard/send-icon.svg";

import UsFlag from "@public/assets/flags/usa.svg";
import RdFlag from "@public/assets/flags/rd.svg";

const HomePage: NextPage = () => {
  const { user } = useAuthContext();

  const { data, isLoading, isSuccess, isError } = useDashboard();

  const { mainData, rejectedUsers, fees, exchangeInfo } = data;

  return (
    <DashboardLayout title="Dashboard /">
      <PageTitle title={`Bienvenido, ${user?.firstName}`} />

      {isLoading && <LoadingContent className="mt-8" />}

      {isError && (
        <DisplayError
          className="mt-8"
          message="Error al cargar la información"
        />
      )}

      {isSuccess && (
        <div className="grid grid-cols-4 gap-3 xl:gap-4 mt-4 2xl:mt-8">
          <div className="col-span-full 2xl:col-span-3 grid grid-cols-1 gap-3 xl:gap-4">
            <div className="grid grid-flow-col 2xl:grid-cols-4 gap-3 xl:gap-4 overflow-x-scroll 2xl:overflow-visible -m-3 p-3 2xl:p-0 2xl:m-0">
              <Metric
                title="Saldo cuenta subsidio"
                value={`$${mainData.balanceWalletSubsidy.toFixed(2)}`}
                icon={WalletIcon}
                color="#007724"
              />
              <Metric
                title="Saldo cuenta recaudadora"
                value={`$${mainData.balanceWalletRecaudadora}`}
                icon={PiggyBankIcon}
                color="#022150"
              />
              <Metric
                title="Total usuarios registrados"
                value={`${mainData.totalUsers}`}
                icon={ContactsIcon}
                color="#44BAE9"
              />
              <Metric
                title="Total transacciones"
                value={`${mainData.totalTransactions}`}
                icon={SendIcon}
                color="#F3933A"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 xl:gap-4">
              <div className="col-span-full lg:col-span-1 grid grid-cols-1 gap-3 xl:gap-4">
                {user?.role === "treasury" && (
                  <div className="grid grid-flow-col 2xl:grid-cols-2 gap-3 xl:gap-4 overflow-x-scroll 2xl:overflow-visible -m-3 p-3 2xl:p-0 2xl:m-0">
                    {fees.map((fee) => (
                      <FeeValueMetric
                        key={fee.id}
                        id={fee.id}
                        title={fee.feedType}
                        value={fee.feeAmount}
                      />
                    ))}
                  </div>
                )}
                <HihgtRiskWalletList
                  users={mainData.usersInHightRisk}
                  listHeight={400}
                />
              </div>
              <div className="col-span-full lg:col-span-1 grid grid-cols-1 gap-3 xl:gap-4 -m-3 p-3 2xl:p-0 2xl:m-0">
                <MoneyFlowChart
                  title="Dinero enviado"
                  subtitle="Últimos 7 días VS semana anterior"
                  data={mainData.moneySent}
                />
                <MoneyFlowChart
                  title="Dinero retirado"
                  subtitle="Últimos 7 días VS semana anterior"
                  data={mainData.withdraws}
                />
              </div>
            </div>
          </div>

          <div className="col-span-full 2xl:col-span-1 grid gap-3 xl:gap-4 grid-cols-1 xl:grid-cols-3 2xl:grid-cols-1 items-start">
            <ExchangeRate
              from={1}
              id={exchangeInfo!.id}
              to={+exchangeInfo!.rate}
              currencyFrom={exchangeInfo!.fromCurrency}
              currencyTo={exchangeInfo!.toCurrency}
              flagFrom={UsFlag}
              flagTo={RdFlag}
            />

            <UserList users={mainData.usersRegisteredToday} listHeight={180} />
            <UsersRejectedByKycList users={rejectedUsers} listHeight={180} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default HomePage;
