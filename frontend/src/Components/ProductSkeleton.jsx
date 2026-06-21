import { Card, Placeholder } from "react-bootstrap";

const ProductSkeleton = () => (
  <Card className="my-3 p-3 rounded">
    <div style={{ height: 200, background: "#e9ecef", borderRadius: 4 }} />
    <Card.Body>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={8} />
      </Placeholder>
      <Placeholder as="p" animation="glow" className="mb-1">
        <Placeholder xs={4} />
      </Placeholder>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={3} />
      </Placeholder>
    </Card.Body>
  </Card>
);

export default ProductSkeleton;
