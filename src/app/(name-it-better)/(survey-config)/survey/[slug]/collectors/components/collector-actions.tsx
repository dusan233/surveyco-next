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
import { Collector } from "@/lib/types";

type CollectorActionsProps = {
  collector: Collector;
};

const CollectorActions = ({ collector }: CollectorActionsProps) => {
  const [deleteCollectorOpen, setDeleteCollectorOpen] = useState(false);

  return (
    <>
      <DeleteCollectorDialog
        collector={collector}
        isOpen={deleteCollectorOpen}
        onOpenChange={setDeleteCollectorOpen}
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
            <DropdownMenuItem>
              Close collector
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
