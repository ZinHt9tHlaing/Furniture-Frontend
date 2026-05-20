"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Icons } from "../Icons";
import { siteConfig } from "@/config/site";
import { MainNavItem } from "@/types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileNavigationProps {
  items: MainNavItem[];
}

const MobileNavigation = ({ items }: MobileNavigationProps) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const query = "(min-width: 1024px)";

  // check if the screen size is larger than 1024px
  useEffect(() => {
    const onChangeHandler = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    const result = matchMedia(query);
    result.addEventListener("change", onChangeHandler);

    // clean up the event listener
    return () => result.removeEventListener("change", onChangeHandler);
  }, [query]);

  if (isDesktop) {
    return null;
  }

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size={"icon"}
            className="ml-4 size-5 cursor-pointer duration-200 active:scale-90"
          >
            <Icons.menu aria-hidden="true" />
            {/* sr => screen reader */}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[70%] pt-9 pl-7">
          <SheetHeader>
            <SheetClose asChild>
              <Link href={"/"} className="flex items-center gap-2">
                <Icons.logo className="size-5" aria-hidden="true" />
                <SheetTitle>{siteConfig.name}</SheetTitle>
                {/* sr => screen reader */}
                <SheetDescription className="sr-only">Home</SheetDescription>
              </Link>
            </SheetClose>
          </SheetHeader>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8">
            <Accordion type="multiple" className="w-[80%] border-b-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-md">
                  {items?.[0].title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-2">
                    {items?.[0].card?.map((item, index) => (
                      <SheetClose asChild key={index}>
                        <Link
                          href={String(item.href)}
                          className="text-foreground/70"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-4 flex flex-col space-y-2">
              {items?.[0].menu?.map((item, index) => (
                <SheetClose asChild key={index}>
                  <Link href={String(item.href)} className="font-semibold">
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
            {/* <ScrollBar orientation="horizontal" /> */}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
