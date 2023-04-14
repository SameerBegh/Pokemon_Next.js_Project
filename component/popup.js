import Modal from "react-modal";
import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Popup.module.css";
import Image from "next/image";
import Link from "next/link";

const Get_Evalution = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        evolutions {
          name
        }
        maxHP
        image
      }
    }
  }
`;

const Popup = ({ isOpen, setIsOpen, Name, Id, Type, Num, Img }) => {
  const { data, loading, error } = useQuery(Get_Evalution, {
    variables: { id: Id, name: Name },
  });
  if (loading) return;
  if (error) return <p>{error.message}</p>;

  const { pokemon } = data;

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "65%",
      height: "51%",
    },
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className={styles.popup}>
          <h1 className={styles.pop_title}>Evolutions</h1>
          <div className={styles.pop_close} onClick={() => setIsOpen(!isOpen)}>
            X
          </div>
        </div>

        <div className={styles.evolution}>
          <Link
            href={`/${Id}`}
            onClick={() => setIsOpen(!isOpen)}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <div className={styles.pop_box}>
              <Image
                src={Img}
                width={150}
                height={150}
                alt="img"
                className={styles.pop_img}
              ></Image>
              <h1 className={styles.pop_name}>
                {pokemon.name} <span>#{Num}</span>
              </h1>
              <div>
                <span className={styles.pop_type}>{Type[0]}</span>
                {Type[1] ? (
                  <span className={styles.pop_type1}>{Type[1]}</span>
                ) : null}
              </div>
            </div>
          </Link>
          {pokemon?.evolutions === null ? null : (
            <div className={styles.arrow}> </div>
          )}
          {pokemon.evolutions?.map((curr) => {
            return (
              <>
                <Link
                  href={`/${curr.id}`}
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={styles.pop_box} key={curr.id}>
                    <Image
                      src={curr.image}
                      width={150}
                      height={150}
                      alt="img"
                      className={styles.pop_img}
                    ></Image>
                    <h1 className={styles.pop_name}>
                      {curr.name} <span>#{curr.number}</span>
                    </h1>
                    <div>
                      <span className={styles.pop_type}>{curr.types[0]}</span>
                      {curr.types[1] ? (
                        <span className={styles.pop_type1}>
                          {curr.types[1]}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
                {curr.evolutions?.length && (
                  <div className={styles.arrow}> </div>
                )}
              </>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default Popup;
