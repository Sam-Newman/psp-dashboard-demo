export interface Merchant {
  id: string;
  company_name: string;
  legal_entity: string;
  contact_email: string;
  status: 'pending_kyc' | 'active' | 'suspended' | 'offboarded';
  settlement_currency: string;
  supported_chains: string[];
  supported_tokens: string[];
  created_at: string;
  gross_volume: number;
  transaction_count: number;
}

export interface Transaction {
  tx_id: string;
  merchant_id: string;
  merchant_name: string;
  amount_crypto: string;
  token: string;
  chain: string;
  amount_fiat: string;
  fiat_currency: string;
  status: 'requires_action' | 'processing' | 'succeeded' | 'failed' | 'expired';
  substatus?: string;
  customer_wallet: string;
  created_at: string;
  confirmed_at?: string;
  hash_id: string;
  payment_id: string;
  wallet_type: string;
}

export interface Settlement {
  id: string;
  merchant_id: string;
  merchant_name: string;
  gross_volume: string;
  fees: string;
  net_settlement: string;
  currency: string;
  transaction_count: number;
  period_start: string;
  period_end: string;
  status: 'pending' | 'completed' | 'failed';
}

export const mockMerchants: Merchant[] = [
  {
    id: 'mch_abc123',
    company_name: 'Acme Retail',
    legal_entity: 'Acme Retail Ltd',
    contact_email: 'finance@acme.com',
    status: 'active',
    settlement_currency: 'EUR',
    supported_chains: ['base', 'polygon'],
    supported_tokens: ['USDC', 'USDT'],
    created_at: '2025-11-15T10:00:00Z',
    gross_volume: 15000.00,
    transaction_count: 342
  },
  {
    id: 'mch_def456',
    company_name: 'TechStore Pro',
    legal_entity: 'TechStore Pro GmbH',
    contact_email: 'payments@techstore.com',
    status: 'active',
    settlement_currency: 'USD',
    supported_chains: ['base', 'ethereum'],
    supported_tokens: ['USDC'],
    created_at: '2025-12-01T08:30:00Z',
    gross_volume: 45200.00,
    transaction_count: 892
  },
  {
    id: 'mch_ghi789',
    company_name: 'Fashion Hub',
    legal_entity: 'Fashion Hub Inc',
    contact_email: 'billing@fashionhub.com',
    status: 'pending_kyc',
    settlement_currency: 'EUR',
    supported_chains: ['polygon'],
    supported_tokens: ['USDC'],
    created_at: '2026-01-18T14:20:00Z',
    gross_volume: 0,
    transaction_count: 0
  },
  {
    id: 'mch_jkl012',
    company_name: 'Global Marketplace',
    legal_entity: 'Global Marketplace SA',
    contact_email: 'crypto@globalmp.com',
    status: 'active',
    settlement_currency: 'USD',
    supported_chains: ['base', 'polygon', 'ethereum'],
    supported_tokens: ['USDC', 'USDT', 'ETH'],
    created_at: '2025-10-10T09:00:00Z',
    gross_volume: 89500.00,
    transaction_count: 1543
  },
  {
    id: 'mch_mno345',
    company_name: 'Digital Goods Co',
    legal_entity: 'Digital Goods Co Ltd',
    contact_email: 'admin@digitalgds.com',
    status: 'suspended',
    settlement_currency: 'EUR',
    supported_chains: ['base'],
    supported_tokens: ['USDC'],
    created_at: '2025-09-05T11:15:00Z',
    gross_volume: 2300.00,
    transaction_count: 56
  },
  {
    id: 'mch_pqr678',
    company_name: 'Quick Commerce',
    legal_entity: 'Quick Commerce LLC',
    contact_email: 'pay@quickcom.com',
    status: 'active',
    settlement_currency: 'USD',
    supported_chains: ['base', 'solana'],
    supported_tokens: ['USDC', 'SOL'],
    created_at: '2025-11-20T16:45:00Z',
    gross_volume: 12800.00,
    transaction_count: 287
  }
];

export const mockTransactions: Transaction[] = [
  {
    tx_id: 'tx_xyz789',
    merchant_id: 'mch_abc123',
    merchant_name: 'Acme Retail',
    amount_crypto: '5.00',
    token: 'USDC',
    chain: 'base',
    amount_fiat: '5.00',
    fiat_currency: 'USD',
    status: 'processing',
    substatus: 'waiting_for_confirmation',
    customer_wallet: '0x1234...abcd',
    wallet_type: 'MetaMask',
    created_at: '2026-01-21T09:30:00Z',
    hash_id: '0x45...2jr6',
    payment_id: '233489'
  },
  {
    tx_id: 'tx_aaa111',
    merchant_id: 'mch_def456',
    merchant_name: 'TechStore Pro',
    amount_crypto: '0.12',
    token: 'SOL',
    chain: 'solana',
    amount_fiat: '23.45',
    fiat_currency: 'USD',
    status: 'succeeded',
    substatus: 'confirmed',
    customer_wallet: '0x9876...xyz1',
    wallet_type: 'Phantom',
    created_at: '2026-01-21T08:15:00Z',
    confirmed_at: '2026-01-21T08:16:00Z',
    hash_id: '0x78...abc9',
    payment_id: '233488'
  },
  {
    tx_id: 'tx_bbb222',
    merchant_id: 'mch_jkl012',
    merchant_name: 'Global Marketplace',
    amount_crypto: '100.00',
    token: 'USDC',
    chain: 'polygon',
    amount_fiat: '100.00',
    fiat_currency: 'USD',
    status: 'succeeded',
    substatus: 'offramped_to_fiat',
    customer_wallet: '0x5555...def2',
    wallet_type: 'Trust Wallet',
    created_at: '2026-01-20T18:22:00Z',
    confirmed_at: '2026-01-20T18:23:00Z',
    hash_id: '0x12...def3',
    payment_id: '233487'
  },
  {
    tx_id: 'tx_ccc333',
    merchant_id: 'mch_abc123',
    merchant_name: 'Acme Retail',
    amount_crypto: '50.00',
    token: 'USDT',
    chain: 'base',
    amount_fiat: '50.00',
    fiat_currency: 'EUR',
    status: 'failed',
    customer_wallet: '0xaaaa...bbb3',
    wallet_type: 'Coinbase',
    created_at: '2026-01-20T14:10:00Z',
    hash_id: '0x99...fff4',
    payment_id: '233486'
  },
  {
    tx_id: 'tx_ddd444',
    merchant_id: 'mch_pqr678',
    merchant_name: 'Quick Commerce',
    amount_crypto: '25.50',
    token: 'USDC',
    chain: 'base',
    amount_fiat: '25.50',
    fiat_currency: 'USD',
    status: 'succeeded',
    substatus: 'confirmed',
    customer_wallet: '0x7777...ccc5',
    wallet_type: 'MetaMask',
    created_at: '2026-01-20T11:05:00Z',
    confirmed_at: '2026-01-20T11:06:00Z',
    hash_id: '0xbb...ggg5',
    payment_id: '233485'
  },
  {
    tx_id: 'tx_eee555',
    merchant_id: 'mch_def456',
    merchant_name: 'TechStore Pro',
    amount_crypto: '200.00',
    token: 'USDC',
    chain: 'ethereum',
    amount_fiat: '200.00',
    fiat_currency: 'USD',
    status: 'succeeded',
    substatus: 'reached_payout_account',
    customer_wallet: '0x3333...ddd6',
    wallet_type: 'Uniswap',
    created_at: '2026-01-19T16:30:00Z',
    confirmed_at: '2026-01-19T16:32:00Z',
    hash_id: '0xcc...hhh6',
    payment_id: '233484'
  },
  {
    tx_id: 'tx_fff666',
    merchant_id: 'mch_jkl012',
    merchant_name: 'Global Marketplace',
    amount_crypto: '75.00',
    token: 'USDC',
    chain: 'base',
    amount_fiat: '75.00',
    fiat_currency: 'USD',
    status: 'expired',
    customer_wallet: '0x8888...eee7',
    wallet_type: 'Crypto.com',
    created_at: '2026-01-19T09:20:00Z',
    hash_id: '0xdd...iii7',
    payment_id: '233483'
  },
  {
    tx_id: 'tx_ggg777',
    merchant_id: 'mch_abc123',
    merchant_name: 'Acme Retail',
    amount_crypto: '15.75',
    token: 'USDC',
    chain: 'polygon',
    amount_fiat: '15.75',
    fiat_currency: 'EUR',
    status: 'succeeded',
    substatus: 'confirmed',
    customer_wallet: '0x4444...fff8',
    wallet_type: 'MetaMask',
    created_at: '2026-01-18T13:45:00Z',
    confirmed_at: '2026-01-18T13:46:00Z',
    hash_id: '0xee...jjj8',
    payment_id: '233482'
  }
];

export const mockSettlements: Settlement[] = [
  {
    id: 'stl_001',
    merchant_id: 'mch_abc123',
    merchant_name: 'Acme Retail',
    gross_volume: '15000.00',
    fees: '45.00',
    net_settlement: '14955.00',
    currency: 'EUR',
    transaction_count: 342,
    period_start: '2026-01-01',
    period_end: '2026-01-21',
    status: 'completed'
  },
  {
    id: 'stl_002',
    merchant_id: 'mch_def456',
    merchant_name: 'TechStore Pro',
    gross_volume: '45200.00',
    fees: '135.60',
    net_settlement: '45064.40',
    currency: 'USD',
    transaction_count: 892,
    period_start: '2026-01-01',
    period_end: '2026-01-21',
    status: 'completed'
  },
  {
    id: 'stl_003',
    merchant_id: 'mch_jkl012',
    merchant_name: 'Global Marketplace',
    gross_volume: '89500.00',
    fees: '268.50',
    net_settlement: '89231.50',
    currency: 'USD',
    transaction_count: 1543,
    period_start: '2026-01-01',
    period_end: '2026-01-21',
    status: 'completed'
  },
  {
    id: 'stl_004',
    merchant_id: 'mch_pqr678',
    merchant_name: 'Quick Commerce',
    gross_volume: '12800.00',
    fees: '38.40',
    net_settlement: '12761.60',
    currency: 'USD',
    transaction_count: 287,
    period_start: '2026-01-01',
    period_end: '2026-01-21',
    status: 'pending'
  },
  {
    id: 'stl_005',
    merchant_id: 'mch_mno345',
    merchant_name: 'Digital Goods Co',
    gross_volume: '2300.00',
    fees: '6.90',
    net_settlement: '2293.10',
    currency: 'EUR',
    transaction_count: 56,
    period_start: '2026-01-01',
    period_end: '2026-01-21',
    status: 'completed'
  }
];

export const dashboardStats = {
  totalMerchants: mockMerchants.filter(m => m.status === 'active').length,
  totalVolume: mockSettlements.reduce((sum, s) => sum + parseFloat(s.gross_volume), 0),
  totalTransactions: mockTransactions.length,
  pendingKYC: mockMerchants.filter(m => m.status === 'pending_kyc').length
};
