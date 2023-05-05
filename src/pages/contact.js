// The Buyers function is the main component of the application. It imports several dependencies, including Head from next/head, useContext from react, Checkbox, Input, and InputNumber from antd, and Image from next/image.
// It also imports two contexts, BuyerContext and DistpatchContext, from @/contexts/buyerContext, which are used to manage the state of the form data and dispatch updates to it. The function renders a Head element, a wrapper with a h1 element and two divs, and a BuyersList component.
// It also renders an image of a real estate agent. The form data is handled by the ContactForm function, which is called by Buyers and renders a form with several Input and InputNumber fields and a Checkbox.
// The handleSubmit function handles the form submission by storing the form data in a variable, dispatching an action to update the form data, merging the form data with the existing query data, and submitting the data to a backend API using a fetch request. Finally, the function redirects the user to a "thank you" page.

import Head from "next/head";
import { BuyerContext, DistpatchContext } from "@/contexts/buyerContext";
import { useContext } from "react";
import styles from "./Home.module.css";
import BuyersList from "@/components/BuyersList";
import React from "react";
import { Checkbox, Input, InputNumber } from "antd";
import Image from "next/image";
import contactImage from "../assets/RE_agent.jpg";
import { useRouter } from "next/router";

export default function Buyers() {
  const state = useContext(BuyerContext);
  const query = useContext(BuyerContext);
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>

      <div className="wrapper">
        <h1 className={styles.headline}>Contact Info</h1>
        <div className={styles.content}>
          <div className="refList">
            <ContactForm {...query} {...state} />
            <BuyersList className="buyerList" />
            <Image
              className="contactImage"
              src={contactImage}
              alt="Real estate agent"
            />
          </div>
          <div className="contactForm"></div>
        </div>
      </div>
    </>
  );
}

export function ContactForm(query) {
  const dispatch = useContext(DistpatchContext);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    // Stores the form data in a variable
    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      checkbox: e.target.elements.checkbox.checked,
    };

    // Dispatches the action with the formData as the payload. This is to make sure that it happens before the data is submitted to Supabase, so the newly entered formData is send aswel.
    dispatch({
      action: "MERGE_CONTACT_INFO",
      payload: formData,
    });
    // Spreads out the ...query and the ...formData and merges them together without manually copying each field. buyersList is a json object.
    const payload = {
      ...query,
      ...formData,
      buyersList: query.buyersList,
    };

    console.log(payload);
    fetch("/api/addData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    router.push("/thankYou");
  }

  return (
    <div className="contactForm">
      <form method="GET" className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span className={styles.label}>Name</span>
          <Input className="inputs" name="name" required />
        </label>
        <label>
          <span className={styles.label}>E-mail</span>
          <Input className="inputs" name="email" required type="email" />
        </label>
        <label>
          <span className={styles.label}>Phone number</span>
          <InputNumber
            className="inputs"
            name="phone"
            required
            type="tel"
            maxLength={8}
          />
        </label>
        <Checkbox className={styles.checkBox} name="checkbox">
          <p>
            Yes please, EDC may contact me with offers and information related
            to the real estate market
          </p>
        </Checkbox>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

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
