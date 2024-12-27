import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Home;
