// pages/projects/stock-market-dashboard.jsx
// Enhanced Stock Market Dashboard: Dynamic, interval filtering, open search, fully client-side
// - Routing: /projects/stock-market-dashboard
// - Chart: Chart.js (react-chartjs-2)
// - All UI styled with Tailwind CSS
// - See inline comments for structure, debounce, and future API integration

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  CategoryScale,
  PointElement, // <-- Add this
  LineElement,  // <-- Add this
  Tooltip,
  Legend,
} from 'chart.js';
import {
  CandlestickController,
  CandlestickElement,
  OhlcElement,
} from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  PointElement, // <-- Register PointElement
  LineElement,  // <-- Register LineElement
  CandlestickController,
  CandlestickElement,
  OhlcElement,
  TimeScale,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

// --- Candle intervals supported ---
const INTERVALS = ['1m', '5m', '1h', '4h'];

// --- Helper: Map app intervals to API intervals ---
const API_INTERVALS = { '1m': '1min', '5m': '5min', '1h': '1h', '4h': '4h' };

// --- Fetch real stock data from Twelve Data API ---
async function fetchStockData(symbol, interval) {
  // Get API key from Vite env
  const apiKey = import.meta.env.VITE_TWELVE_DATA_API_KEY;
  const apiInterval = API_INTERVALS[interval] || '1h';
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${apiInterval}&outputsize=30&apikey=${apiKey}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (!json.values || json.status === 'error') {
      throw new Error(json.message || 'No data found');
    }
    // Parse timestamps and closing prices for chart
    const labels = json.values.map(v => v.datetime).reverse();
    const prices = json.values.map(v => parseFloat(v.close)).reverse();
    // Compute high, low, current price
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const currentPrice = prices[prices.length - 1];
    // Return data in the same structure as before
    return {
      prices,
      labels,
      raw: json, // Attach raw API response for candlestick chart
      financials: {
        price: currentPrice,
        high,
        low,
        range52w: 'N/A', // Not available in this endpoint
        pe: (10 + Math.random() * 40).toFixed(2), // Mocked
        marketCap: `${(Math.random() * 2 + 1).toFixed(2)}T`, // Mocked
        assets: `${(Math.random() * 500).toFixed(0)}B`, // Mocked
        liabilities: `${(Math.random() * 300).toFixed(0)}B`, // Mocked
        revenue: `${(Math.random() * 600).toFixed(0)}B`, // Mocked
      },
      news: [
        `${symbol} news headline 1 (integrate real news via Finnhub/NewsAPI)`,
        `${symbol} news headline 2`,
        `${symbol} news headline 3`,
      ],
    };
  } catch (err) {
    // Log error for debugging
    console.error('Stock API error:', err);
    throw err;
  }
}

// --- Transform API or mock data to candlestick format for Chart.js ---
function toCandleData(raw) {
  // If using real API, map the response to [{x, o, h, l, c}]
  // For Twelve Data, values: [{datetime, open, high, low, close}]
  if (!raw || !raw.values) return [];
  return raw.values.map(v => ({
    x: new Date(v.datetime), // Convert to Date object for Chart.js time scale
    o: parseFloat(v.open),
    h: parseFloat(v.high),
    l: parseFloat(v.low),
    c: parseFloat(v.close),
  })).reverse();
}

export default function StockMarketDashboard() {
  // --- Routing: This page is rendered at /projects/stock-market-dashboard via App.jsx/router ---

  // --- State for search, selected symbol, interval, data, loading, and error ---
  const [search, setSearch] = useState('AAPL');
  const [symbol, setSymbol] = useState('AAPL');
  const [interval, setInterval] = useState('1h');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef();

  // --- Debounce search input to avoid excessive fetches ---
  useEffect(() => {
    setError('');
    if (!search.match(/^[A-Z]{1,5}$/)) {
      setError('Enter a valid ticker (1-5 capital letters)');
      return;
    }
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSymbol(search);
      setLoading(false);
    }, 600);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  // --- Fetch real data when symbol or interval changes ---
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    fetchStockData(symbol, interval)
      .then(res => {
        if (!cancelled) setData(res);
      })
      .catch(err => {
        if (!cancelled) setError(err.message || 'Failed to fetch data');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [symbol, interval]);

  // --- Chart.js config ---
  const chartData = data ? {
    labels: data.labels,
    datasets: [
      {
        label: `${symbol} Price`,
        data: data.prices,
        fill: false,
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
        tension: 0.4,
      },
    ],
  } : { labels: [], datasets: [] };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    animation: { duration: 500 },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { color: '#64748b' },
        grid: { color: '#33415522' },
      },
      x: {
        ticks: { color: '#64748b' },
        grid: { color: '#33415522' },
      },
    },
  };
  // --- Chart.js config for line chart (simple price over time) ---
  const lineData = data ? {
    labels: data.labels,
    datasets: [
      {
        label: `${symbol} Price`,
        data: data.prices,
        fill: false,
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  } : { labels: [], datasets: [] };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    animation: { duration: 500 },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day', tooltipFormat: 'yyyy-MM-dd HH:mm' },
        grid: { color: '#e5e7eb' },
        ticks: { color: '#334155' },
        border: { color: '#e5e7eb' },
      },
      y: {
        beginAtZero: false,
        grid: { color: '#e5e7eb' },
        ticks: { color: '#334155' },
        border: { color: '#e5e7eb' },
      },
    },
    layout: { padding: 0 },
  };

  // --- Render ---
  return (
    <section className="min-h-screen w-full pt-28 px-4 max-w-5xl mx-auto">
      {/* Header and Back Link */}
      <div className="mb-8 flex items-center gap-4">
        <Link to="/projects" className="text-blue-600 underline">← Back to Projects</Link>
        <h1 className="text-3xl font-extrabold">Stock Market Dashboard</h1>
      </div>
      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value.toUpperCase())}
          placeholder="Enter stock ticker (e.g. AAPL)"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-64 text-center text-lg"
          maxLength={5}
          aria-label="Stock ticker search"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          {INTERVALS.map(i => (
            <button
              key={i}
              onClick={() => setInterval(i)}
              className={`px-3 py-2 rounded font-semibold border transition text-sm ${interval === i ? 'bg-blue-600 text-white border-blue-700' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
              aria-pressed={interval === i}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
      {error && (
        <div className="text-red-500 mb-4 font-semibold">{error}</div>
      )}
      {/* Chart and Financials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <div className="font-bold mb-2 text-gray-900">Price Chart</div>
          {loading ? (
            <div className="flex-1 flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center h-64 text-red-500 font-semibold">
              Failed to load chart data.
            </div>
          ) : (
            <Chart type="line" data={lineData} options={lineOptions} height={300} />
          )}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <div className="font-bold mb-2 text-gray-900">Key Financials</div>
          <div className="flex flex-col gap-1 text-gray-700">
            <div><span className="font-semibold">Current Price:</span> <span className="text-blue-600">${data?.financials?.price ?? '-'}</span></div>
            <div><span className="font-semibold">Day High/Low:</span> ${data?.financials?.high ?? '-'} / ${data?.financials?.low ?? '-'}</div>
            <div><span className="font-semibold">52W Range:</span> {data?.financials?.range52w ?? '-'}</div>
            <div><span className="font-semibold">P/E Ratio:</span> {data?.financials?.pe ?? '-'}</div>
            <div><span className="font-semibold">Market Cap:</span> {data?.financials?.marketCap ?? '-'}</div>
            <div><span className="font-semibold">Assets:</span> {data?.financials?.assets ?? '-'}</div>
            <div><span className="font-semibold">Liabilities:</span> {data?.financials?.liabilities ?? '-'}</div>
            <div><span className="font-semibold">Revenue:</span> {data?.financials?.revenue ?? '-'}</div>
          </div>
        </div>
      </div>
      {/* News Headlines */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
        <div className="font-bold mb-2 text-gray-900 dark:text-white">Latest News</div>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          {data?.news.map((headline, i) => (
            <li key={i}>{headline}</li>
          ))}
        </ul>
      </div>
      {/* Accessibility note and API swap info */}
      <div className="text-xs text-gray-400 mt-8">
        <p>All data is mocked for demo purposes. To use a real API, replace the getMockCandleData function and fetch from your provider in the useEffect above. The debounce logic for the search bar is in the first useEffect. Intervals are updated by clicking the buttons above the chart.</p>
      </div>
    </section>
  );
}
