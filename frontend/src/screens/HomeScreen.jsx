import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../Components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";

const HomeScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* show the number of elements reffering to the screen size */}
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
