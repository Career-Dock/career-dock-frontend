'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ApplicationForm from './application-form';

export default function AddApplicationButton({ boardId }: { boardId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn('text-xs md:text-sm')}
      >
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
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
