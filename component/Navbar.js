import styles from "../styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav_bar}>
      <Link href={"/"}>
        <h1 className={styles.logo}>Pokedex</h1>
        </Link>
        <Link href={"/"}>
          <p> Home </p>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
