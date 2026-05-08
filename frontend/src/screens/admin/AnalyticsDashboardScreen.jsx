import { Row, Col, Card, Table, Badge, Button } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaMousePointer, FaShoppingBag, FaEuroSign, FaPercent, FaSyncAlt } from "react-icons/fa";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { useGetAnalyticsSummaryQuery, useTriggerSyncMutation } from "../../slices/analyticsApiSlice";
import { toast } from "react-toastify";

const PLATFORM_COLORS = {
  Instagram: "#C13584",
  TikTok: "#010101",
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
        {sub && <div className="text-muted" style={{ fontSize: "0.75rem" }}>{sub}</div>}
      </div>
    </Card.Body>
  </Card>
);

const AnalyticsDashboardScreen = () => {
  const { data, isLoading, error, refetch } = useGetAnalyticsSummaryQuery();
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

  const { totals, byPlatform, campaigns } = data;

  const conversionRate =
    totals.totalClicks > 0
      ? ((totals.totalConversions / totals.totalClicks) * 100).toFixed(1)
      : "0.0";

  const chartData = byPlatform.map((p) => ({
    platform: p._id,
    Revenue: parseFloat(p.revenue.toFixed(2)),
    Clicks: p.clicks,
    Conversions: p.conversions,
  }));

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
          <FaSyncAlt className={isSyncing ? "me-2 spin" : "me-2"} />
          {isSyncing ? "Syncing..." : "Sync Instagram"}
        </Button>
      </div>
      <p className="text-muted mb-4">Social media campaign performance</p>

      {/* KPI Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaMousePointer color="#fff" size={20} />}
            label="Total Clicks"
            value={totals.totalClicks.toLocaleString()}
            sub="from tracking links"
            color="#0d6efd"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaShoppingBag color="#fff" size={20} />}
            label="Conversions"
            value={totals.totalConversions.toLocaleString()}
            sub="orders placed"
            color="#198754"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaEuroSign color="#fff" size={20} />}
            label="Total Revenue"
            value={`€${totals.totalRevenue.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            sub="attributed to campaigns"
            color="#fd7e14"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard
            icon={<FaPercent color="#fff" size={20} />}
            label="Conversion Rate"
            value={`${conversionRate}%`}
            sub="clicks → purchases"
            color="#6f42c1"
          />
        </Col>
      </Row>

      {/* Chart */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="mb-3">Revenue by Platform</Card.Title>
          <ResponsiveContainer width="100%" height={280}>
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

      {/* Campaign Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">Campaign Breakdown</Card.Title>
          <Table responsive hover className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Platform</th>
                <th>Product</th>
                <th>Niche</th>
                <th>Style</th>
                <th className="text-center">Clicks</th>
                <th className="text-center">Conv.</th>
                <th className="text-end">Revenue</th>
                <th className="text-center">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const rate =
                  c.clicks > 0
                    ? ((c.conversions / c.clicks) * 100).toFixed(1)
                    : "0.0";
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
                    <td className="text-center">{c.clicks.toLocaleString()}</td>
                    <td className="text-center">{c.conversions}</td>
                    <td className="text-end fw-medium">
                      €{c.totalRevenue.toFixed(2)}
                    </td>
                    <td className="text-center">
                      <Badge
                        bg={parseFloat(rate) >= 2 ? "success" : parseFloat(rate) >= 1 ? "warning" : "secondary"}
                      >
                        {rate}%
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default AnalyticsDashboardScreen;
