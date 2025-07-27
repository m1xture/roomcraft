import RoomCanvas from "@/components/features/room/RoomCanvas/RoomCanvas";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Header from "@/components/shared/layout/Header/Header";
import Hero from "@/components/widgets/Hero/Hero";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <h1>Hello78978978789789798798</h1>
        <Typography variant="h2" component="h1" color="primary">
          Hello
        </Typography>
        <Button variant="contained" color="secondary">
          Test
        </Button> */}
        {/* <RoomCanvas /> */}
      </main>
    </>
  );
};

export default Home;
