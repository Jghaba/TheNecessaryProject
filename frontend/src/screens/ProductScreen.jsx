import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Form, Row, Col, Image, ListGroup, Card, Button, Badge, Breadcrumb,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Rating from "../Components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetRelatedProductsQuery,
} from "../slices/productsApiSlice";
import { useGetWishlistQuery, useToggleWishlistMutation } from "../slices/usersApiSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { addToCart } from "../slices/cartSlice";
import Meta from "../Components/Meta";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const { data: related } = useGetRelatedProductsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);

  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !userInfo });
  const [toggleWishlist] = useToggleWishlistMutation();

  const isWishlisted = wishlist?.some((p) => p._id === productId);

  const handleWishlist = async () => {
    if (!userInfo) { navigate("/login"); return; }
    try {
      await toggleWishlist(productId).unwrap();
    } catch (err) {
      toast.error("Could not update wishlist");
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Breadcrumb className="mt-2">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{product?.name || "Product"}</Breadcrumb.Item>
      </Breadcrumb>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid style={{ borderRadius: 8 }} />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="mb-0">{product.name}</h3>
                    <Button
                      variant="link"
                      className="p-0 ms-2"
                      onClick={handleWishlist}
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {isWishlisted
                        ? <FaHeart color="#dc3545" size={22} />
                        : <FaRegHeart color="#adb5bd" size={22} />}
                    </Button>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold fs-5">€{product.price}</span>
                </ListGroup.Item>
                <ListGroup.Item className="text-muted">{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>€{product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Out of Stock</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block w-100"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {related && related.length > 0 && (
            <Row className="mt-5">
              <Col>
                <h4 className="mb-3">You Might Also Like</h4>
                <Row className="g-3">
                  {related.map((p) => (
                    <Col key={p._id} xs={6} md={3}>
                      <Card
                        className="h-100 border-0 shadow-sm"
                        as={Link}
                        to={`/product/${p._id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      >
                        <Card.Img
                          variant="top"
                          src={p.image}
                          alt={p.name}
                          style={{ height: 160, objectFit: "cover" }}
                        />
                        <Card.Body className="p-2">
                          <div className="small fw-semibold text-truncate">{p.name}</div>
                          <div className="small text-muted">€{p.price}</div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          )}

          <Row className="mt-4">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews yet</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p className="text-muted small mb-1">{review.createdAt.substring(0, 10)}</p>
                    <p className="mb-0">{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {loadingProductReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button disabled={loadingProductReview} type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
