"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageCircleIcon,
  MoreHorizontal,
  PencilIcon,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import DeleteCollectorDialog from "./delete-collector-dialog";
import { Collector, CollectorStatus } from "@/lib/types";
import CloseCollectorDialog from "./close-collector-dialog";
import OpenCollectorDialog from "./open-collector-dialog";

type CollectorActionsProps = {
  collector: Collector;
};

const CollectorActions = ({ collector }: CollectorActionsProps) => {
  const [deleteCollectorOpen, setDeleteCollectorOpen] = useState(false);
  const [showOpenCollectorModal, setShowOpenCollectorModal] = useState(false);
  const [showCloseCollectorModal, setShowCloseCollectorModal] = useState(false);

  return (
    <>
      <DeleteCollectorDialog
        collector={collector}
        isOpen={deleteCollectorOpen}
        onOpenChange={setDeleteCollectorOpen}
      />
      <CloseCollectorDialog
        collector={collector}
        isOpen={showCloseCollectorModal}
        onOpenChange={setShowCloseCollectorModal}
      />
      <OpenCollectorDialog
        collector={collector}
        isOpen={showOpenCollectorModal}
        onOpenChange={setShowOpenCollectorModal}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Collector actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                if (collector.status === CollectorStatus.open) {
                  setShowCloseCollectorModal(true);
                } else {
                  setShowOpenCollectorModal(true);
                }
              }}
            >
              {collector.status === CollectorStatus.open
                ? "Close collector"
                : "Open collector"}
              <DropdownMenuShortcut>
                <MessageCircleIcon className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edit collector
              <DropdownMenuShortcut>
                <PencilIcon className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setDeleteCollectorOpen(true)}
            className="bg-red-500 text-white focus:bg-red-600 focus:text-white"
          >
            Delete collector
            <DropdownMenuShortcut>
              <Trash2 className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CollectorActions;
