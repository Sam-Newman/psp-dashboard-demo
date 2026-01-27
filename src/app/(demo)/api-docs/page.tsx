"use client";

import { Copy } from "@phosphor-icons/react";

import { AccordionGroup, Accordion, AccordionContent, AccordionTrigger } from "@pay-merchant/ui/ui/accordion";
import { Badge } from "@pay-merchant/ui/ui/badge";
import { Button } from "@pay-merchant/ui/ui/button";
import { Card } from "@pay-merchant/ui/ui/card";
import { toast } from "@pay-merchant/ui/ui/toast";

import { PageHeader } from "@/components/shared/page-header";

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/psp/merchants",
    description: "Create a new merchant",
    methodColor: "bg-success",
  },
  {
    method: "GET",
    path: "/api/v1/psp/merchants",
    description: "List all merchants",
    methodColor: "bg-accent",
  },
  {
    method: "GET",
    path: "/api/v1/psp/merchants/{id}",
    description: "Get merchant details",
    methodColor: "bg-accent",
  },
  {
    method: "PATCH",
    path: "/api/v1/psp/merchants/{id}",
    description: "Update merchant configuration",
    methodColor: "bg-warning",
  },
  {
    method: "DELETE",
    path: "/api/v1/psp/merchants/{id}",
    description: "Offboard merchant",
    methodColor: "bg-error",
  },
  {
    method: "GET",
    path: "/api/v1/psp/transactions",
    description: "List transactions (paginated)",
    methodColor: "bg-accent",
  },
  {
    method: "GET",
    path: "/api/v1/psp/transactions/{txId}",
    description: "Get transaction details",
    methodColor: "bg-accent",
  },
  {
    method: "GET",
    path: "/api/v1/psp/transactions/export",
    description: "Export transactions to CSV",
    methodColor: "bg-accent",
  },
  {
    method: "GET",
    path: "/api/v1/psp/settlements",
    description: "List settlements",
    methodColor: "bg-accent",
  },
  {
    method: "GET",
    path: "/api/v1/psp/settlements/summary",
    description: "Aggregated settlement summary",
    methodColor: "bg-accent",
  },
  {
    method: "GET",
    path: "/api/v1/psp/settlements/report",
    description: "Generate settlement report",
    methodColor: "bg-accent",
  },
];

const codeExamples = {
  auth: `curl -X GET "https://api.walletconnect.com/api/v1/psp/merchants" \\
  -H "Authorization: Bearer {psp_api_key}" \\
  -H "X-PSP-ID: {psp_id}"`,
  createMerchant: `curl -X POST "https://api.walletconnect.com/api/v1/psp/merchants" \\
  -H "Authorization: Bearer {psp_api_key}" \\
  -H "X-PSP-ID: {psp_id}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "company_name": "Acme Retail",
    "legal_entity": "Acme Retail Ltd",
    "contact_email": "finance@acme.com",
    "settlement_currency": "EUR",
    "supported_chains": ["base", "polygon"],
    "supported_tokens": ["USDC"]
  }'`,
  listTransactions: `curl -X GET "https://api.walletconnect.com/api/v1/psp/transactions?status=confirmed&chain=base&from_date=2026-01-01&limit=100" \\
  -H "Authorization: Bearer {psp_api_key}" \\
  -H "X-PSP-ID: {psp_id}"`,
  settlementSummary: `curl -X GET "https://api.walletconnect.com/api/v1/psp/settlements/summary?period=weekly&from_date=2026-01-01&group_by=merchant" \\
  -H "Authorization: Bearer {psp_api_key}" \\
  -H "X-PSP-ID: {psp_id}"`,
};

export default function ApiDocsPage() {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="API Documentation"
        description="Integrate with the PSP API to manage merchants and access data programmatically"
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <p className="text-secondary mb-4">
              The PSP API allows you to programmatically manage merchants, query transactions,
              and generate settlement reports. All endpoints require authentication via API key.
            </p>
            <div className="rounded-5 bg-foreground-secondary p-4">
              <p className="text-sm font-medium mb-2">Base URL</p>
              <code className="text-sm">https://api.walletconnect.com</code>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Authentication</h2>
            <p className="text-secondary mb-4">
              All API requests require authentication via API key in the header. API keys are
              scoped to your PSP account and can be configured with role-based permissions.
            </p>
            <div className="relative rounded-5 bg-main p-4">
              <pre className="text-sm text-white overflow-x-auto">
                <code>{codeExamples.auth}</code>
              </pre>
              <Button
                variant="icon"
                size="sm"
                className="absolute right-2 top-2 text-white/60 hover:text-white"
                onClick={() => copyCode(codeExamples.auth)}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Endpoints</h2>
            <div className="flex flex-col gap-2">
              {endpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-4 border border-primary p-3"
                >
                  <span
                    className={`rounded-3 px-2 py-0.5 text-xs font-medium text-white ${endpoint.methodColor}`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono">{endpoint.path}</code>
                  <span className="ml-auto text-sm text-secondary">{endpoint.description}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Code Examples</h2>
            <AccordionGroup className="flex flex-col gap-2">
              <Accordion>
                <AccordionTrigger>Create Merchant</AccordionTrigger>
                <AccordionContent>
                  <div className="relative rounded-5 bg-main p-4 mt-2">
                    <pre className="text-sm text-white overflow-x-auto">
                      <code>{codeExamples.createMerchant}</code>
                    </pre>
                    <Button
                      variant="icon"
                      size="sm"
                      className="absolute right-2 top-2 text-white/60 hover:text-white"
                      onClick={() => copyCode(codeExamples.createMerchant)}
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </AccordionContent>
              </Accordion>

              <Accordion>
                <AccordionTrigger>List Transactions</AccordionTrigger>
                <AccordionContent>
                  <div className="relative rounded-5 bg-main p-4 mt-2">
                    <pre className="text-sm text-white overflow-x-auto">
                      <code>{codeExamples.listTransactions}</code>
                    </pre>
                    <Button
                      variant="icon"
                      size="sm"
                      className="absolute right-2 top-2 text-white/60 hover:text-white"
                      onClick={() => copyCode(codeExamples.listTransactions)}
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </AccordionContent>
              </Accordion>

              <Accordion>
                <AccordionTrigger>Settlement Summary</AccordionTrigger>
                <AccordionContent>
                  <div className="relative rounded-5 bg-main p-4 mt-2">
                    <pre className="text-sm text-white overflow-x-auto">
                      <code>{codeExamples.settlementSummary}</code>
                    </pre>
                    <Button
                      variant="icon"
                      size="sm"
                      className="absolute right-2 top-2 text-white/60 hover:text-white"
                      onClick={() => copyCode(codeExamples.settlementSummary)}
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </AccordionContent>
              </Accordion>
            </AccordionGroup>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Rate Limits</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Standard Tier</span>
                <Badge variant="info">100 req/min</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enterprise Tier</span>
                <Badge variant="accent">500 req/min</Badge>
              </div>
            </div>
            <p className="text-xs text-tertiary mt-4">
              Rate limit headers are included in all responses.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Response Codes</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <code className="text-sm">200</code>
                <span className="text-sm text-secondary">Success</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">201</code>
                <span className="text-sm text-secondary">Created</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">400</code>
                <span className="text-sm text-secondary">Bad Request</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">401</code>
                <span className="text-sm text-secondary">Unauthorized</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">403</code>
                <span className="text-sm text-secondary">Forbidden</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">404</code>
                <span className="text-sm text-secondary">Not Found</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">429</code>
                <span className="text-sm text-secondary">Rate Limited</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">500</code>
                <span className="text-sm text-secondary">Server Error</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">SDKs</h2>
            <p className="text-sm text-secondary mb-4">
              Official SDKs coming soon for popular languages.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">TypeScript</Badge>
              <Badge variant="info">Python</Badge>
              <Badge variant="info">Go</Badge>
            </div>
          </Card>

          <Card className="p-6 bg-accent/5 border-accent/20">
            <h2 className="font-semibold mb-2">Need Help?</h2>
            <p className="text-sm text-secondary mb-4">
              Contact our developer support team for API integration assistance.
            </p>
            <Button variant="accent" size="sm" className="w-full">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
