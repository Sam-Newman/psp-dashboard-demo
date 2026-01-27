"use client";

import { use } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "@phosphor-icons/react";

import { Button } from "@pay-merchant/ui/ui/button";
import { Card } from "@pay-merchant/ui/ui/card";
import { Checkbox, CheckboxGroup } from "@pay-merchant/ui/ui/checkbox";
import { Input } from "@pay-merchant/ui/ui/input";
import { Label } from "@pay-merchant/ui/ui/label";
import { Radio, RadioGroup } from "@pay-merchant/ui/ui/radio";
import { toast } from "@pay-merchant/ui/ui/toast";

import { AccessDenied } from "@/components/shared/access-denied";
import { PageHeader } from "@/components/shared/page-header";
import { useRole } from "@/lib/hooks/use-role";
import { getMerchantById } from "@/lib/mock-data/merchants";
import { supportedChains } from "@/lib/constants/chains";
import { supportedTokens } from "@/lib/constants/tokens";

export default function EditMerchantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { hasPermission } = useRole();

  const merchant = getMerchantById(id);

  if (!hasPermission("merchants.edit")) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Edit Merchant" />
        <AccessDenied feature="merchant editing" />
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Merchant Not Found" />
        <Card className="p-6">
          <p className="text-secondary">The requested merchant could not be found.</p>
          <Link href="/merchants">
            <Button variant="neutral" className="mt-4">
              Back to Merchants
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Merchant updated successfully", {
      description: "Changes have been saved.",
    });
    router.push(`/merchants/${id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="icon" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <PageHeader
          title={`Edit ${merchant.companyName}`}
          description="Update merchant configuration"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue={merchant.companyName} isRequired />
            </div>
            <div>
              <Label htmlFor="legalEntity">Legal Entity</Label>
              <Input id="legalEntity" defaultValue={merchant.legalEntity} isRequired />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  defaultValue={merchant.contactEmail}
                  isRequired
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" type="tel" defaultValue={merchant.contactPhone} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Settlement Configuration</h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Settlement Currency</Label>
              <RadioGroup defaultValue={merchant.settlementCurrency} className="mt-2 flex gap-4">
                <Radio value="USD">USD</Radio>
                <Radio value="EUR">EUR</Radio>
                <Radio value="GBP">GBP</Radio>
              </RadioGroup>
            </div>
            <div>
              <Label>Settlement Frequency</Label>
              <RadioGroup defaultValue={merchant.settlementFrequency} className="mt-2 flex gap-4">
                <Radio value="daily">Daily</Radio>
                <Radio value="weekly">Weekly</Radio>
                <Radio value="monthly">Monthly</Radio>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" defaultValue={merchant.bankAccount.bankName} isRequired />
              </div>
              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input id="accountName" defaultValue={merchant.bankAccount.accountName} isRequired />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input id="accountNumber" defaultValue={merchant.bankAccount.accountNumber} isRequired />
              </div>
              <div>
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input id="routingNumber" defaultValue={merchant.bankAccount.routingNumber} isRequired />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Supported Chains & Tokens</h2>
          <div className="flex flex-col gap-6">
            <div>
              <Label>Supported Chains</Label>
              <CheckboxGroup defaultValue={merchant.supportedChains} className="mt-2 flex flex-wrap gap-4">
                {supportedChains.map((chain) => (
                  <Checkbox key={chain.id} value={chain.id}>
                    {chain.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
            <div>
              <Label>Supported Tokens</Label>
              <CheckboxGroup defaultValue={merchant.supportedTokens} className="mt-2 flex flex-wrap gap-4">
                {supportedTokens.map((token) => (
                  <Checkbox key={token.id} value={token.id}>
                    {token.symbol}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" variant="accent">
            Save Changes
          </Button>
          <Button type="button" variant="neutral-secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
