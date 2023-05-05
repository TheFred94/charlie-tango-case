// In summary, this code defines a Buyers component that displays a list of potential buyers and a button to proceed to the contact page. It retrieves the data for the page from an external API using getServerSideProps. The component also sets the query parameters to the estate information when it mounts using the dispatch function obtained from the DistpatchContext. The component also retrieves the buyersList from the BuyerContext. It renders the Buyer component for each buyer in the data array. Finally, it renders a button linking to the contact page with the number of buyers in the buyersList.

// Importing required modules and components
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Buyers.module.css";
import Buyer from "@/components/Buyer";
import { useEffect } from "react";
import { BuyerContext, DistpatchContext } from "@/contexts/buyerContext";
import { useContext } from "react";

export default function Buyers({ data }) {
  const dispatch = useContext(DistpatchContext); // Get the dispatch function from the DistpatchContext
  const { query } = useRouter(); // Get the query parameters from the useRouter
  const { buyersList } = useContext(BuyerContext); // Get the buyersList from the BuyerContext

  // Set the query parameters to the estate information when the component mounts
  useEffect(() => {
    dispatch({
      action: "SET_ESTATE_INFO",
      payload: { ...query },
    });
  }, [dispatch, query]);

  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <div className="buyerList"></div>
        <h1 className={styles.headline}>Potential buyers</h1>

        <div className={styles.content}>
          {/* Debugging section */}
          {/* <h2>Query params:</h2>
          <pre>
            <code>{JSON.stringify({ ...state, ...query }, null, 2)}</code>
          </pre> */}

          <section className="buyerContainer">
            {/* Render the Buyer component for each buyer in the data array */}
            {data.map((buyer) => (
              <Buyer key={data.id} {...buyer} />
            ))}
            {/* Render a button linking to the contact page */}
            <Link className={styles.buttonContainer} href="/contact">
              <button className={styles.button}>
                Proceed ({buyersList.length})
              </button>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

// Get the data for the page from an external API
export async function getServerSideProps(context) {
  const api = `https://charlie-tango-case-oj89.vercel.app/api/find-buyers?price=${context.query.price}&propertySize=${context.query.minSize}&zipCode=${context.query.zipCode}&propertyType=${context.query.propertyType}`;
  const res = await fetch(api);
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
}
