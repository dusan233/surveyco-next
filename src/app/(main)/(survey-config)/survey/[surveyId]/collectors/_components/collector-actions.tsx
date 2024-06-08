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
import DeleteCollectorModal from "./delete-collector-modal";
import CloseCollectorModal from "./close-collector-modal";
import OpenCollectorModal from "./open-collector-modal";
import Link from "next/link";
import { Collector, CollectorStatus } from "@/types/collector";

type CollectorActionsProps = {
  collector: Collector;
};

const CollectorActions = ({ collector }: CollectorActionsProps) => {
  const [deleteCollectorOpen, setDeleteCollectorOpen] = useState(false);
  const [showOpenCollectorModal, setShowOpenCollectorModal] = useState(false);
  const [showCloseCollectorModal, setShowCloseCollectorModal] = useState(false);

  return (
    <>
      <DeleteCollectorModal
        collector={collector}
        isOpen={deleteCollectorOpen}
        onOpenChange={() => setDeleteCollectorOpen((prev) => !prev)}
      />
      <CloseCollectorModal
        collector={collector}
        isOpen={showCloseCollectorModal}
        onOpenChange={() => setShowCloseCollectorModal((prev) => !prev)}
      />
      <OpenCollectorModal
        collector={collector}
        isOpen={showOpenCollectorModal}
        onOpenChange={() => setShowOpenCollectorModal((prev) => !prev)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="icon" size="icon">
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
            <Link
              href={`/survey/${collector.surveyId}/collector/${collector.id}`}
            >
              <DropdownMenuItem>
                Edit collector
                <DropdownMenuShortcut>
                  <PencilIcon className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
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
