import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "@/styles/Pokemon.module.css";
import Image from "next/image";
import Popup from "@/component/popup";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  const res = await client.query({
    query: gql`
      query pokemons {
        pokemons(first: 200) {
          id
        }
      }
    `,
  });

  const Curr = res.data.pokemons;
  const paths = Curr.map((current) => {
    return {
      params: {
        pokemon: current.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.pokemon;

  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
        query {
            pokemon(id: "${id}"){
              id
              number
              name
              weight{
                minimum
                maximum
              }
              height{
                minimum
                maximum
              }
              classification
              types
              resistant
              weaknesses
              fleeRate
              maxCP
              maxHP
              image
            }
          }
        `,
  });

  return {
    props: {
      data: response.data.pokemon,
    },
  };
}

const pokemon = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.pokemon_page}>
          <div className={styles.Img}>
            <h1 className={styles.name}>Name : {data.name}</h1>
            <Image
              src={data.image}
              width={400}
              height={400}
              className={styles.pokemon_Img}
              alt="Pokemon_img"
            ></Image>
            <button
              className={styles.btn}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <span className={styles.btn_span}>Evolutions</span>
            </button>
            <Popup
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              Id={data.id}
              Name={data.name}
              Type={data.types}
              Img={data.image}
              Num={data.number}
            />
          </div>
          <div className={styles.pokemon_box}>
            <div className={styles.pokemon_Info}>
              <ul className={styles.ul}>
                <li className={styles.margin_top_1}>
                  <p>Height </p>
                  <span className={styles.Span}>
                    
                    Minimum : {data.height.minimum}
                  </span>
                  <span className={styles.Span}>
                    
                    Maximum : {data.height.maximum}
                  </span>
                </li>
                <li className={styles.margin_top_1}>
                  <p>Weight </p>
                  <span className={styles.Span}>
                    Minimum : {data.weight.minimum}
                  </span>
                  <span className={styles.Span}>
                    Maximum : {data.weight.maximum}
                  </span>
                </li>
                <li className={styles.margin_top_1}>
                  <p>Classification</p>
                  <span className={styles.Span}>{data.classification}</span>
                </li>
              </ul>
            </div>

            <div className={styles.type}>
              <h3 className={styles.type_text}>Type</h3>
              <div className={styles.resistant_ul}>
                <span className={`${styles?.resistant_list} ${styles.color1}`}>
                  {data.types[0]}
                </span>
                {data?.types[1] ? (
                  <span
                    className={`${styles?.resistant_list} ${styles.color1}`}
                  >
                    {data.types[1]}
                  </span>
                ) : null}
              </div>
            </div>

            <div className={styles.resistant}>
              <h3 className={styles.type_text}>Resistant</h3>

              <ul className={styles.resistant_ul}>
                {data?.resistant.map((elem, index) => {
                  return (
                    <span className={styles?.resistant_list} key={index}>
                      {elem}
                    </span>
                  );
                })}
              </ul>
            </div>
            <div className={styles.resistant}>
              <h3 className={styles.type_text}>Weaknesses</h3>

              <ul className={styles.resistant_ul}>
                {data?.weaknesses.map((elem, index) => {
                  return (
                    <span
                      className={`${styles.resistant_list} ${styles.color2}`}
                      key={index}
                    >
                      {elem}
                    </span>
                  );
                })}
              </ul>
            </div>

            <Link href={"/"} style={{ textDecoration: "none" }}>
              <button className={styles.explore_more}>
                <span className={styles.explore_span}>
                  Explore More Pokemon
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default pokemon;
