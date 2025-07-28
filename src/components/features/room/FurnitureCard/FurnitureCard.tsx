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
        <div className={css.cardImgOverlay}>
          <div>
            <Image
              className={css.cardThumb}
              src={`/${data.tag}/${data.tag}0.png`}
              alt={`Іконка ${data.title}`}
              fill
            />
          </div>
        </div>
        <figcaption className={css.cardSubtext}>
          {data.sizes[0][0] / 50}⨯{data.sizes[0][1] / 50}
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
