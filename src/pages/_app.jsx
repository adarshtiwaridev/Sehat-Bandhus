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
    dispatch(fetchUser()); // Fetch logged-in user after Redux initializes
  }, [dispatch]);

  return (
    <>
      <Head>
        {/* Basic Meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* SEO Meta */}
        <title>Sehat Bandhus | Smart Healthcare & Doctor Appointments</title>
        <meta
          name="description"
          content="Sehat Bandhus is a modern healthcare platform to book doctor appointments, online consultations, video calls, and chat with trusted medical professionals."
        />
        <meta
          name="keywords"
          content="Sehat Bandhus, doctor appointment, online doctor consultation, healthcare startup, book doctor online, telemedicine India"
        />
        <meta name="author" content="Sehat Bandhus Team" />

        {/* Open Graph (Facebook / LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sehat Bandhus | Smart Healthcare Platform" />
        <meta
          property="og:description"
          content="Book appointments, consult doctors online, and manage your healthcare digitally with Sehat Bandhus."
        />
        <meta property="og:url" content="https://www.sehatbandhus.com" />
        <meta property="og:image" content="/assets/img/og-banner.png" />

        {/* Twitter Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sehat Bandhus | Smart Healthcare Platform" />
        <meta
          name="twitter:description"
          content="A next-gen healthcare startup offering doctor appointments, video consultations, and digital care."
        />
        <meta name="twitter:image" content="/assets/img/og-banner.png" />

        {/* Favicon */}
        <link rel="icon" href="/assets/img/favicon.png" />
      </Head>

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors closeButton />

      <Navbar />
      <Component {...pageProps} />
      <Footer />

      {/* Razorpay */}
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
