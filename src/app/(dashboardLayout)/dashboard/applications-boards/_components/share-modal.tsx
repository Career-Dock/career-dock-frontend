'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Link, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ShareModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ShareModal({ isOpen, setIsOpen }: ShareModalProps) {
  const searchParams = useSearchParams();
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllLinks, setShowAllLinks] = useState(false);

  const status = searchParams.get('status')?.split('.') || [];
  const jobType = searchParams.get('jobType')?.split('.') || [];
  const dateRange = searchParams.get('dateRange');
  const searchTerm = searchParams.get('q');

  useEffect(() => {
    if (!isOpen) {
      setShareLink('');
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const createShareLink = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const shareId = Math.random().toString(36).substring(2, 15);
      setShareLink(`http://localhost:3000/share/${shareId}`);
    } catch (error) {
      console.error('Error creating share link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showAllShareLinks = () => {
    setShowAllLinks(!showAllLinks);
    // In a real application, you would fetch the list of share links here
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="flex flex-row items-center justify-between mt-6">
          <DialogTitle>Share Applications</DialogTitle>
          <Button variant="outline" size="sm" onClick={showAllShareLinks}>
            <List className="mr-2 h-4 w-4" />
            {showAllLinks ? 'Hide' : 'Show'} All Lists
          </Button>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {showAllLinks ? (
            <div>
              <h3 className="text-sm font-medium mb-2">All Share Links:</h3>
              <ul className="space-y-2">
                {/* This is a placeholder. In a real application, you would map over the fetched share links */}
                <li className="flex items-center justify-between">
                  <span className="text-sm">
                    http://localhost:3000/share/abc123
                  </span>
                  <Button size="sm" variant="ghost">
                    Copy
                  </Button>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">
                    http://localhost:3000/share/def456
                  </span>
                  <Button size="sm" variant="ghost">
                    Copy
                  </Button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Filters applied:</h3>
                <div className="space-y-1">
                  {status.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Status:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {status.map((s) => (
                          <Badge
                            key={s}
                            variant="outline"
                            className=" bg-orange-100 text-orange-800 hover:bg-orange-200"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {jobType.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Job Type:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {jobType.map((jt) => (
                          <Badge
                            key={jt}
                            variant="outline"
                            className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                          >
                            {jt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {dateRange && (
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Date Range:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge
                          variant="outline"
                          className="bg-rose-100 text-rose-800 hover:bg-rose-200"
                        >
                          {dateRange}
                        </Badge>
                      </div>
                    </div>
                  )}
                  {searchTerm && (
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Search Term:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {searchTerm}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {!shareLink && (
                <div className="flex gap-2 mt-4">
                  <Button onClick={createShareLink} disabled={isLoading}>
                    {isLoading ? (
                      <>Creating link...</>
                    ) : (
                      <>
                        <Link className="mr-2 h-4 w-4" />
                        Create Share Link
                      </>
                    )}
                  </Button>
                </div>
              )}

              {shareLink && (
                <div className="flex items-center space-x-2">
                  <Input value={shareLink} readOnly className="flex-1" />
                  <Button size="icon" onClick={copyToClipboard}>
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
