import { useState } from "react";
import {
  Row, Col, Card, Form, Button, Badge, InputGroup, Image,
} from "react-bootstrap";
import {
  FaMagic, FaRocket, FaCopy, FaCheck, FaLink, FaInstagram,
  FaTiktok, FaYoutube, FaFacebook,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import {
  useGenerateContentMutation,
  useCreateCampaignMutation,
  useLinkPostMutation,
} from "../../slices/analyticsApiSlice";

const PLATFORMS = [
  { value: "Instagram", icon: <FaInstagram />, color: "#C13584" },
  { value: "TikTok", icon: <FaTiktok />, color: "#010101" },
  { value: "YouTube", icon: <FaYoutube />, color: "#FF0000" },
  { value: "Facebook", icon: <FaFacebook />, color: "#1877F2" },
];

const STYLES = ["Lifestyle", "Product Showcase", "Behind the Scenes", "Unboxing", "Street Style"];

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline-secondary" size="sm" onClick={handle}>
      {copied ? <FaCheck className="text-success" /> : <FaCopy />}
      {copied ? " Copied!" : " Copy"}
    </Button>
  );
};

const CreateCampaignScreen = () => {
  const [platform, setPlatform] = useState("Instagram");
  const [niche, setNiche] = useState("");
  const [contentStyle, setContentStyle] = useState("Lifestyle");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [generated, setGenerated] = useState(null);
  const [trackingUrl, setTrackingUrl] = useState(null);
  const [campaignId, setCampaignId] = useState(null);
  const [postUrl, setPostUrl] = useState("");
  const [postLinked, setPostLinked] = useState(false);
  const [cost, setCost] = useState("");

  const { data: productsData, isLoading: loadingProducts } = useGetProductsQuery({
    keyword: "",
    pageNumber: 1,
  });

  const [generateContent, { isLoading: isGenerating }] = useGenerateContentMutation();
  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
  const [linkPost, { isLoading: isLinking }] = useLinkPostMutation();

  const selectedProductObj = productsData?.products?.find(
    (p) => p._id === selectedProduct
  );

  const handleGenerate = async () => {
    if (!selectedProduct) return toast.error("Select a product");
    if (!niche.trim()) return toast.error("Enter a niche");

    try {
      const result = await generateContent({
        productName: selectedProductObj.name,
        productPrice: selectedProductObj.price,
        platform,
        niche,
        contentStyle,
      }).unwrap();
      setGenerated(result);
      setTrackingUrl(null);
      setCampaignId(null);
      setPostLinked(false);
      setPostUrl("");
    } catch (err) {
      toast.error(err?.data?.message || "Generation failed");
    }
  };

  const handleLinkPost = async () => {
    if (!postUrl.trim()) return toast.error("Paste the Instagram post URL");
    try {
      await linkPost({ campaignId, postUrl }).unwrap();
      setPostLinked(true);
      toast.success("Post linked — sync will now track views & likes");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid URL");
    }
  };

  const handleCreateCampaign = async () => {
    try {
      const result = await createCampaign({
        source: platform,
        niche,
        contentStyle,
        product: selectedProduct,
        cost: parseFloat(cost) || 0,
      }).unwrap();
      const url = `${window.location.origin}/?social_analytics_id=${result.campaignId}`;
      setTrackingUrl(url);
      setCampaignId(result.campaignId);
      toast.success("Campaign created!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create campaign");
    }
  };

  const activePlatform = PLATFORMS.find((p) => p.value === platform);

  return (
    <>
      <h2 className="mb-1">Create Campaign</h2>
      <p className="text-muted mb-4">Generate AI content and get a tracking link for your post</p>

      <Row className="g-4">
        {/* Left — Setup */}
        <Col lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h6 className="text-uppercase text-muted fw-semibold mb-3" style={{ letterSpacing: "0.08em" }}>
                Campaign Setup
              </h6>

              {/* Platform */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Platform</Form.Label>
                <div className="d-flex gap-2 flex-wrap">
                  {PLATFORMS.map((p) => (
                    <Button
                      key={p.value}
                      size="sm"
                      onClick={() => setPlatform(p.value)}
                      style={{
                        background: platform === p.value ? p.color : "transparent",
                        borderColor: p.color,
                        color: platform === p.value ? "#fff" : p.color,
                      }}
                    >
                      {p.icon} {p.value}
                    </Button>
                  ))}
                </div>
              </Form.Group>

              {/* Product */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Product</Form.Label>
                {loadingProducts ? (
                  <Loader />
                ) : (
                  <Form.Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="">Select a product...</option>
                    {productsData?.products?.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} — €{p.price}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>

              {/* Product preview */}
              {selectedProductObj && (
                <div className="d-flex align-items-center gap-3 p-2 mb-3 rounded" style={{ background: "#f8f9fa" }}>
                  <Image
                    src={selectedProductObj.image}
                    alt={selectedProductObj.name}
                    style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }}
                  />
                  <div>
                    <div className="fw-medium" style={{ fontSize: "0.9rem" }}>{selectedProductObj.name}</div>
                    <div className="text-muted small">€{selectedProductObj.price}</div>
                  </div>
                </div>
              )}

              {/* Niche */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Niche</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. streetwear, minimalist fashion, gym wear..."
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
              </Form.Group>

              {/* Estimated Cost */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Estimated Ad Cost (€)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 50.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
                <Form.Text className="text-muted">Used to calculate ROI in the dashboard.</Form.Text>
              </Form.Group>

              {/* Content Style */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Content Style</Form.Label>
                <Form.Select
                  value={contentStyle}
                  onChange={(e) => setContentStyle(e.target.value)}
                >
                  {STYLES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button
                className="w-100"
                onClick={handleGenerate}
                disabled={isGenerating}
                style={{ background: activePlatform?.color, border: "none" }}
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <><FaMagic className="me-2" />Generate with AI</>
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Right — Output */}
        <Col lg={7}>
          {isGenerating && (
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center py-5">
                <Loader />
                <p className="text-muted mt-3">AI is generating your content...</p>
              </Card.Body>
            </Card>
          )}

          {generated && !isGenerating && (
            <div className="d-flex flex-column gap-3">
              {/* Caption */}
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-semibold mb-0">
                      <Badge style={{ background: activePlatform?.color }} className="me-2">
                        {platform}
                      </Badge>
                      Caption
                    </h6>
                    <CopyButton text={generated.caption} />
                  </div>
                  <div
                    className="p-3 rounded"
                    style={{
                      background: "#f8f9fa",
                      whiteSpace: "pre-wrap",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {generated.caption}
                  </div>
                </Card.Body>
              </Card>

              {/* Runway ML Prompt */}
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-semibold mb-0">Runway ML Video Prompt</h6>
                    <CopyButton text={generated.videoPrompt} />
                  </div>
                  <div
                    className="p-3 rounded"
                    style={{
                      background: "#f8f9fa",
                      whiteSpace: "pre-wrap",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {generated.videoPrompt}
                  </div>
                  <p className="text-muted small mt-2 mb-0">
                    Upload the product image on <strong>runwayml.com</strong> and paste this prompt to generate your video.
                  </p>
                </Card.Body>
              </Card>

              {/* Create Campaign */}
              {!trackingUrl ? (
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleCreateCampaign}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    "Creating..."
                  ) : (
                    <><FaRocket className="me-2" />Create Campaign & Get Tracking Link</>
                  )}
                </Button>
              ) : (
                <Card className="border-0 shadow-sm border-start border-success border-4">
                  <Card.Body>
                    <h6 className="fw-semibold text-success mb-2">
                      <FaLink className="me-2" />Tracking Link Ready
                    </h6>
                    <InputGroup>
                      <Form.Control
                        readOnly
                        value={trackingUrl}
                        style={{ fontSize: "0.85rem" }}
                      />
                      <CopyButton text={trackingUrl} />
                    </InputGroup>
                    <p className="text-muted small mt-2 mb-0">
                      Put this link in your bio or story. Every click and purchase will be tracked in the Analytics Dashboard.
                    </p>
                  </Card.Body>
                </Card>
              )}

              {/* Link Instagram Post */}
              {trackingUrl && (
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h6 className="fw-semibold mb-1">
                      <FaInstagram className="me-2 text-danger" />
                      Link Instagram Post (optional)
                    </h6>
                    <p className="text-muted small mb-3">
                      After posting, paste the post URL here to track views, likes & shares via sync.
                    </p>
                    {postLinked ? (
                      <div className="text-success fw-medium">
                        <FaCheck className="me-2" />Post linked — sync will update metrics automatically.
                      </div>
                    ) : (
                      <InputGroup>
                        <Form.Control
                          placeholder="https://www.instagram.com/p/..."
                          value={postUrl}
                          onChange={(e) => setPostUrl(e.target.value)}
                          style={{ fontSize: "0.85rem" }}
                        />
                        <Button
                          variant="outline-danger"
                          onClick={handleLinkPost}
                          disabled={isLinking}
                        >
                          {isLinking ? "Linking..." : "Link Post"}
                        </Button>
                      </InputGroup>
                    )}
                  </Card.Body>
                </Card>
              )}
            </div>
          )}

          {!generated && !isGenerating && (
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center py-5 text-muted">
                <FaMagic size={40} className="mb-3 opacity-25" />
                <p className="mb-0">Fill in the details and click<br /><strong>Generate with AI</strong> to get your caption and video prompt.</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CreateCampaignScreen;
