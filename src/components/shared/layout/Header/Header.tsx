"use client";

import css from "./Header.module.scss";
import Container from "../Container/Container";
import Image from "next/image";
import Logo from "@/media/imgs/logo.png";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useLogoutMutation } from "@/lib/redux/auth/authApi";
import { useRouter } from "next/navigation";
import { setProfile, setTokens } from "@/lib/redux/auth/authSlice";

const Header = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const dispatch = useDispatch();
  const [trigger, { isSuccess }] = useLogoutMutation();
  const router = useRouter();
  const handleLogout = async () => {
    await trigger({});
    if (isSuccess) {
      dispatch(setTokens({ accessToken: "", refreshToken: "" }));
      dispatch(setProfile({ username: "", id: "", avatar: "" }));
      router.push("/auth");
    }
  };
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerBlock}>
          <Image
            className={css.headerLogo}
            src={Logo}
            alt="RoomCraft логотип"
          />
          <Typography
            variant="h2"
            component="a"
            color="primary"
            fontSize={"1em"}
            classes={css.headerLogoText}
            className={css.headerLogoText}
            href="/"
          >
            Room craft
          </Typography>
        </div>
        <nav className={css.headerNav}>
          <Typography
            component={Link}
            href="/"
            color="primary"
            className={css.headerLink}
            marginRight={"3em"}
          >
            На головну
          </Typography>
          <Typography
            component={Link}
            href="/rooms"
            color="primary"
            className={css.headerLink}
          >
            Кімнати
          </Typography>
          {!profile.username && (
            <>
              <Typography
                component={Link}
                href="/auth"
                color="primary"
                className={css.headerLink}
                marginLeft={"5em"}
              >
                Увійти
              </Typography>
            </>
          )}
        </nav>
        {profile.username && (
          <>
            <Typography
              component={"p"}
              color="primary"
              className={css.headerUsername}
              marginLeft={"5em"}
              marginRight={"1em"}
            >
              {profile.username}
            </Typography>
            <IoLogOutOutline
              onClick={handleLogout}
              color="var(--primary-color)"
              size={"1.8rem"}
            />
          </>
        )}
      </Container>
    </header>
  );
};

export default Header;
