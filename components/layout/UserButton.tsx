"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Pencil, Shield, User, UserRound } from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";

import { signOut } from "next-auth/react";

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="border-2 border-slate-500 dark:border-slate-50">
            <UserRound />
          </AvatarFallback>
        </Avatar>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button className="flex items-center gap-2">
              <User size={18} /> Profile
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button className="flex items-center gap-2">
              <Pencil size={18} /> Create Post
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button className="flex items-center gap-2">
              <FaRegBookmark size={16} /> Bookmark
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button className="flex items-center gap-2">
              <Shield size={18} /> Admin
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserButton;
