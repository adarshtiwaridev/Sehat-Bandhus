import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "../pages/styles/globals.css";
import Head from "next/head";
import { Toaster } from "sonner";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { fetchUser } from "@/redux/slices/authSlice";

// Child component to safely use Redux hooks
function AppWrapper({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser()); // fetch logged-in user after Redux is ready
  }, [dispatch]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="The responsive professional Doccure template offers many features, like scheduling appointments with top doctors, clinics, and hospitals via voice, video call & chat."
        />
        <meta
          name="keywords"
          content="practo clone, doccure, doctor appointment, Practo clone html template, doctor booking template"
        />
        <meta
          name="author"
          content="Practo Clone HTML Template - Doctor Booking Template"
        />

        {/* Open Graph */}
        <meta property="og:url" content="https://doccure.dreamstechnologies.com/html/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Doctors Appointment HTML Website Templates | Doccure" />
        <meta
          property="og:description"
          content="The responsive professional Doccure template offers many features, like scheduling appointments with top doctors, clinics, and hospitals via voice, video call & chat."
        />
        <meta property="og:image" content="/assets/img/preview-banner.jpg" />

        {/* Twitter Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://doccure.dreamstechnologies.com/html/" />
        <meta property="twitter:url" content="https://doccure.dreamstechnologies.com/html/" />
        <meta name="twitter:title" content="Doctors Appointment HTML Website Templates | Doccure" />
        <meta
          name="twitter:description"
          content="The responsive professional Doccure template offers many features, like scheduling appointments with top doctors, clinics, and hospitals via voice, video call & chat."
        />
        <meta name="twitter:image" content="/assets/img/preview-banner.jpg" />

        <title>Doccure</title>
        <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/x-icon" />
      </Head>

      {/* ✅ Toast container added */}
      <Toaster position="top-center" richColors closeButton />

      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

    </>
  );
}
export default function App(props) {
  return (
    <Provider store={store}>
      <AppWrapper {...props} />
    </Provider>
  );
}