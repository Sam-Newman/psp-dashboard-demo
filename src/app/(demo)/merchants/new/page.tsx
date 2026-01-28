"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft, CaretDown } from "@phosphor-icons/react";

import { Button } from "@pay-merchant/ui/ui/button";
import { Card } from "@pay-merchant/ui/ui/card";
import { Input } from "@pay-merchant/ui/ui/input";
import { Label } from "@pay-merchant/ui/ui/label";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@pay-merchant/ui/ui/menu";
import { toast } from "@pay-merchant/ui/ui/toast";

import { AccessDenied } from "@/components/shared/access-denied";
import { PageHeader } from "@/components/shared/page-header";
import { useRole } from "@/lib/hooks/use-role";
import { supportedChains } from "@/lib/constants/chains";
import { getTokensForChain } from "@/lib/constants/caip";
import { createMerchant } from "@/app/actions/merchants";

export default function NewMerchantPage() {
  const router = useRouter();
  const { hasPermission } = useRole();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [chainId, setChainId] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!hasPermission("merchants.create")) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Add Merchant" />
        <AccessDenied feature="merchant creation" />
      </div>
    );
  }

  const availableTokens = chainId ? getTokensForChain(chainId) : [];

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
      const result = await createMerchant({
        name: name.trim(),
        iconUrl: iconUrl.trim() || undefined,
        chainId,
        tokenAddress: tokenId,
        destinationAddress: destinationAddress.trim(),
      });

      if (result.success) {
        toast.success("Merchant created successfully", {
          description: "The merchant has been added to your portfolio.",
        });
        router.push("/merchants");
      } else {
        toast.error("Failed to create merchant", {
          description: result.error,
        });
      }
    });
  };

  const handleChainChange = (value: string) => {
    setChainId(value);
    setTokenId("");
    setErrors((prev) => ({ ...prev, chainId: "", tokenId: "" }));
  };

  const selectedChain = supportedChains.find((c) => c.id === chainId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="icon" size="sm" onPress={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <PageHeader title="Add New Merchant" description="Onboard a new merchant to your PSP" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Merchant Information</h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name">Merchant Name</Label>
              <Input
                id="name"
                placeholder="Acme Inc"
                value={name}
                onChange={(value) => {
                  setName(value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                isRequired
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="iconUrl">Icon URL (optional)</Label>
              <Input
                id="iconUrl"
                placeholder="https://example.com/icon.png"
                value={iconUrl}
                onChange={setIconUrl}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Destination</h2>
          <p className="text-sm text-gray-400 mb-4">
            Configure where payments will be received for this merchant.
          </p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Chain</Label>
                <MenuTrigger>
                  <Button variant="neutral-secondary" size="lg" className="w-full justify-between mt-2">
                    {selectedChain?.name ?? "Select chain"}
                    <CaretDown className="size-4" />
                  </Button>
                  <MenuPopover>
                    <Menu onAction={(key) => handleChainChange(key as string)}>
                      {supportedChains.map((chain) => (
                        <MenuItem
                          key={chain.id}
                          id={chain.id}
                          className={chainId === chain.id ? "bg-foreground-secondary" : ""}
                        >
                          {chain.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </MenuPopover>
                </MenuTrigger>
                {errors.chainId && <p className="text-sm text-red-500 mt-1">{errors.chainId}</p>}
              </div>
              <div>
                <Label>Token</Label>
                <MenuTrigger>
                  <Button
                    variant="neutral-secondary"
                    size="lg"
                    className="w-full justify-between mt-2"
                    isDisabled={!chainId}
                  >
                    {tokenId || (chainId ? "Select token" : "Select chain first")}
                    <CaretDown className="size-4" />
                  </Button>
                  <MenuPopover>
                    <Menu
                      onAction={(key) => {
                        setTokenId(key as string);
                        setErrors((prev) => ({ ...prev, tokenId: "" }));
                      }}
                    >
                      {availableTokens.map((token) => (
                        <MenuItem
                          key={token}
                          id={token}
                          className={tokenId === token ? "bg-foreground-secondary" : ""}
                        >
                          {token}
                        </MenuItem>
                      ))}
                    </Menu>
                  </MenuPopover>
                </MenuTrigger>
                {errors.tokenId && <p className="text-sm text-red-500 mt-1">{errors.tokenId}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="destinationAddress">Destination Wallet Address</Label>
              <Input
                id="destinationAddress"
                placeholder="0x..."
                value={destinationAddress}
                onChange={(value) => {
                  setDestinationAddress(value);
                  setErrors((prev) => ({ ...prev, destinationAddress: "" }));
                }}
                isRequired
              />
              {errors.destinationAddress && (
                <p className="text-sm text-red-500 mt-1">{errors.destinationAddress}</p>
              )}
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" variant="accent" isDisabled={isPending}>
            {isPending ? "Creating..." : "Create Merchant"}
          </Button>
          <Button type="button" variant="neutral-secondary" onPress={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
