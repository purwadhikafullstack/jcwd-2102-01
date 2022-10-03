import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import rootReducer from "../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import store from "../redux/store";
import AuthProvider from "../components/AuthProvider";
import "swiper/css/bundle";

function MyApp({ Component, pageProps }) {
 return (
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp