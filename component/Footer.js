import styles from "../styles/Footer.module.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer>
        <div className={styles.footer_info}>
          <p>{`© Pokedex  ${year}`} </p>
          <p>Created by : Sameer Begh A</p>
          <p>Contact Email : sameerbegha@gmail.com</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
