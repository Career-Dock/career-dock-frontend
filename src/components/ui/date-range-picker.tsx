'use client';

import * as React from 'react';
import { CalendarIcon, Check } from 'lucide-react';
import { addDays, format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps {
  className?: string;
  value: string | undefined;
  onChange: any;
}

const predefinedRanges = [
  {
    label: 'Today',
    value: 'today',
    getValue: () => ({ from: new Date(), to: new Date() }),
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
    getValue: () => {
      const yesterday = addDays(new Date(), -1);
      return { from: yesterday, to: yesterday };
    },
  },
  {
    label: 'Last 7 days',
    value: 'last7days',
    getValue: () => ({
      from: addDays(new Date(), -6),
      to: new Date(),
    }),
  },
  {
    label: 'Last 30 days',
    value: 'last30days',
    getValue: () => ({
      from: addDays(new Date(), -29),
      to: new Date(),
    }),
  },
  {
    label: 'This Month',
    value: 'thisMonth',
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: new Date(),
    }),
  },
  {
    label: 'Last Month',
    value: 'lastMonth',
    getValue: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
];

export function DateRangePicker({
  className,
  value,
  onChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >();

  // Parse the current value to determine if it's a predefined range or custom dates
  React.useEffect(() => {
    if (!value) {
      setSelectedRange(undefined);
      return;
    }

    // Check if it's a predefined range
    const predefinedRange = predefinedRanges.find(
      (range) => range.value === value
    );
    if (predefinedRange) {
      setSelectedRange(predefinedRange.getValue());
      return;
    }

    // Otherwise parse the custom date range
    const [from, to] = value.split(',');
    if (from && to) {
      setSelectedRange({
        from: new Date(from),
        to: new Date(to),
      });
    }
  }, [value]);

  const handleRangeSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (!range?.from) {
      onChange(undefined);
      return;
    }

    const from = range.from.toISOString().split('T')[0];
    const to = (range.to || range.from).toISOString().split('T')[0];
    onChange(`${from},${to}`);
  };

  const handlePredefinedRangeSelect = (rangeValue: string) => {
    onChange(rangeValue);
    setIsOpen(false);
  };

  const getButtonText = () => {
    if (!value) return 'Select date range';

    const predefinedRange = predefinedRanges.find(
      (range) => range.value === value
    );
    if (predefinedRange) return predefinedRange.label;

    if (selectedRange?.from) {
      return selectedRange.to
        ? `${format(selectedRange.from, 'LLL dd, y')} - ${format(
            selectedRange.to,
            'LLL dd, y'
          )}`
        : format(selectedRange.from, 'LLL dd, y');
    }

    return 'Select date range';
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={selectedRange?.from}
              selected={selectedRange}
              onSelect={handleRangeSelect}
              numberOfMonths={2}
              className="border-r"
            />
            <div className="grid gap-1 p-3">
              {predefinedRanges.map((range) => (
                <Button
                  key={range.value}
                  variant="ghost"
                  className="justify-start font-normal"
                  onClick={() => handlePredefinedRangeSelect(range.value)}
                >
                  {range.label}
                  {value === range.value && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
