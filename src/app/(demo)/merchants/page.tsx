"use client";

import { useEffect, useMemo, useState, useTransition, useCallback } from "react";
import { Plus, Search, Edit, Key, Power, MoreVertical, ChevronDown, X, RefreshCw } from "lucide-react";

import { toast } from "@pay-merchant/ui/ui/toast";

import { StatusBadge } from "@/components/shared/status-badge";
import { useRole } from "@/lib/hooks/use-role";
import { mockMerchants } from "@/lib/mock-data/merchants";
import { supportedChains } from "@/lib/constants/chains";
import { getTokensForChain } from "@/lib/constants/caip";
import { createMerchant, getMerchant, updateMerchant } from "@/app/actions/merchants";
import { ApiMerchant } from "@/lib/types/merchant";

const MERCHANT_IDS_KEY = "psp-dashboard-merchant-ids";

function getStoredMerchantIds(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(MERCHANT_IDS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function storeMerchantId(id: string) {
  const ids = getStoredMerchantIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(MERCHANT_IDS_KEY, JSON.stringify(ids));
  }
}

// Extract chain name from CAIP-19 asset
function getChainFromCaip19(caip19Asset: string): string {
  const match = caip19Asset.match(/^eip155:(\d+)/);
  if (!match) return "unknown";
  const chainNum = match[1];
  const chainMap: Record<string, string> = {
    "1": "ethereum",
    "137": "polygon",
    "8453": "base",
    "42161": "arbitrum",
    "10": "optimism",
  };
  return chainMap[chainNum] || `chain-${chainNum}`;
}

// Unified merchant type for display
interface DisplayMerchant {
  id: string;
  companyName: string;
  legalEntity: string;
  contactEmail: string;
  status: "pending_kyc" | "active" | "suspended" | "offboarded";
  totalVolume: number;
  transactionCount: number;
  supportedChains: string[];
  settlementCurrency: string;
  isFromApi: boolean;
  apiMerchant?: ApiMerchant;
}

// Convert API merchant to display format with dummy data
function apiMerchantToDisplay(merchant: ApiMerchant): DisplayMerchant {
  const chains = [...new Set(merchant.offrampOptions.map((o) => getChainFromCaip19(o.caip19Asset)))];
  return {
    id: merchant.id,
    companyName: merchant.name,
    legalEntity: `${merchant.name} Ltd`,
    contactEmail: `contact@${merchant.name.toLowerCase().replace(/\s+/g, "")}.com`,
    status: "active",
    totalVolume: Math.floor(Math.random() * 500000) + 10000,
    transactionCount: Math.floor(Math.random() * 1000) + 50,
    supportedChains: chains,
    settlementCurrency: "USD",
    isFromApi: true,
    apiMerchant: merchant,
  };
}

export default function MerchantsPage() {
  const { hasPermission } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMerchantModal, setShowMerchantModal] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<ApiMerchant | null>(null);
  const [isPending, startTransition] = useTransition();
  const [apiMerchants, setApiMerchants] = useState<ApiMerchant[]>([]);
  const [isLoadingMerchants, setIsLoadingMerchants] = useState(true);

  const isEditMode = editingMerchant !== null;

  const fetchMerchants = useCallback(async () => {
    setIsLoadingMerchants(true);
    const ids = getStoredMerchantIds();
    const merchants: ApiMerchant[] = [];

    for (const id of ids) {
      const result = await getMerchant(id);
      if (result.success && result.merchant) {
        merchants.push(result.merchant);
      }
    }

    setApiMerchants(merchants);
    setIsLoadingMerchants(false);
  }, []);

  useEffect(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  // Form state
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [chainId, setChainId] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showChainDropdown, setShowChainDropdown] = useState(false);
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);

  const availableTokens = chainId ? getTokensForChain(chainId) : [];
  const selectedChain = supportedChains.find((c) => c.id === chainId);

  const resetForm = () => {
    setName("");
    setIconUrl("");
    setChainId("");
    setTokenId("");
    setDestinationAddress("");
    setErrors({});
    setEditingMerchant(null);
  };

  const closeModal = () => {
    setShowMerchantModal(false);
    resetForm();
  };

  const openAddModal = () => {
    resetForm();
    setShowMerchantModal(true);
  };

  const openEditModal = (merchant: ApiMerchant) => {
    setEditingMerchant(merchant);
    setName(merchant.name);
    setIconUrl(merchant.iconUrl || "");

    // Parse chain and token from first offramp option
    if (merchant.offrampOptions.length > 0) {
      const option = merchant.offrampOptions[0];
      const chainName = getChainFromCaip19(option.caip19Asset);
      setChainId(chainName);

      // Extract token from CAIP-19 (e.g., "eip155:137/erc20:0x..." -> get token symbol)
      const tokenMatch = option.caip19Asset.match(/erc20:(0x[a-fA-F0-9]+)/i);
      if (tokenMatch) {
        // Try to match token address to our known tokens
        const tokens = getTokensForChain(chainName);
        // For now, just set the first available token if we can't match
        if (tokens.length > 0) {
          setTokenId(tokens[0]);
        }
      }

      // Extract destination address
      const destMatch = option.caip10Destination.match(/:0x([a-fA-F0-9]+)$/i);
      if (destMatch) {
        setDestinationAddress("0x" + destMatch[1]);
      }
    }

    setShowMerchantModal(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Merchant name is required";
    }

    if (!chainId) {
      newErrors.chainId = "Please select a chain";
    }

    if (!tokenId) {
      newErrors.tokenId = "Please select a token";
    }

    if (!destinationAddress.trim()) {
      newErrors.destinationAddress = "Destination address is required";
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(destinationAddress.trim())) {
      newErrors.destinationAddress = "Invalid Ethereum address format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    startTransition(async () => {
      if (isEditMode && editingMerchant) {
        // Update existing merchant
        const result = await updateMerchant({
          existingMerchant: editingMerchant,
          name: name.trim(),
          iconUrl: iconUrl.trim() || undefined,
          chainId,
          tokenAddress: tokenId,
          destinationAddress: destinationAddress.trim(),
        });

        if (result.success && result.merchant) {
          toast.success(`Merchant "${result.merchant.name}" updated! Version: ${result.merchant.version}`, {
            duration: 5000,
          });
          closeModal();
          fetchMerchants();
        } else {
          toast.error("Failed to update merchant", {
            description: result.error,
          });
        }
      } else {
        // Create new merchant
        const result = await createMerchant({
          name: name.trim(),
          iconUrl: iconUrl.trim() || undefined,
          chainId,
          tokenAddress: tokenId,
          destinationAddress: destinationAddress.trim(),
        });

        if (result.success && result.merchant) {
          storeMerchantId(result.merchant.id);
          toast.success(`Merchant "${result.merchant.name}" created! ID: ${result.merchant.id}`, {
            duration: 5000,
          });
          closeModal();
          fetchMerchants();
        } else {
          toast.error("Failed to create merchant", {
            description: result.error,
          });
        }
      }
    });
  };

  // Combine API merchants and mock merchants into unified list
  const allMerchants = useMemo(() => {
    const apiDisplayMerchants: DisplayMerchant[] = apiMerchants.map(apiMerchantToDisplay);
    const mockDisplayMerchants: DisplayMerchant[] = mockMerchants.map((m) => ({
      ...m,
      isFromApi: false,
    }));
    return [...apiDisplayMerchants, ...mockDisplayMerchants];
  }, [apiMerchants]);

  const filteredMerchants = useMemo(() => {
    return allMerchants.filter(
      (merchant) =>
        merchant.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        merchant.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        merchant.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allMerchants, searchQuery]);

  return (
    <div className="p-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9a9a9a]" size={20} />
          <input
            type="text"
            placeholder="Search merchants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#252525] border border-[#4f4f4f] rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#9a9a9a] focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
          />
        </div>
        {hasPermission("merchants.create") && (
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#0988f0] hover:bg-[#0770c8] text-white px-6 py-3 rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            <Plus size={20} />
            Add Merchant
          </button>
        )}
      </div>

      {/* Merchants Table */}
      <div className="bg-[#252525] rounded-[20px] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#4f4f4f]">
          <h2 className="text-[16px] text-white tracking-[-0.16px] font-medium">
            Merchants
          </h2>
          <button
            onClick={() => fetchMerchants()}
            disabled={isLoadingMerchants}
            className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={16} className={isLoadingMerchants ? "animate-spin" : ""} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#4f4f4f]">
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Company
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Contact
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Volume
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Transactions
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Chains
                </th>
                <th className="text-right px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoadingMerchants ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#9a9a9a]">
                    Loading merchants...
                  </td>
                </tr>
              ) : filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#9a9a9a]">
                    No merchants found.
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((merchant) => (
                  <tr
                    key={merchant.id}
                    className="border-b border-[#4f4f4f] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] text-white tracking-[-0.14px]">
                            {merchant.companyName}
                          </span>
                          {merchant.isFromApi && (
                            <span className="bg-[#0988f0] px-1.5 py-0.5 rounded text-[10px] text-white font-medium shrink-0">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                          ID: {merchant.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                        {merchant.contactEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={merchant.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[14px] text-white tracking-[-0.14px]">
                        ${merchant.totalVolume.toLocaleString()}
                      </div>
                      <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                        {merchant.settlementCurrency}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[14px] text-white tracking-[-0.14px]">
                        {merchant.transactionCount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {merchant.supportedChains.map((chain) => (
                          <span
                            key={chain}
                            className="bg-[#363636] px-2 py-1 rounded text-[12px] text-[#bbb] tracking-[-0.12px] capitalize"
                          >
                            {chain}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {merchant.isFromApi && merchant.apiMerchant ? (
                          <button
                            onClick={() => openEditModal(merchant.apiMerchant!)}
                            className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        ) : (
                          <button
                            className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                        <button
                          className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                          title="Regenerate API Keys"
                        >
                          <Key size={16} />
                        </button>
                        <button
                          className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                          title="Suspend/Activate"
                        >
                          <Power size={16} />
                        </button>
                        <button
                          className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                          title="More"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Merchant Modal */}
      {showMerchantModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#252525] rounded-[20px] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[24px] text-white tracking-[-0.24px]">
                  {isEditMode ? "Edit Merchant" : "Add New Merchant"}
                </h2>
                {isEditMode && editingMerchant && (
                  <p className="text-[12px] text-[#9a9a9a] mt-1">
                    ID: {editingMerchant.id} | Version: {editingMerchant.version}
                  </p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Merchant Name */}
              <div>
                <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                  Merchant Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
                  placeholder="Acme Retail"
                />
                {errors.name && (
                  <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>
                )}
              </div>

              {/* Icon URL */}
              <div>
                <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                  Icon URL (optional)
                </label>
                <input
                  type="text"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
                  placeholder="https://example.com/icon.png"
                />
              </div>

              {/* Payment Destination Section */}
              <div className="border-t border-[#4f4f4f] pt-6">
                <h3 className="text-[16px] text-white tracking-[-0.16px] mb-4">
                  Payment Destination
                </h3>
                <p className="text-[12px] text-[#9a9a9a] mb-4">
                  Configure where payments will be received for this merchant.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {/* Chain Dropdown */}
                  <div className="relative">
                    <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                      Chain *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowChainDropdown(!showChainDropdown);
                        setShowTokenDropdown(false);
                      }}
                      className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-left text-[14px] tracking-[-0.14px] focus:outline-none focus:border-[#0988f0] flex items-center justify-between"
                    >
                      <span className={selectedChain ? "text-white" : "text-[#9a9a9a]"}>
                        {selectedChain?.name ?? "Select chain"}
                      </span>
                      <ChevronDown size={16} className="text-[#9a9a9a]" />
                    </button>
                    {showChainDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg overflow-hidden z-10">
                        {supportedChains.map((chain) => (
                          <button
                            key={chain.id}
                            type="button"
                            onClick={() => {
                              setChainId(chain.id);
                              setTokenId("");
                              setShowChainDropdown(false);
                              setErrors((prev) => ({ ...prev, chainId: "", tokenId: "" }));
                            }}
                            className={`w-full px-4 py-3 text-left text-[14px] tracking-[-0.14px] hover:bg-[#363636] transition-colors ${
                              chainId === chain.id ? "bg-[#363636] text-white" : "text-[#bbb]"
                            }`}
                          >
                            {chain.name}
                          </button>
                        ))}
                      </div>
                    )}
                    {errors.chainId && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.chainId}</p>
                    )}
                  </div>

                  {/* Token Dropdown */}
                  <div className="relative">
                    <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                      Token *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (chainId) {
                          setShowTokenDropdown(!showTokenDropdown);
                          setShowChainDropdown(false);
                        }
                      }}
                      disabled={!chainId}
                      className={`w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-left text-[14px] tracking-[-0.14px] focus:outline-none focus:border-[#0988f0] flex items-center justify-between ${
                        !chainId ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className={tokenId ? "text-white" : "text-[#9a9a9a]"}>
                        {tokenId || (chainId ? "Select token" : "Select chain first")}
                      </span>
                      <ChevronDown size={16} className="text-[#9a9a9a]" />
                    </button>
                    {showTokenDropdown && availableTokens.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg overflow-hidden z-10">
                        {availableTokens.map((token) => (
                          <button
                            key={token}
                            type="button"
                            onClick={() => {
                              setTokenId(token);
                              setShowTokenDropdown(false);
                              setErrors((prev) => ({ ...prev, tokenId: "" }));
                            }}
                            className={`w-full px-4 py-3 text-left text-[14px] tracking-[-0.14px] hover:bg-[#363636] transition-colors ${
                              tokenId === token ? "bg-[#363636] text-white" : "text-[#bbb]"
                            }`}
                          >
                            {token}
                          </button>
                        ))}
                      </div>
                    )}
                    {errors.tokenId && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.tokenId}</p>
                    )}
                  </div>
                </div>

                {/* Destination Address */}
                <div className="mt-4">
                  <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                    Destination Wallet Address *
                  </label>
                  <input
                    type="text"
                    value={destinationAddress}
                    onChange={(e) => {
                      setDestinationAddress(e.target.value);
                      setErrors((prev) => ({ ...prev, destinationAddress: "" }));
                    }}
                    className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px] font-mono"
                    placeholder="0x..."
                  />
                  {errors.destinationAddress && (
                    <p className="text-red-500 text-[12px] mt-1">{errors.destinationAddress}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#4f4f4f]">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isPending}
                  className="px-6 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px] disabled:opacity-50"
                >
                  {isPending
                    ? (isEditMode ? "Updating..." : "Creating...")
                    : (isEditMode ? "Update Merchant" : "Create Merchant")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
