/* ---------- Analytics Mock Data ---------- */

export const summaryCards = [
  {
    id: 'total-tryons',
    label: 'Total Try-Ons',
    value: '12,847',
    change: '+18.2%',
    trend: 'up',
    icon: 'Shirt',
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: '3,421',
    change: '+12.5%',
    trend: 'up',
    icon: 'Users',
  },
  {
    id: 'avg-session',
    label: 'Avg. Session',
    value: '4m 32s',
    change: '+3.1%',
    trend: 'up',
    icon: 'Clock',
  },
  {
    id: 'conversion-rate',
    label: 'Conversion Rate',
    value: '23.5%',
    change: '-1.2%',
    trend: 'down',
    icon: 'TrendingUp',
  },
];

/* 30-day try-on volume */
export const tryOnVolumeData = {
  labels: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }),
  datasets: [
    {
      label: 'Try-Ons',
      data: [
        320, 380, 410, 390, 450, 480, 520, 490, 530, 560,
        510, 580, 620, 590, 640, 680, 710, 650, 690, 720,
        750, 700, 780, 810, 760, 830, 870, 850, 900, 920,
      ],
      borderColor: '#A363DF',
      backgroundColor: 'rgba(163, 99, 223, 0.1)',
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#A363DF',
      pointHoverBorderColor: '#FFFFFF',
      pointHoverBorderWidth: 2,
    },
  ],
};

/* Device breakdown */
export const deviceData = {
  labels: ['Mobile', 'Desktop', 'Tablet'],
  datasets: [
    {
      data: [62, 31, 7],
      backgroundColor: ['#A363DF', '#3F304D', '#C99EF0'],
      borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
      borderWidth: 3,
      hoverOffset: 8,
    },
  ],
};

/* User breakdown by week */
export const userBreakdownData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'New Users',
      data: [820, 960, 1100, 1250],
      backgroundColor: '#A363DF',
      borderRadius: 6,
      barThickness: 28,
    },
    {
      label: 'Returning Users',
      data: [450, 520, 580, 670],
      backgroundColor: '#3F304D',
      borderRadius: 6,
      barThickness: 28,
    },
  ],
};

/* Product performance table */
export const productPerformance = [
  { name: 'Velvet Blazer', category: 'Jackets', tryOns: 2340, conversion: 28.4, lastTried: '2 hours ago' },
  { name: 'Silk Wrap Dress', category: 'Dresses', tryOns: 1987, conversion: 32.1, lastTried: '15 min ago' },
  { name: 'Leather Jacket', category: 'Jackets', tryOns: 1756, conversion: 25.7, lastTried: '1 hour ago' },
  { name: 'Cocktail Dress', category: 'Dresses', tryOns: 1523, conversion: 35.8, lastTried: '30 min ago' },
  { name: 'Cashmere Sweater', category: 'Tops', tryOns: 1345, conversion: 22.3, lastTried: '3 hours ago' },
  { name: 'Designer Sunglasses', category: 'Accessories', tryOns: 1120, conversion: 19.6, lastTried: '45 min ago' },
  { name: 'Denim Jacket', category: 'Jackets', tryOns: 987, conversion: 21.4, lastTried: '5 hours ago' },
  { name: 'Floral Midi Skirt', category: 'Dresses', tryOns: 876, conversion: 26.9, lastTried: '2 hours ago' },
  { name: 'Oversized Hoodie', category: 'Tops', tryOns: 654, conversion: 18.2, lastTried: '1 day ago' },
  { name: 'Statement Necklace', category: 'Accessories', tryOns: 259, conversion: 15.1, lastTried: '6 hours ago' },
];
