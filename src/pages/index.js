import Head from "next/head";
import styles from "./Home.module.css";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import housePic from "../assets/hus.jpeg";

import { Input, InputNumber } from "antd";
import EstOption from "@/components/EstateOpt";

export default function Home() {
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>Find a buyer</h1>

        <div className={styles.content}>
          <div className={styles.formGrid}>
            <div className="grid_1">
              <h2>Estate infomation</h2>
              <p>Insert your estate information to find a match</p>
              <SellerEstateForm />
            </div>
            <div className="grid_2">
              <Image alt="house" src={housePic}></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SellerEstateForm() {
  const [rawPrice, setRawPrice] = useState(750000);
  const [rawSize, setRawSize] = useState(120);

  function onChangeSize(value) {
    setRawSize(value);
    // Pass the rawValue to the parent component
  }
  function onChange(value) {
    setRawPrice(value);
    // Pass the rawValue to the parent component
  }
  return (
    <form action="/buyers" method="GET" className={styles.form}>
      <input type="hidden" name="price" value={rawPrice}></input>
      <input type="hidden" name="minSize" value={rawSize}></input>
      <label>
        <span className={styles.label}>Price</span>
        <InputNumber
          className="inputs"
          placeholder="DKK 750.000"
          defaultValue=""
          formatter={(value) =>
            `DKK ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          }
          parser={(value) =>
            value.replace(/DKK\s?|(\.*)/g, "").replace(".", ",")
          }
          onChange={onChange}
        />
      </label>
      <label>
        <span className={styles.label}>Size in square metres</span>
        <InputNumber
          className="inputs"
          placeholder="m² 120"
          defaultValue=""
          formatter={(value) =>
            `m² ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          }
          parser={(value) =>
            value.replace(/m²\s?|(\.*)/g, "").replace(".", ",")
          }
          onChange={onChangeSize}
        />
      </label>
      <label>
        <span className={styles.label}>Zip Code</span>
        <Input
          placeholder="e.g. 2200"
          className="inputs"
          name="zipCode"
          required
        />
      </label>
      <label>
        <span className={styles.label}>Property type</span>
        <select className="inputs" id="selectInput" name="propertyType">
          <option value="" disabled selected>
            Please choose...
          </option>
          <EstOption />
        </select>
      </label>
      <button className={styles.button} type="submit">
        Proceed
      </button>
    </form>
  );
}
