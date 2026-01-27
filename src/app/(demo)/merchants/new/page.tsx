"use client";

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
import { supportedChains } from "@/lib/constants/chains";
import { supportedTokens } from "@/lib/constants/tokens";

export default function NewMerchantPage() {
  const router = useRouter();
  const { hasPermission } = useRole();

  if (!hasPermission("merchants.create")) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Add Merchant" />
        <AccessDenied feature="merchant creation" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Merchant created successfully", {
      description: "The merchant has been added to your portfolio.",
    });
    router.push("/merchants");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="icon" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <PageHeader title="Add New Merchant" description="Onboard a new merchant to your PSP" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Acme Inc" isRequired />
            </div>
            <div>
              <Label htmlFor="legalEntity">Legal Entity</Label>
              <Input id="legalEntity" placeholder="Acme Inc Ltd" isRequired />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" placeholder="finance@acme.com" isRequired />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" type="tel" placeholder="+1 555-0100" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Settlement Configuration</h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Settlement Currency</Label>
              <RadioGroup defaultValue="USD" className="mt-2 flex gap-4">
                <Radio value="USD">USD</Radio>
                <Radio value="EUR">EUR</Radio>
                <Radio value="GBP">GBP</Radio>
              </RadioGroup>
            </div>
            <div>
              <Label>Settlement Frequency</Label>
              <RadioGroup defaultValue="daily" className="mt-2 flex gap-4">
                <Radio value="daily">Daily</Radio>
                <Radio value="weekly">Weekly</Radio>
                <Radio value="monthly">Monthly</Radio>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" placeholder="Chase Bank" isRequired />
              </div>
              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input id="accountName" placeholder="Acme Inc" isRequired />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input id="accountNumber" placeholder="****4567" isRequired />
              </div>
              <div>
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input id="routingNumber" placeholder="****1234" isRequired />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Supported Chains & Tokens</h2>
          <div className="flex flex-col gap-6">
            <div>
              <Label>Supported Chains</Label>
              <CheckboxGroup defaultValue={["ethereum", "polygon"]} className="mt-2 flex flex-wrap gap-4">
                {supportedChains.map((chain) => (
                  <Checkbox key={chain.id} value={chain.id}>
                    {chain.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
            <div>
              <Label>Supported Tokens</Label>
              <CheckboxGroup defaultValue={["USDC"]} className="mt-2 flex flex-wrap gap-4">
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
            Create Merchant
          </Button>
          <Button type="button" variant="neutral-secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
