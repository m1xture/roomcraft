import css from "./Header.module.scss";
import Container from "../Container/Container";
import Image from "next/image";
import Logo from "@/media/imgs/logo.png";
import { Typography } from "@mui/material";
import Link from "next/link";

const Header = () => {
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
            component="h2"
            color="primary"
            fontSize={"1em"}
          >
            Room <br /> craft
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
        </nav>
      </Container>
    </header>
  );
};

export default Header;
