import { Button, Typography } from "@mui/material";
import Container from "@/components/shared/layout/Container/Container";
import Image from "next/image";
import sofaImg from "../../../../public/hero/s2.png";
import { FaArrowRightLong } from "react-icons/fa6";
import css from "./Hero.module.scss";
import Link from "next/link";

const Hero = () => {
  return (
    <section className={css.hero}>
      <Container>
        <div className={css.heroBox}>
          <div className={css.heroBlock}>
            <Typography
              variant="h1"
              component="h1"
              color="primary"
              fontSize="2.5em"
              marginBottom={"0.8em"}
              textAlign={"left"}
            >
              Створіть власну кімнату мрії
            </Typography>
            <Typography
              component="p"
              color="secondary"
              fontSize="1em"
              marginTop="0.8em"
              marginBottom="2em"
              maxWidth="600px"
              textAlign={"left"}
            >
              Ти уявляєш, а ми допомагаємо створити. З нашим редактором ти можеш
              легко перетягувати меблі, комбінувати стилі, змінювати кольори
              стін і бачити, як усе оживає прямо на екрані
            </Typography>
            <div className={css.heroBlock}>
              <Button
                variant="contained"
                LinkComponent={Link}
                href="/rooms"
                classes={css.heroBtn}
                endIcon={<FaArrowRightLong />}
                size="large"
              >
                Створити
              </Button>
            </div>
          </div>
          <Image src={sofaImg} alt="sofa" className={css.heroImg} />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
