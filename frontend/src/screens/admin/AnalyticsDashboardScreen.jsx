import { useState, useRef } from "react";
import { Row, Col, Card, Table, Badge, Button, Form, InputGroup } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import {
  FaMousePointer,
  FaShoppingBag,
  FaEuroSign,
  FaPercent,
  FaSyncAlt,
  FaGlobe,
  FaBullhorn,
} from "react-icons/fa";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { useGetAnalyticsSummaryQuery, useTriggerSyncMutation } from "../../slices/analyticsApiSlice";
import { toast } from "react-toastify";

const PLATFORM_COLORS = {
  Instagram: "#C13584",
  TikTok: "#69C9D0",
  YouTube: "#FF0000",
  Facebook: "#1877F2",
};

const KpiCard = ({ icon, label, value, sub, color }) => (
  <Card className="h-100 border-0 shadow-sm">
    <Card.Body className="d-flex align-items-center gap-3">
      <div
        style={{
          background: color,
          borderRadius: "12px",
          width: 52,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div className="text-muted small">{label}</div>
        <div className="fw-bold fs-4">{value}</div>
        {sub && (
          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
            {sub}
          </div>
        )}
      </div>
    </Card.Body>
  </Card>
);

const SectionTitle = ({ children }) => (
  <h6 className="text-uppercase text-muted fw-semibold mb-3 mt-4" style={{ letterSpacing: "0.08em" }}>
    {children}
  </h6>
);

const PRESETS = [
  { label: "All time", days: null },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

const AnalyticsDashboardScreen = () => {
  const [preset, setPreset] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [appliedRange, setAppliedRange] = useState({ from: "", to: "" });
  const debounceRef = useRef(null);

  const handleDateChange = (field, value) => {
    const next = field === "from" ? { from: value, to } : { from, to: value };
    if (field === "from") setFrom(value); else setTo(value);
    setPreset(null);
    clearTimeout(debounceRef.current);
    if (next.from && next.to) {
      debounceRef.current = setTimeout(() => setAppliedRange(next), 600);
    }
  };

  const queryParams = preset
    ? { from: new Date(Date.now() - preset * 86400000).toISOString(), to: new Date().toISOString() }
    : appliedRange.from && appliedRange.to
    ? { from: new Date(appliedRange.from).toISOString(), to: new Date(appliedRange.to + "T23:59:59").toISOString() }
    : {};

  const { data, isLoading, error, refetch } = useGetAnalyticsSummaryQuery(queryParams);
  const [triggerSync, { isLoading: isSyncing }] = useTriggerSyncMutation();

  const handleSync = async () => {
    try {
      const result = await triggerSync().unwrap();
      toast.success(`Sync complete — ${result.updated} campaigns updated`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Sync failed");
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || "Failed to load analytics"}
      </Message>
    );

  const { campaign, direct, overall, byPlatform, campaigns } = data;

  const campaignConvRate =
    campaign.totalClicks > 0
      ? ((campaign.totalConversions / campaign.totalClicks) * 100).toFixed(1)
      : "0.0";

  const totalVisits = campaign.totalClicks + direct.directVisits;
  const totalConversions = campaign.totalConversions + direct.directConversions;
  const totalRevenue = overall.totalRevenue || campaign.totalRevenue + direct.directRevenue;

  const chartData = byPlatform.map((p) => ({
    platform: p._id,
    Revenue: parseFloat(p.revenue.toFixed(2)),
    Clicks: p.clicks,
    Conversions: p.conversions,
  }));

  const attributionData = [
    { name: "Campaign", value: parseFloat(campaign.totalRevenue.toFixed(2)), color: "#0d6efd" },
    { name: "Direct", value: parseFloat(direct.directRevenue.toFixed(2)), color: "#198754" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h2 className="mb-0">Analytics Dashboard</h2>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleSync}
          disabled={isSyncing}
        >
          <FaSyncAlt className="me-2" />
          {isSyncing ? "Syncing..." : "Sync Instagram"}
        </Button>
      </div>
      <p className="text-muted mb-2">Social media campaign performance</p>

      {/* Date filter */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="py-2">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {PRESETS.map((p) => (
              <Button
                key={p.label}
                size="sm"
                variant={preset === p.days ? "dark" : "outline-secondary"}
                onClick={() => { setPreset(p.days); setFrom(""); setTo(""); }}
              >
                {p.label}
              </Button>
            ))}
            <div className="ms-auto d-flex align-items-center gap-2">
              <Form.Control
                type="date"
                size="sm"
                value={from}
                onChange={(e) => handleDateChange("from", e.target.value)}
                style={{ width: 150 }}
              />
              <span className="text-muted small">to</span>
              <Form.Control
                type="date"
                size="sm"
                value={to}
                onChange={(e) => handleDateChange("to", e.target.value)}
                style={{ width: 150 }}
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Campaign KPIs */}
      <SectionTitle><FaBullhorn className="me-2" />Campaign Traffic</SectionTitle>
      <Row className="g-3 mb-2">
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaMousePointer color="#fff" size={20} />}
            label="Campaign Clicks"
            value={campaign.totalClicks.toLocaleString()}
            sub="from tracking links"
            color="#0d6efd"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaShoppingBag color="#fff" size={20} />}
            label="Campaign Conversions"
            value={campaign.totalConversions.toLocaleString()}
            sub="orders via campaigns"
            color="#6610f2"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaEuroSign color="#fff" size={20} />}
            label="Campaign Revenue"
            value={`€${campaign.totalRevenue.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            sub="attributed to campaigns"
            color="#fd7e14"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaPercent color="#fff" size={20} />}
            label="Conv. Rate"
            value={`${campaignConvRate}%`}
            sub="clicks → purchases"
            color="#6f42c1"
          />
        </Col>
      </Row>

      {/* Direct KPIs */}
      <SectionTitle><FaGlobe className="me-2" />Direct Traffic</SectionTitle>
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaMousePointer color="#fff" size={20} />}
            label="Direct Visits"
            value={direct.directVisits.toLocaleString()}
            sub="without campaign link"
            color="#20c997"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaShoppingBag color="#fff" size={20} />}
            label="Direct Conversions"
            value={direct.directConversions.toLocaleString()}
            sub="orders without campaign"
            color="#198754"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaEuroSign color="#fff" size={20} />}
            label="Direct Revenue"
            value={`€${direct.directRevenue.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            sub="without social media"
            color="#0dcaf0"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaEuroSign color="#fff" size={20} />}
            label="Total Revenue"
            value={`€${totalRevenue.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            sub={`${overall.totalOrders || totalConversions} total orders`}
            color="#212529"
          />
        </Col>
      </Row>

      {/* Charts row */}
      <Row className="g-3 mb-4">
        <Col md={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-3">Revenue by Platform</Card.Title>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="platform" />
                  <YAxis tickFormatter={(v) => `€${v}`} />
                  <Tooltip formatter={(value, name) => name === "Revenue" ? `€${value}` : value} />
                  <Bar dataKey="Revenue" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.platform}
                        fill={PLATFORM_COLORS[entry.platform] || "#6c757d"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-3">Revenue Attribution</Card.Title>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={attributionData}
                    cx="50%"
                    cy="45%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {attributionData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(v) => `€${v.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Campaign Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">Campaign Breakdown</Card.Title>
          {campaigns.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <FaBullhorn size={32} className="mb-3 opacity-25" />
              <p className="mb-0">No campaigns found for the selected period.<br />Create one from <strong>Admin → Create Campaign</strong>.</p>
            </div>
          ) : (
          <Table responsive hover className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Platform</th>
                <th>Product</th>
                <th>Niche</th>
                <th>Style</th>
                <th className="text-center">Views</th>
                <th className="text-center">Likes</th>
                <th className="text-center">Shares</th>
                <th className="text-center">Clicks</th>
                <th className="text-center">Conv.</th>
                <th className="text-end">Revenue</th>
                <th className="text-end">Cost</th>
                <th className="text-center">ROI</th>
                <th className="text-center">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const rate =
                  c.clicks > 0
                    ? ((c.conversions / c.clicks) * 100).toFixed(1)
                    : "0.0";
                const roi =
                  c.cost > 0
                    ? (((c.totalRevenue - c.cost) / c.cost) * 100).toFixed(0)
                    : null;
                return (
                  <tr key={c._id}>
                    <td>
                      <Badge
                        style={{
                          background: PLATFORM_COLORS[c.source] || "#6c757d",
                          fontSize: "0.75rem",
                        }}
                      >
                        {c.source}
                      </Badge>
                    </td>
                    <td>
                      {c.product ? (
                        <span className="fw-medium">{c.product.name}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="text-muted small">{c.niche}</td>
                    <td className="text-muted small">{c.contentStyle}</td>
                    <td className="text-center text-muted">{c.views.toLocaleString()}</td>
                    <td className="text-center text-muted">{c.likes.toLocaleString()}</td>
                    <td className="text-center text-muted">{c.shares.toLocaleString()}</td>
                    <td className="text-center">{c.clicks.toLocaleString()}</td>
                    <td className="text-center">{c.conversions}</td>
                    <td className="text-end fw-medium">
                      €{c.totalRevenue.toFixed(2)}
                    </td>
                    <td className="text-end text-muted small">
                      {c.cost > 0 ? `€${c.cost.toFixed(2)}` : "—"}
                    </td>
                    <td className="text-center">
                      {roi !== null ? (
                        <Badge bg={parseInt(roi) >= 0 ? "success" : "danger"}>
                          {roi}%
                        </Badge>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="text-center">
                      <Badge
                        bg={
                          parseFloat(rate) >= 2
                            ? "success"
                            : parseFloat(rate) >= 1
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {rate}%
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default AnalyticsDashboardScreen;
