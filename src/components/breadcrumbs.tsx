'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { Slash } from 'lucide-react';
import { Fragment } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const MAX_VISIBLE_ITEMS = 4;
const ID_LENGTH = 8;

function truncateId(id: string): string {
  return id.length > ID_LENGTH ? `${id.slice(0, ID_LENGTH)}...` : id;
}

function truncateTitle(title: string): string {
  const parts = title.split('-');
  if (parts.length > 1) {
    const lastPart = parts[parts.length - 1];
    if (lastPart.length > ID_LENGTH) {
      parts[parts.length - 1] = truncateId(lastPart);
    }
  }
  return parts.join('-');
}

export function Breadcrumbs() {
  const items = useBreadcrumbs();
  if (items.length === 0) return null;

  const visibleItems = items.slice(-MAX_VISIBLE_ITEMS);
  const hiddenItems = items.slice(0, -MAX_VISIBLE_ITEMS);

  return (
    <TooltipProvider>
      <Breadcrumb>
        <BreadcrumbList>
          {hiddenItems.length > 0 && (
            <BreadcrumbItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BreadcrumbLink href={hiddenItems[0].link}>
                    ...
                  </BreadcrumbLink>
                </TooltipTrigger>
                <TooltipContent>
                  {hiddenItems.map((item, index) => (
                    <Fragment key={item.title}>
                      {index > 0 && <Slash className="inline-block mx-1" />}
                      {item.title}
                    </Fragment>
                  ))}
                </TooltipContent>
              </Tooltip>
            </BreadcrumbItem>
          )}
          {visibleItems.map((item, index) => (
            <Fragment key={item.title}>
              {index > 0 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem>
                {index === visibleItems.length - 1 ? (
                  <BreadcrumbPage>{truncateTitle(item.title)}</BreadcrumbPage>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BreadcrumbLink href={item.link}>
                        {truncateTitle(item.title)}
                      </BreadcrumbLink>
                    </TooltipTrigger>
                    <TooltipContent>{item.title}</TooltipContent>
                  </Tooltip>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </TooltipProvider>
  );
}
