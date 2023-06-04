import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <br />
      <h1>Страница не существует</h1>
      <p className={styles["main-text"]}>
        Данная страница была удалена или никогда не существовала
      </p>
    </div>
  );
};

export default NotFoundBlock;
