import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApolloProvider } from "@apollo/client";
import { IntlProvider } from "react-intl";
import { getLanguage } from "./multiLanguage/helpers/useLanguage";
import en from "./multiLanguage/locales/en.json";
import fr from "./multiLanguage/locales/fr.json";
import {
  auth_system,
  cap_aggregator,
  subscription_module,
} from "./API/API_Links";
const messages = { en: en, fr: fr };
const language = getLanguage();
// eslint-disable-next-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ28taWZyYyIsImEiOiJja3E2bGdvb3QwaXM5MnZtbXN2eGtmaWgwIn0.llipq3Spc_PPA2bLjPwIPQ";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <IntlProvider locale={language} messages={messages[language]}>
      {" "}
      <ApolloProvider client={cap_aggregator}>
        <ApolloProvider client={auth_system}>
          <ApolloProvider client={subscription_module}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ApolloProvider>
        </ApolloProvider>
      </ApolloProvider>
    </IntlProvider>
  </React.StrictMode>
);
