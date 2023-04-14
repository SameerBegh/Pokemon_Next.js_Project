import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
      query pokemons {
        pokemons(first: 200) {
          id
          number
          name
          types
          image
        }
      }
    `,
  });

  return {
    props: {
      data: response.data.pokemons,
    },
  };
}

function Home({ data }) {
  const [pokemons, setPokemons] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Pagination Logic
  const pokemon_lastIndex = currentPage * pokemonsPerPage;
  const pokemon_firstIndex = pokemon_lastIndex - pokemonsPerPage;

  const PokemonData = pokemons.slice(pokemon_firstIndex, pokemon_lastIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(pokemons.length / pokemonsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const pageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? styles.active_Page : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  // Pagination Button
  const previosPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <>
      <Head>
        <title>Pokedex/Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className={styles.pokemon_container}>
          {PokemonData?.map((poko) => {
            return (
              <div key={poko.id}>
                <Link href={`/${poko.id}`} className={styles.link}>
                  <div className={styles.pokemon_card}>
                    <Image
                      src={poko.image}
                      width={160}
                      height={160}
                      className={styles.pokemon_img}
                      alt="pokemon_img"
                    ></Image>
                    <h3 className={styles.pokemon_number}>{poko.number}</h3>
                    <h2 className={styles.pokemon_name}>{poko.name}</h2>
                    <div className={styles.pokemon_type}>
                      <div className={styles.type_1}>
                        <p>{poko.types[0]}</p>
                      </div>
                      {poko.types[1] ? (
                        <div className={styles.type_2}>
                          <p>{poko.types[1]}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className={styles.pagination}>
          <ul className={styles.numbers}>
            <li>
              <button
                className={`${styles.page_Button} ${
                  currentPage == pages[0] ? styles.btn_none : null
                }`}
                onClick={previosPage}
              >
                Previous
              </button>
            </li>
            {pageNumbers}
            <li>
              <button
                className={`${styles.page_Button} ${
                  currentPage == pages[pages.length - 1]
                    ? styles.btn_none
                    : null
                }`}
                onClick={nextPage}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Home;
