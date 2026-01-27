import type { Settlement } from "@/lib/types/settlement";

export const mockSettlements: Settlement[] = [
  {
    id: "stl_001",
    merchantId: "mch_001",
    merchantName: "TechGadgets Inc",
    period: {
      start: "2024-03-19T00:00:00Z",
      end: "2024-03-19T23:59:59Z",
    },
    totalVolume: 15420.5,
    totalFees: 77.1,
    netAmount: 15343.4,
    transactionCount: 42,
    currency: "USD",
    status: "completed",
    createdAt: "2024-03-20T01:00:00Z",
    completedAt: "2024-03-20T08:00:00Z",
    breakdown: [
      { chain: "ethereum", volume: 10000.0, count: 25 },
      { chain: "polygon", volume: 5420.5, count: 17 },
    ],
  },
  {
    id: "stl_002",
    merchantId: "mch_002",
    merchantName: "Fashion Forward Ltd",
    period: {
      start: "2024-03-13T00:00:00Z",
      end: "2024-03-19T23:59:59Z",
    },
    totalVolume: 42500.0,
    totalFees: 212.5,
    netAmount: 42287.5,
    transactionCount: 156,
    currency: "GBP",
    status: "completed",
    createdAt: "2024-03-20T02:00:00Z",
    completedAt: "2024-03-20T10:00:00Z",
    breakdown: [
      { chain: "ethereum", volume: 28000.0, count: 98 },
      { chain: "base", volume: 14500.0, count: 58 },
    ],
  },
  {
    id: "stl_003",
    merchantId: "mch_004",
    merchantName: "Digital Arts Studio",
    period: {
      start: "2024-03-19T00:00:00Z",
      end: "2024-03-19T23:59:59Z",
    },
    totalVolume: 28750.25,
    totalFees: 143.75,
    netAmount: 28606.5,
    transactionCount: 89,
    currency: "USD",
    status: "completed",
    createdAt: "2024-03-20T01:00:00Z",
    completedAt: "2024-03-20T07:30:00Z",
    breakdown: [
      { chain: "ethereum", volume: 12000.0, count: 35 },
      { chain: "polygon", volume: 10250.25, count: 38 },
      { chain: "base", volume: 6500.0, count: 16 },
    ],
  },
  {
    id: "stl_004",
    merchantId: "mch_006",
    merchantName: "GameZone Interactive",
    period: {
      start: "2024-03-19T00:00:00Z",
      end: "2024-03-19T23:59:59Z",
    },
    totalVolume: 52300.0,
    totalFees: 261.5,
    netAmount: 52038.5,
    transactionCount: 234,
    currency: "USD",
    status: "processing",
    createdAt: "2024-03-20T01:00:00Z",
    breakdown: [
      { chain: "polygon", volume: 35000.0, count: 156 },
      { chain: "base", volume: 17300.0, count: 78 },
    ],
  },
  {
    id: "stl_005",
    merchantId: "mch_007",
    merchantName: "Luxury Watches EU",
    period: {
      start: "2024-03-13T00:00:00Z",
      end: "2024-03-19T23:59:59Z",
    },
    totalVolume: 185000.0,
    totalFees: 925.0,
    netAmount: 184075.0,
    transactionCount: 28,
    currency: "EUR",
    status: "completed",
    createdAt: "2024-03-20T02:00:00Z",
    completedAt: "2024-03-20T11:00:00Z",
    breakdown: [{ chain: "ethereum", volume: 185000.0, count: 28 }],
  },
  {
    id: "stl_006",
    merchantId: "mch_010",
    merchantName: "Smart Home Solutions",
    period: {
      start: "2024-03-19T00:00:00Z",
      end: "2024-03-19T23:59:59Z",
    },
    totalVolume: 8920.75,
    totalFees: 44.6,
    netAmount: 8876.15,
    transactionCount: 31,
    currency: "USD",
    status: "pending",
    createdAt: "2024-03-20T01:00:00Z",
    breakdown: [
      { chain: "ethereum", volume: 5500.0, count: 18 },
      { chain: "polygon", volume: 3420.75, count: 13 },
    ],
  },
  {
    id: "stl_007",
    merchantId: "mch_001",
    merchantName: "TechGadgets Inc",
    period: {
      start: "2024-03-18T00:00:00Z",
      end: "2024-03-18T23:59:59Z",
    },
    totalVolume: 12850.0,
    totalFees: 64.25,
    netAmount: 12785.75,
    transactionCount: 38,
    currency: "USD",
    status: "completed",
    createdAt: "2024-03-19T01:00:00Z",
    completedAt: "2024-03-19T07:00:00Z",
    breakdown: [
      { chain: "ethereum", volume: 8500.0, count: 22 },
      { chain: "polygon", volume: 4350.0, count: 16 },
    ],
  },
  {
    id: "stl_008",
    merchantId: "mch_004",
    merchantName: "Digital Arts Studio",
    period: {
      start: "2024-03-18T00:00:00Z",
      end: "2024-03-18T23:59:59Z",
    },
    totalVolume: 31200.5,
    totalFees: 156.0,
    netAmount: 31044.5,
    transactionCount: 95,
    currency: "USD",
    status: "completed",
    createdAt: "2024-03-19T01:00:00Z",
    completedAt: "2024-03-19T08:00:00Z",
    breakdown: [
      { chain: "ethereum", volume: 15000.0, count: 42 },
      { chain: "polygon", volume: 9200.5, count: 35 },
      { chain: "base", volume: 7000.0, count: 18 },
    ],
  },
];

export function getSettlementById(id: string): Settlement | undefined {
  return mockSettlements.find((s) => s.id === id);
}

export function getSettlementsByMerchant(merchantId: string): Settlement[] {
  return mockSettlements.filter((s) => s.merchantId === merchantId);
}

export function getSettlementSummary() {
  const completed = mockSettlements.filter((s) => s.status === "completed");
  return {
    totalVolume: completed.reduce((sum, s) => sum + s.totalVolume, 0),
    totalFees: completed.reduce((sum, s) => sum + s.totalFees, 0),
    totalNet: completed.reduce((sum, s) => sum + s.netAmount, 0),
    transactionCount: completed.reduce((sum, s) => sum + s.transactionCount, 0),
  };
}
