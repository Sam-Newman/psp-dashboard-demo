import { AlertCircle } from "lucide-react";

import type { TransactionErrorCode } from "@/lib/types/transaction";
import { transactionErrorCodeLabels, transactionErrorMessages } from "@/lib/types/transaction";

interface TransactionErrorProps {
  errorCode: TransactionErrorCode;
  errorMessage?: string;
}

export function TransactionError({ errorCode, errorMessage }: TransactionErrorProps) {
  const label = transactionErrorCodeLabels[errorCode];
  const defaultMessage = transactionErrorMessages[errorCode];

  return (
    <div className="bg-[#4d1a1a] border border-[#f87171]/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="text-[#f87171] flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-[14px] text-[#f87171] tracking-[-0.14px] font-medium mb-1">
            {label}
          </p>
          <p className="text-[12px] text-[#f87171]/80 tracking-[-0.12px]">
            {errorMessage || defaultMessage}
          </p>
          <p className="text-[10px] text-[#f87171]/60 tracking-[-0.10px] mt-2 font-mono">
            Error code: {errorCode}
          </p>
        </div>
      </div>
    </div>
  );
}
