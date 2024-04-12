import {Inter} from "next/font/google";
// import dummyData from "../../dummydata/dummydata.json";
import Link from "next/link";
import {BlockItem, CarouselItem} from "../../components";

const inter = Inter({ subsets: ["latin"] });
const userId = null;

const Home = ({ topProducts, recProducts }) => {

  return (
    <div>
      {/*Swiper Banner*/}
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="swiper-slide">
              <div
                className="image image--overlay"
                style={{ backgroundImage: "url(assets/images/beatles.jpg)" }}
              ></div>
              <div className="container">
                <div className="row align-items-end vh-120">
                  <div
                    className="col-lg-8 text-white"
                    data-swiper-parallax-x="-100%"
                  >
                    <span className="eyebrow">New Additions</span>
                    <h1>What's your next set?</h1>
                    <Link href="/products" className="btn btn-outline-white">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Carousel*/}
      <section className="no-overflow py-5">
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="level-1">
                <span className="eyebrow text-muted">Hot Products</span>
                <h2>Top Sellers</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="carouselContainer">
                {/* Render each product using the CarouselItem component */}
                {topProducts?.map((product) => (
                  <div className="carouselItem">
                    <CarouselItem item={product} key={product.productId} />
                  </div>
                ))}
                {/*console.log(topProducts);*/}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Swiper Banner*/}
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="swiper-slide">
              <div
                className="image image--overlay"
                style={{
                  backgroundImage: "url(assets/images/legocommunity.jpg)",
                }}
              ></div>
              <div className="container">
                <div className="row align-items-end vh-120">
                  <div
                    className="col-lg-8 text-white"
                    data-swiper-parallax-x="-100%"
                  >
                    <h1>Learn About Our Community of Builders</h1>
                    <Link href="/aboutus" className="btn btn-outline-white">
                      About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Blocks*/}
      <section>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-8 col-md-6">
              <br />
              <br />
              <span className="eyebrow text-muted">Personalized Picks</span>
              <h2>Recommended For You</h2>
            </div>
          </div>
          <div className="row gutter-1">
            {/* Render each product using the blockItem component */}
            {recProducts.map((product) => (
              <BlockItem item={product} key={product.productId} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getStaticProps() {

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const res = await 
    fetch(process.env.API_URI + "/api/Home/GetAllProducts");
  if(userId) {
    const res2 = await
        fetch(process.env.API_URI + "/api/Home/GetOneUserCollab?userId=" + userId);
  }
  const allProducts = await res.json();
  const topProducts = allProducts.slice(0, 3);

  let recProducts = allProducts.slice(4, 12);
  if(userId) {
    recProducts = await res2.json();
  }




  return {
    props: {
      topProducts: topProducts,
      recProducts: recProducts,
    },
  };
}

export default Home;
