"use client";
import { FurnitureInfo } from "@/types/Furniture-type";
import css from "./FurnitureCard.module.scss";
import Image from "next/image";

const FurnitureCard = ({
  handleSelect,
  data,
}: {
  handleSelect: () => void;
  data: FurnitureInfo;
}) => {
  return (
    <li className={css.card} onClick={handleSelect}>
      <figure className={css.cardImgWrapper}>
        <div>
          <Image
            className={css.cardThumb}
            src={data.image}
            alt={`Іконка ${data.title}`}
          />
        </div>
        <figcaption className={css.cardSubtext}>
          {data.size.width}⨯{data.size.height}
        </figcaption>
      </figure>
      <div className={css.cardTextWrapper}>
        <h4 className={css.cardTitle}>{data.title}</h4>
        <p className={css.cardDescription}>{data.description}</p>
      </div>
    </li>
  );
};

export default FurnitureCard;
