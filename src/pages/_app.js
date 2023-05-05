import "@/styles/globals.css";
import { Header } from "@/components/Header/Header";
import { BuyerListProvider } from "@/contexts/buyerContext";
import { createContext, useState } from "react";

export const DashboardContext = createContext();
export const DashboardSetContext = createContext();

export default function App({ Component, pageProps }) {
  const [dashboardBuyers, setDashboardBuyers] = useState([]);

  return (
    <>
      <DashboardContext.Provider value={dashboardBuyers}>
        <DashboardSetContext.Provider value={setDashboardBuyers}>
          <Header />

          <BuyerListProvider>
            <main>
              <Component {...pageProps} />
            </main>
          </BuyerListProvider>
        </DashboardSetContext.Provider>
      </DashboardContext.Provider>
    </>
  );
}
