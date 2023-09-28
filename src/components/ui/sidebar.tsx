import * as React from "react";
import { useState, ReactNode } from "react";
import Image from 'next/image'; // Assuming you're using Next.js for image handling
import { HamburgerMenuIcon, Cross1Icon, PinLeftIcon, PinRightIcon } from '@radix-ui/react-icons';
import { cn } from "../../lib/utils";

export interface SidebarProps {
  initialOpen?: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  className?: string;
  logo?: string;
  children: ReactNode;
}

export interface SidebarItemProps {
  Icon?: React.ComponentType;
  className?: string;
  title: string;
  href: string;
  disabled?: boolean;
}

const defaultItemClass = "text-foreground hover:bg-accent hover:text-foreground rounded py-2 px-4 w-full";
const defaultSidebarClass = "bg-sidebar text-card-foreground h-full z-50 transition-width duration-300 ease-in-out";

const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, className, title, href, disabled }) => (
  <a href={href} className={cn(defaultItemClass, disabled ? "opacity-50 cursor-not-allowed" : "", className)}>
    {Icon && <Icon />}
    <span>{title}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({
  initialOpen = true,
  openIcon = <PinLeftIcon width={24} height={24} className="mr-2" />,
  closeIcon = <PinRightIcon width={24} height={24} className="m-2" />,
  className,
  logo,
  children
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className={cn("fixed left-0 top-0 h-full overflow-hidden z-50 transition-width duration-300 ease-in-out", isOpen ? "w-96" : "w-16", className || defaultSidebarClass)}>
      <div className="flex flex-col h-full">
        <button className="self-end m-2 transition-all duration-500 ease-in-out" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? openIcon : closeIcon}
        </button>
        <div className={cn("flex flex-col items-start justify-start overflow-y-auto space-y-4 transition-all duration-300 ease-in-out transform", isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0")}>
          {logo && <div className="self-center mb-4 transition-opacity duration-500 ease-in-out"><Image src={logo} alt="logo" width="200" height="200" /></div>}
          {isOpen && children}
        </div>
      </div>
    </div>
  );

};

export { Sidebar, SidebarItem };