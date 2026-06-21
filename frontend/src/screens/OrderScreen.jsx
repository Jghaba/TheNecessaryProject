import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { FaCheck, FaClipboardList, FaCreditCard, FaTruck } from "react-icons/fa";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";

const OrderStepper = ({ isPaid, isDelivered, paidAt, deliveredAt }) => {
  const steps = [
    { label: "Placed", icon: <FaClipboardList size={13} />, done: true, date: null },
    { label: "Paid", icon: <FaCreditCard size={13} />, done: isPaid, date: isPaid ? new Date(paidAt).toLocaleDateString() : null },
    { label: "Delivered", icon: <FaTruck size={13} />, done: isDelivered, date: isDelivered ? new Date(deliveredAt).toLocaleDateString() : null },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center mb-4 mt-2" style={{ gap: 0 }}>
      {steps.map((step, i) => (
        <div key={step.label} className="d-flex align-items-center" style={{ flex: i < steps.length - 1 ? 1 : "none" }}>
          <div className="d-flex flex-column align-items-center" style={{ minWidth: 72 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: step.done ? "#198754" : "#e9ecef",
                color: step.done ? "#fff" : "#adb5bd",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {step.done ? <FaCheck size={13} /> : step.icon}
            </div>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, color: step.done ? "#198754" : "#adb5bd", marginTop: 4 }}>
              {step.label}
            </div>
            {step.date && (
              <div style={{ fontSize: "0.65rem", color: "#6c757d" }}>{step.date}</div>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                background: step.done ? "#198754" : "#e9ecef",
                margin: "0 4px",
                marginBottom: 22,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "EUR" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  async function onApprove(data, actions) {
    try {
      await payOrder({ orderId, details: { id: data.orderID } }).unwrap();

      try {
        const source = JSON.parse(sessionStorage.getItem("analyticsSource") || "{}");
        if (source.type === "campaign" && source.campaignId) {
          await fetch(`/api/analytics/${source.campaignId}/convert`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ orderId }),
          });
        } else {
          await fetch("/api/analytics/direct-convert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ orderId }),
          });
        }
        sessionStorage.removeItem("analyticsSource");
        sessionStorage.removeItem("analyticsTracked");
      } catch (_) {}

      refetch();
      toast.success("Payment successful");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: Number(order.totalPrice).toFixed(2) } }],
      })
      .then((orderId) => orderId);
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1 className="mb-1">Order</h1>
      <p className="text-muted small mb-3" style={{ wordBreak: "break-all" }}>{order._id}</p>

      <OrderStepper
        isPaid={order.isPaid}
        isDelivered={order.isDelivered}
        paidAt={order.paidAt}
        deliveredAt={order.deliveredAt}
      />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: </strong>{order.user.email}</p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {new Date(order.deliveredAt).toLocaleString()}</Message>
              ) : (
                <Message variant="warning">Not yet delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method: </strong>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Paid on {new Date(order.paidAt).toLocaleString()}</Message>
              ) : (
                <Message variant="warning">Awaiting payment</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x €{item.price} = €{(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Items</Col><Col>€{(order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</Col></Row>
                <Row><Col>Shipping</Col><Col>€{Number(order.shippingPrice).toFixed(2)}</Col></Row>
                <Row><Col>Tax</Col><Col>€{Number(order.taxPrice).toFixed(2)}</Col></Row>
                <Row className="fw-bold"><Col>Total</Col><Col>€{Number(order.totalPrice).toFixed(2)}</Col></Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={deliverOrderHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
