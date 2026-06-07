import { Link } from 'react-router-dom';
import {
  BarChart3, Users, Clock, TrendingUp, Shirt,
  LayoutDashboard, Package, PieChart, ArrowLeft, Sparkles,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  summaryCards,
  tryOnVolumeData,
  deviceData,
  userBreakdownData,
  productPerformance,
} from '../../data/analytics';
import styles from './Admin.module.css';

/* Register Chart.js components */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ICON_MAP = {
  Shirt: <Shirt size={20} />,
  Users: <Users size={20} />,
  Clock: <Clock size={20} />,
  TrendingUp: <TrendingUp size={20} />,
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#3F304D',
      titleFont: { family: 'Montserrat', size: 12 },
      bodyFont: { family: 'Montserrat', size: 13, weight: '600' },
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: { family: 'Montserrat', size: 11 },
        color: '#8A8A8A',
        maxTicksLimit: 8,
      },
    },
    y: {
      grid: { color: '#F0F0F0' },
      ticks: {
        font: { family: 'Montserrat', size: 11 },
        color: '#8A8A8A',
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { family: 'Montserrat', size: 12, weight: '500' },
        color: '#1C1C1C',
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: '#3F304D',
      titleFont: { family: 'Montserrat' },
      bodyFont: { family: 'Montserrat', weight: '600' },
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
      },
    },
  },
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { family: 'Montserrat', size: 12, weight: '500' },
        color: '#1C1C1C',
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: '#3F304D',
      titleFont: { family: 'Montserrat' },
      bodyFont: { family: 'Montserrat', weight: '600' },
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: { family: 'Montserrat', size: 11 },
        color: '#8A8A8A',
      },
    },
    y: {
      grid: { color: '#F0F0F0' },
      ticks: {
        font: { family: 'Montserrat', size: 11 },
        color: '#8A8A8A',
      },
    },
  },
};

export default function Admin() {
  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.sidebarLogo}>
          <span className={styles.sidebarLogoIcon}>
            <Sparkles size={20} />
          </span>
          TryOn
        </Link>

        <span className={styles.sidebarLabel}>Analytics</span>
        <nav className={styles.sidebarNav}>
          <button className={`${styles.sidebarLink} ${styles.active}`}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className={styles.sidebarLink}>
            <Package size={18} /> Products
          </button>
          <button className={styles.sidebarLink}>
            <Users size={18} /> Users
          </button>
          <button className={styles.sidebarLink}>
            <PieChart size={18} /> Reports
          </button>
        </nav>

        <div className={styles.sidebarSpacer} />

        <div className={styles.backLink}>
          <Link to="/" className={styles.sidebarLink}>
            <ArrowLeft size={18} /> Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Analytics Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Overview of virtual try-on performance and user engagement
          </p>
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryRow}>
          {summaryCards.map((card) => (
            <div key={card.id} className={styles.summaryCard} id={`summary-${card.id}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>{card.label}</span>
                <div className={styles.cardIcon}>
                  {ICON_MAP[card.icon] || <BarChart3 size={20} />}
                </div>
              </div>
              <div className={styles.cardValue}>{card.value}</div>
              <span className={`${styles.cardChange} ${styles[card.trend]}`}>
                {card.trend === 'up' ? '↑' : '↓'} {card.change}
                <span style={{ fontWeight: 400, marginLeft: 4 }}>vs last month</span>
              </span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className={styles.chartsGrid}>
          {/* Try-On Volume */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Try-On Volume</h3>
            <p className={styles.chartSubtitle}>Daily try-on sessions over the last 30 days</p>
            <div className={styles.chartWrap}>
              <Line data={tryOnVolumeData} options={lineOptions} />
            </div>
          </div>

          <div className={styles.chartsRow}>
            {/* Device Split */}
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Device Breakdown</h3>
              <p className={styles.chartSubtitle}>Sessions by device type</p>
              <div className={styles.chartWrapSmall}>
                <Doughnut data={deviceData} options={doughnutOptions} />
              </div>
            </div>

            {/* User Breakdown */}
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>User Breakdown</h3>
              <p className={styles.chartSubtitle}>New vs returning users by week</p>
              <div className={styles.chartWrapSmall}>
                <Bar data={userBreakdownData} options={barOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Product Performance Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 className={styles.chartTitle}>Product Performance</h3>
            <p className={styles.chartSubtitle}>Try-on counts and conversion rates by product</p>
          </div>
          <table className={styles.table} id="product-performance-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Try-Ons</th>
                <th>Conversion</th>
                <th>Last Tried</th>
              </tr>
            </thead>
            <tbody>
              {productPerformance.map((row, i) => (
                <tr key={i}>
                  <td className={styles.tableName}>{row.name}</td>
                  <td>
                    <span className={styles.tableBadge}>{row.category}</span>
                  </td>
                  <td>{row.tryOns.toLocaleString()}</td>
                  <td>
                    <div className={styles.convBar}>
                      <div className={styles.convBarTrack}>
                        <div
                          className={styles.convBarFill}
                          style={{ width: `${row.conversion}%` }}
                        />
                      </div>
                      {row.conversion}%
                    </div>
                  </td>
                  <td style={{ color: 'var(--gray-500)' }}>{row.lastTried}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
