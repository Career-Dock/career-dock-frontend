import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipChildrenProps } from "@/types";

export function STooltip({
  triggerChildren,
  contentChildren,
  contentStyles
}: TooltipChildrenProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerChildren}</TooltipTrigger>
        <TooltipContent className={contentStyles}>{contentChildren}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
