'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TApplication } from '@/types/application';
import ApplicationForm from './application-form';

interface UpdateApplicationButtonProps {
  application: TApplication;
  children: React.ReactNode;
}

export default function UpdateApplicationButton({
  application,
  children,
}: UpdateApplicationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full h-screen overflow-y-auto sm:rounded-none p-12 pt-8 border-0">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <ApplicationForm
            pageTitle="Update Application"
            // @ts-ignore
            initialData={application}
            onSubmitSuccess={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
