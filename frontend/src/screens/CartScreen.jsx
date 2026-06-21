import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Message from "../Components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const updateQty = (item, delta) => {
    const newQty = item.qty + delta;
    if (newQty < 1 || newQty > item.countInStock) return;
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  const checkoutHandler = () => navigate("/login?redirect=/shipping");

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className="fw-bold">€{item.price}</Col>
                  <Col md={3}>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => updateQty(item, -1)}
                        disabled={item.qty <= 1}
                        style={{ width: 30, height: 30, padding: 0 }}
                      >
                        <FaMinus size={10} />
                      </Button>
                      <span style={{ minWidth: 20, textAlign: "center", fontWeight: 600 }}>
                        {item.qty}
                      </span>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => updateQty(item, 1)}
                        disabled={item.qty >= item.countInStock}
                        style={{ width: 30, height: 30, padding: 0 }}
                      >
                        <FaPlus size={10} />
                      </Button>
                    </div>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              <span className="fw-bold fs-5">
                €{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block w-100"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
