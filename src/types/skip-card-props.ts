import type { SkipOption } from "./skip-option";

export interface SkipCardProps {
  skip: SkipOption;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (skip: SkipOption) => void;
  calculateTotalPrice: (skip: SkipOption) => number;
}
