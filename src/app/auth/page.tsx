"use client";
import { Typography, TextField, Button } from "@mui/material";
import styled from "styled-components";
import css from "./page.module.scss";
import { FormEvent, useState } from "react";
import { useSignupMutation, useSigninMutation } from "@/lib/redux/auth/authApi";
import { useDispatch } from "react-redux";
// import saveRefreshToken from "@/components/features/auth/saveRefreshToken";
import { useRouter } from "next/navigation";
import { setProfile, setTokens } from "@/lib/redux/auth/authSlice";
import { z } from "zod";
import { toast, Bounce } from "react-toastify";
import { useRef, useEffect } from "react";
import { Id } from "react-toastify";

interface IError {
  message: string;
  errors: [];
}

const FormSchema = z.object({
  username: z
    .string()
    .min(4, "Логін занадто корткий")
    .max(30, "Логін занадто доооооовгий"),
  password: z
    .string()
    .min(8, "Пароль занадто корткий")
    .max(50, "Пароль занадто доооооовгий"),
});

type FormFields = z.infer<typeof FormSchema>;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledInput = styled(TextField)`
  .MuiInputBase-input {
    color: var(--primary-color);
  }

  .MuiFormHelperText-root {
    color: red;
  }

  /* .css-m1drwd-MuiInputBase-root-MuiInput-root {
    color: var(--primary-color) !important;
  } */
`;

const AuthPage = () => {
  const [isRegistration, setIsRegistartion] = useState(true);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormFields, string>>
  >({});
  const toastId = useRef<Id>(null);
  const [registr, { isLoading: isLoadingRegistr, error: errorSignup }] =
    useSignupMutation();
  const [signin, { isLoading: isLoadingSignIn }] = useSigninMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (errorSignup) {
      if ("data" in errorSignup) {
        const message =
          (errorSignup.data as IError)?.message || "Registration failed";
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  }, [errorSignup]);

  useEffect(() => {
    if (isLoadingRegistr || isLoadingSignIn) {
      //   if (!toastId.current) return;

      if (!toast.isActive(toastId.current ?? "")) {
        toastId.current = toast.info("Loading, please wait...", {
          position: "top-right",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          draggable: false,
        });
      }
    } else {
      // Dismiss the toast when loading ends
      if (!toastId.current) return;
      toast.dismiss(toastId.current);
    }
  }, [isLoadingRegistr, isLoadingSignIn]);

  const handleAuth = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);

    const data = {
      username: (formData.get("username") as string) || "",
      password: (formData.get("password") as string) || "",
    };

    const result = FormSchema.safeParse(data);
    console.log(result);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((err) => {
        console.log("err", err);
        const field = err.path[0] as keyof FormFields;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      console.log(errors);
      return;
    } else {
      setErrors({});
      try {
        const response = isRegistration
          ? await registr(data).unwrap()
          : await signin(data).unwrap();
        dispatch(
          setTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          })
        );
        dispatch(
          setProfile({
            username: response.profile.username,
            avatar: "",
            id: "",
          })
        );
        router.push("/");
      } catch (err) {
        console.log(err);
        if (!isRegistration)
          toast.error(
            "Йой, знову забув пароль? Чи на цей раз логін? Спробуй згадати",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            }
          );
      }
    }

    // try {
    //   const response = await registr(data).unwrap();
    //   dispatch(
    //     setTokens({
    //       accessToken: response.accessToken,
    //       refreshToken: response.refreshToken,
    //     })
    //   );
    //   saveRefreshToken(response.refreshToken);
    //   router.push("/");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <>
      <div>
        <ModalContainer>
          <Typography
            variant="h2"
            component="h2"
            color="primary"
            fontSize="2em"
          >
            {isRegistration ? "Реєстрація" : "Вхід"}
          </Typography>
          <form className={css.authForm} onSubmit={handleAuth}>
            <Typography
              variant="h6"
              component="label"
              color="primary"
              fontSize="1em"
            >
              Ваше нікнейм
            </Typography>
            <StyledInput
              autoFocus={true}
              margin="dense"
              id="name"
              name="username"
              type="text"
              color="secondary"
              placeholder="Ваш нікнейм"
              fullWidth
              variant="standard"
              error={!Boolean(errors?.username)}
              helperText={errors.username && errors.username}
            />
            <Typography
              variant="h6"
              component="label"
              color="primary"
              fontSize="1em"
            >
              Пароль
            </Typography>
            <StyledInput
              autoFocus={true}
              margin="dense"
              id="password"
              name="password"
              type="password"
              color="secondary"
              placeholder="Ваш пароль"
              fullWidth
              variant="standard"
              error={!Boolean(errors?.password)}
              helperText={errors.password && errors.password}
            />
            <Button
              variant="outlined"
              className={css.test}
              sx={{ marginTop: "30px" }}
              type="submit"
            >
              {isRegistration ? "Зареєструватись" : "Увійи"}
            </Button>
          </form>
          <Typography component="p" color="primary">
            {isRegistration
              ? "Вже маєте аккаунт?"
              : "У Вас ще не має аккаунту?"}{" "}
            <Typography
              component="button"
              color="primary"
              sx={{ textDecoration: "underline" }}
              onClick={() => setIsRegistartion(!isRegistration)}
            >
              {isRegistration ? "Вхід" : "Реєстрація"}
            </Typography>
          </Typography>
        </ModalContainer>
      </div>
    </>
  );
};

export default AuthPage;
