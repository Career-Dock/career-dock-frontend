import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TooltipChildrenProps } from "@/types";

const SPopover = ({
  triggerChildren,
  contentChildren,
  contentStyles,
}: TooltipChildrenProps) => {
  return (
    <Popover>
      <PopoverTrigger>{triggerChildren}</PopoverTrigger>
      <PopoverContent className={contentStyles}>
        {contentChildren}
      </PopoverContent>
    </Popover>
  );
};

export default SPopover;
