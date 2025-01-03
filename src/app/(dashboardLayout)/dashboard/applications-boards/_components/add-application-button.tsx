'use client';

import { useState } from 'react';
import { Plus, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ApplicationForm from './application-form';
import { ShareModal } from './share-modal';

export default function AddApplicationButton({ boardId }: { boardId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <>
          <Button
            variant="outline"
            onClick={() => setIsShareOpen(true)}
            className={cn('text-xs md:text-sm bg-blue-100 hover:bg-blue-200')}
          >
            <Share className="mr-2 h-4 w-4" /> Share
          </Button>
          <ShareModal isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
        </>

        <Button
          onClick={() => setIsOpen(true)}
          className={cn('text-xs md:text-sm')}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full h-screen overflow-y-auto sm:rounded-none p-12 pt-8 border-0">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <ApplicationForm
            pageTitle="Add New Application"
            initialData={null}
            onSubmitSuccess={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
