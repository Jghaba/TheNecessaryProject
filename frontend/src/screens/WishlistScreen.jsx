import { Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useGetWishlistQuery, useToggleWishlistMutation } from "../slices/usersApiSlice";
import { addToCart } from "../slices/cartSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: wishlist, isLoading, error } = useGetWishlistQuery();
  const [toggleWishlist] = useToggleWishlistMutation();

  const handleRemove = async (productId) => {
    try {
      await toggleWishlist(productId).unwrap();
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Could not remove");
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate("/cart");
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">Could not load wishlist</Message>;

  return (
    <>
      <h2 className="mb-4">
        <FaHeart className="me-2 text-danger" />
        My Wishlist
      </h2>
      {wishlist.length === 0 ? (
        <Message>
          Your wishlist is empty. <Link to="/">Browse products</Link>
        </Message>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Link to={`/product/${product._id}`}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title as="div" className="flex-grow-1">
                    <Link to={`/product/${product._id}`} className="text-dark text-decoration-none">
                      {product.name}
                    </Link>
                  </Card.Title>
                  <div className="fw-bold mb-3">€{product.price}</div>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="dark"
                      className="flex-grow-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart className="me-1" /> Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleRemove(product._id)}
                      title="Remove from wishlist"
                    >
                      <FaHeart />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default WishlistScreen;
