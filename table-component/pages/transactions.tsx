import { useState } from "react";
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import cn from "classnames";

import { DashboardLayout } from "@layouts";
import { Avatar, DisplayError, LoadingContent } from "@components";
import { PageTitle } from "@components/sections";
import { Table } from "@components/tables";
import { TextInput } from "@components/forms";

import { transactionServices } from "@services";
import { converters, mappers } from "@utils";
import { useDebounce } from "@hooks";

const TransactionsPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: pagination,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(["TRANSACTIONS", page, debouncedSearch], () =>
    transactionServices.getTransactions({ page, search: debouncedSearch })
  );

  const { data: transactions = [], totalPages } = pagination || {};

  return (
    <DashboardLayout title="Transacciones /">
      <PageTitle title="Transacciones" />

      <div className="flex justify-end my-4">
        <TextInput
          placeholder="Buscar transacción"
          className="w-full max-w-sm"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>

      {isLoading && <LoadingContent />}

      {isError && <DisplayError message="Error al cargar transacciones" />}

      {isSuccess && (
        <Table
          data={transactions}
          columns={[
            {
              key: "from",
              header: "Remitente",
            },
            {
              key: "createdAt",
              header: "Fecha",
            },
            {
              key: "transactionType",
              header: "Tipo de Transacción",
            },
            {
              key: "to",
              header: "Receptor",
            },
            {
              key: "country",
              header: "País destino",
            },
            {
              key: "amount",
              header: "Monto total",
            },
            {
              key: "status",
              header: "Estatus",
            },
          ]}
          customRenderers={[
            {
              key: "from",
              renderer: (_, { from }) => (
                <div className="flex items-center gap-2 font-bold text-primary">
                  <Avatar size="md" name={from} />
                  {from}
                </div>
              ),
            },
            {
              key: "to",
              renderer: (_, { to }) => (
                <div className="flex items-center gap-2 font-bold text-primary">
                  <Avatar size="md" name={to} />
                  {to}
                </div>
              ),
            },
            {
              key: "to",
              renderer: (_, { to }) => (
                <div className="flex items-center gap-2 font-bold text-primary">
                  <Avatar size="md" name={to} />
                  {to}
                </div>
              ),
            },
            {
              key: "createdAt",
              renderer: (_, { createdAt }) => converters.formatDate(createdAt),
            },
            {
              key: "amount",
              renderer: (_, { amount }) => (
                <span className="font-bold">${amount}</span>
              ),
            },
            {
              key: "status",
              renderer: (_, { status }) => (
                <span
                  className={cn("capitalize", {
                    "text-success": status === "completed",
                    "text-primary": status === "pending",
                    "text-error":
                      status === "failed" ||
                      status === "cancelled" ||
                      status === "expired",
                  })}
                >
                  {mappers.mapTxStatus(status)}
                </span>
              ),
            },
          ]}
          pagination
          paginationProps={{
            currentPage: page,
            totalPages: totalPages!,
            onPageChange: setPage,
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default TransactionsPage;
