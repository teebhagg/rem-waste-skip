import type { SkipCardProps } from "@/types/skip-card-props";
import type { SkipOption } from "@/types/skip-option";
import { AlertTriangle, ArrowRight, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function SkipCard({
  skip,
  isSelected,
  isDisabled,
  onSelect,
  calculateTotalPrice,
}: SkipCardProps) {
  // Generate warnings based on skip properties
  const generateWarnings = (skip: SkipOption): string[] => {
    const warnings: string[] = [];

    if (!skip.allowed_on_road) {
      warnings.push("Not Allowed On The Road");
    }

    if (!skip.allows_heavy_waste) {
      warnings.push("Not Suitable for Heavy Waste");
    }

    if (skip.forbidden) {
      warnings.push("Not Available");
    }

    return warnings;
  };

  const warnings = generateWarnings(skip);
  const totalPrice = calculateTotalPrice(skip);

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 hover:shadow-lg rounded-xl relative p-0
          ${isSelected ? "ring-2 ring-green-600 dark:ring-green-500 hover:shadow-lg" : ""}
          ${isDisabled ? "opacity-75" : ""}
        `}>
      {/* Image section - keep as is */}
      <div className="relative">
        <img
          src={`https://plus.unsplash.com/premium_photo-1681987448179-4a93b7975018?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt={`${skip.size}-yard skip container`}
          width={400}
          height={200}
          className={`min-w-[400px] w-full h-50 object-cover ${
            isDisabled ? "grayscale" : ""
          }`}
        />
        <Badge
          className={`absolute top-4 right-4 rounded-full
              ${
                isSelected
                  ? "bg-green-600 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-600"
                  : "bg-blue-600 hover:bg-blue-600"
              }`}
          aria-label={`Skip size: ${skip.size} yards`}>
          <p>{skip.size} Yards</p>
        </Badge>
      </div>

      {/* Content section - reduced spacing */}
      <CardContent className="flex flex-col space-y-3 px-3 py-3">
        <div className="flex flex-col space-y-1">
          <h3 className="text-xl font-semibold">{skip.size} Yard Skip</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {skip.hire_period_days} day hire period
          </p>
        </div>

        <div className="flex flex-col space-y-1">
          <div
            className={`text-2xl font-bold ${
              isSelected
                ? "text-green-600 dark:text-green-500"
                : "text-blue-600 dark:text-blue-500"
            }`}>
            £{totalPrice.toFixed(2)}
          </div>

          <div className="text-xs text-slate-500">
            Price before VAT: £{skip.price_before_vat.toFixed(2)} + VAT (
            {skip.vat}%)
          </div>
        </div>

        {/* Warnings - reduced margins */}
        {warnings.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {warnings.map((warning, index) => (
              <Badge
                key={index}
                className="flex items-center text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-500 w-full justify-start py-1 rounded-full">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                {warning}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Footer - reduced padding */}
      <CardFooter className="pt-0 pb-3 px-4">
        <Button
          className={`w-full group rounded-full h-[42px] ${
            isSelected
              ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
              : ""
          }`}
          onClick={() => onSelect(skip)}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-label={`Select ${skip.size} Yard Skip${
            isDisabled ? " (Not Available)" : ""
          }`}>
          {isSelected ? (
            <>
              Skip Selected
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </>
          ) : isDisabled ? (
            <>
              Not Available
              <XCircle className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Select This Skip
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SkipCard;
