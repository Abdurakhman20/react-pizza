import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
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
