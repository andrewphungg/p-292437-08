
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ApiKeyDialogProps {
  onSave: (apiKey: string) => void;
}

export const ApiKeyDialog = ({ onSave }: ApiKeyDialogProps) => {
  // This component is now hidden from users as API key management is handled in backend
  return null;
};
