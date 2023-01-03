import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { AuthLayout } from "@layouts";
import { Alert } from "@components";
import { Button } from "@components/buttons";
import { ErrorLabel, FormLabel, TextInput } from "@components/forms";
import { FormTitle, RememberMeCheckbox } from "@components/auth";

import { useAuthContext } from "@contexts";
import { authServices } from "@services";
import { mappers } from "@utils";

type FormData = {
  username: string;
  password: string;
};

const SigninPage: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { loginClient } = useAuthContext();
  const router = useRouter();
  const loginMutation = useMutation(authServices.login, {
    onSuccess: ({ token, user }) => {
      loginClient(token, user);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ username, password }: FormData) => {
    try {
      await loginMutation.mutateAsync({ username, password });
      router.push("/");
    } catch (error) {
      const resp = mappers.mapAxiosError(error);
      setErrorMessage(resp.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <AuthLayout>
      <>
        <FormTitle title="Ingresar" />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {errorMessage && (
            <Alert type="error" message={errorMessage} className="mb-6" />
          )}

          <div className="space-y-4 md:space-y-6 mb-12">
            <div>
              <FormLabel htmlFor="username" text="Correo o nombre de usuario" />

              <TextInput
                id="username"
                placeholder="Ej: myuser"
                {...register("username", {
                  required: "El nombre de usuario es requerido",
                })}
                error={!!errors.username}
              />

              {errors.username && (
                <ErrorLabel message={errors.username.message} />
              )}
            </div>

            <div>
              <FormLabel htmlFor="password" text="Contraseña" />

              <TextInput
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                error={!!errors.password}
              />

              {errors.password && (
                <ErrorLabel message={errors.password.message} />
              )}
            </div>

            <div className="flex items-center justify-between">
              <RememberMeCheckbox />

              <Link href="/auth/recover-password">
                <a className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Olvidé mi contraseña
                </a>
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Button type="submit" disabled={loginMutation.isLoading}>
              {loginMutation.isLoading ? "Verificando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </>
    </AuthLayout>
  );
};

export default SigninPage;
