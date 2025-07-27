import { Button, Typography } from "@mui/material";
import Container from "@/components/shared/layout/Container/Container";
import Image from "next/image";
import sofaImg from "../../../../public/hero/hero-sofa.png";
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
            >
              Створіть власну кімнату мрії
            </Typography>
            <Typography
              component="p"
              color="secondary"
              fontSize="1em"
              marginTop="0.8em"
              marginBottom="1.4em"
              maxWidth="600px"
            >
              Ти уявляєш, а ми допомагаємо створити. З нашим редактором ти можеш
              легко перетягувати меблі, комбінувати стилі, змінювати кольори
              стін і бачити, як усе оживає прямо на екрані
            </Typography>
            <Button variant="contained" LinkComponent={Link} href="/rooms">
              Створити
            </Button>
          </div>
          <Image src={sofaImg} alt="sofa" className={css.heroImg} />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
