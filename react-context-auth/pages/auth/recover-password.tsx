import { useState } from "react";
import { NextPage } from "next";

import { AuthLayout } from "@layouts";
import {
  ResetPasswordForm,
  SendPinForm,
  VerifyPinForm,
} from "@components/auth";

export type RecoverPasswordPages = "send-pin" | "verify-pin" | "reset-password";

const RecoverPasswordPage: NextPage = () => {
  const [page, setPage] = useState<RecoverPasswordPages>("send-pin");

  const inSendPinPage = page === "send-pin";
  const inVerifyPinPage = page === "verify-pin";
  const inResetPasswordPage = page === "reset-password";

  const goToSendPin = () => setPage("send-pin");
  const goToVerifyPin = () => setPage("verify-pin");
  const goToResetPassword = () => setPage("reset-password");

  return (
    <AuthLayout>
      <>
        {inSendPinPage && <SendPinForm next={goToVerifyPin} />}

        {inVerifyPinPage && (
          <VerifyPinForm next={goToResetPassword} back={goToSendPin} />
        )}

        {inResetPasswordPage && <ResetPasswordForm back={goToSendPin} />}
      </>
    </AuthLayout>
  );
};

export default RecoverPasswordPage;
