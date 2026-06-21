import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../Components/Product";
import ProductSkeleton from "../Components/ProductSkeleton";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";
import ProductCarousel from "../Components/ProductCarousel";
import Meta from "../Components/Meta";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [sort, setSort] = useState("newest");

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber, sort });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            <h1 className="mb-0">Latest Products</h1>
          </div>
          <Row>
            {[...Array(8)].map((_, i) => (
              <Col key={i} sm={12} md={6} lg={4} xl={3}>
                <ProductSkeleton />
              </Col>
            ))}
          </Row>
        </>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta />
          <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            <h1 className="mb-0">Latest Products</h1>
            <Form.Select
              size="sm"
              style={{ width: 200 }}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Form.Select>
          </div>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword || ""} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
