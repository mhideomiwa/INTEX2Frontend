import React from 'react';

import {default as Layout} from './layout';
import {StateContext} from "../../context/StateContext";
import {Toaster} from 'react-hot-toast'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function App({ Component, pageProps }) {
  return (
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
  )
}

//Create post route for fraud model 

export default App