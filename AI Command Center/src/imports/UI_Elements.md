**UI Elements**



**accordion.tsx**



"use client";



import \* as React from "react";

import \* as AccordionPrimitive from "@radix-ui/react-accordion";

import { ChevronDownIcon } from "lucide-react";



import { cn } from "./utils";



function Accordion({

&#x20; ...props

}: React.ComponentProps<typeof AccordionPrimitive.Root>) {

&#x20; return <AccordionPrimitive.Root data-slot="accordion" {...props} />;

}



function AccordionItem({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AccordionPrimitive.Item>) {

&#x20; return (

&#x20;   <AccordionPrimitive.Item

&#x20;     data-slot="accordion-item"

&#x20;     className={cn("border-b last:border-b-0", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AccordionTrigger({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {

&#x20; return (

&#x20;   <AccordionPrimitive.Header className="flex">

&#x20;     <AccordionPrimitive.Trigger

&#x20;       data-slot="accordion-trigger"

&#x20;       className={cn(

&#x20;         "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-\[3px] disabled:pointer-events-none disabled:opacity-50 \[\&\[data-state=open]>svg]:rotate-180",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     >

&#x20;       {children}

&#x20;       <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />

&#x20;     </AccordionPrimitive.Trigger>

&#x20;   </AccordionPrimitive.Header>

&#x20; );

}



function AccordionContent({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof AccordionPrimitive.Content>) {

&#x20; return (

&#x20;   <AccordionPrimitive.Content

&#x20;     data-slot="accordion-content"

&#x20;     className="data-\[state=closed]:animate-accordion-up data-\[state=open]:animate-accordion-down overflow-hidden text-sm"

&#x20;     {...props}

&#x20;   >

&#x20;     <div className={cn("pt-0 pb-4", className)}>{children}</div>

&#x20;   </AccordionPrimitive.Content>

&#x20; );

}



export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };











**alert.tsx**



import \* as React from "react";

import { cva, type VariantProps } from "class-variance-authority";



import { cn } from "./utils";



const alertVariants = cva(

&#x20; "relative w-full rounded-lg border px-4 py-3 text-sm grid has-\[>svg]:grid-cols-\[calc(var(--spacing)\*4)\_1fr] grid-cols-\[0\_1fr] has-\[>svg]:gap-x-3 gap-y-0.5 items-start \[\&>svg]:size-4 \[\&>svg]:translate-y-0.5 \[\&>svg]:text-current",

&#x20; {

&#x20;   variants: {

&#x20;     variant: {

&#x20;       default: "bg-card text-card-foreground",

&#x20;       destructive:

&#x20;         "text-destructive bg-card \[\&>svg]:text-current \*:data-\[slot=alert-description]:text-destructive/90",

&#x20;     },

&#x20;   },

&#x20;   defaultVariants: {

&#x20;     variant: "default",

&#x20;   },

&#x20; },

);



function Alert({

&#x20; className,

&#x20; variant,

&#x20; ...props

}: React.ComponentProps<"div"> \& VariantProps<typeof alertVariants>) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="alert"

&#x20;     role="alert"

&#x20;     className={cn(alertVariants({ variant }), className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="alert-title"

&#x20;     className={cn(

&#x20;       "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AlertDescription({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="alert-description"

&#x20;     className={cn(

&#x20;       "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm \[\&\_p]:leading-relaxed",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Alert, AlertTitle, AlertDescription };







**alert-dialog.tsx**



"use client";



import \* as React from "react";

import \* as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";



import { cn } from "./utils";

import { buttonVariants } from "./button";



function AlertDialog({

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {

&#x20; return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;

}



function AlertDialogTrigger({

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {

&#x20; return (

&#x20;   <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />

&#x20; );

}



function AlertDialogPortal({

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {

&#x20; return (

&#x20;   <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />

&#x20; );

}



function AlertDialogOverlay({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {

&#x20; return (

&#x20;   <AlertDialogPrimitive.Overlay

&#x20;     data-slot="alert-dialog-overlay"

&#x20;     className={cn(

&#x20;       "data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AlertDialogContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {

&#x20; return (

&#x20;   <AlertDialogPortal>

&#x20;     <AlertDialogOverlay />

&#x20;     <AlertDialogPrimitive.Content

&#x20;       data-slot="alert-dialog-content"

&#x20;       className={cn(

&#x20;         "bg-background data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 fixed top-\[50%] left-\[50%] z-50 grid w-full max-w-\[calc(100%-2rem)] translate-x-\[-50%] translate-y-\[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </AlertDialogPortal>

&#x20; );

}



function AlertDialogHeader({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="alert-dialog-header"

&#x20;     className={cn("flex flex-col gap-2 text-center sm:text-left", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AlertDialogFooter({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="alert-dialog-footer"

&#x20;     className={cn(

&#x20;       "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AlertDialogTitle({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {

&#x20; return (

&#x20;   <AlertDialogPrimitive.Title

&#x20;     data-slot="alert-dialog-title"

&#x20;     className={cn("text-lg font-semibold", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AlertDialogDescription({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {

&#x20; return (

&#x20;   <AlertDialogPrimitive.Description

&#x20;     data-slot="alert-dialog-description"

&#x20;     className={cn("text-muted-foreground text-sm", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AlertDialogAction({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {

&#x20; return (

&#x20;   <AlertDialogPrimitive.Action

&#x20;     className={cn(buttonVariants(), className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AlertDialogCancel({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {

&#x20; return (

&#x20;   <AlertDialogPrimitive.Cancel

&#x20;     className={cn(buttonVariants({ variant: "outline" }), className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; AlertDialog,

&#x20; AlertDialogPortal,

&#x20; AlertDialogOverlay,

&#x20; AlertDialogTrigger,

&#x20; AlertDialogContent,

&#x20; AlertDialogHeader,

&#x20; AlertDialogFooter,

&#x20; AlertDialogTitle,

&#x20; AlertDialogDescription,

&#x20; AlertDialogAction,

&#x20; AlertDialogCancel,

};











**aspect-ratio.tsx**



"use client";



import \* as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";



function AspectRatio({

&#x20; ...props

}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {

&#x20; return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;

}



export { AspectRatio };













**avatar.tsx**



"use client";



import \* as React from "react";

import \* as AvatarPrimitive from "@radix-ui/react-avatar";



import { cn } from "./utils";



function Avatar({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AvatarPrimitive.Root>) {

&#x20; return (

&#x20;   <AvatarPrimitive.Root

&#x20;     data-slot="avatar"

&#x20;     className={cn(

&#x20;       "relative flex size-10 shrink-0 overflow-hidden rounded-full",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AvatarImage({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AvatarPrimitive.Image>) {

&#x20; return (

&#x20;   <AvatarPrimitive.Image

&#x20;     data-slot="avatar-image"

&#x20;     className={cn("aspect-square size-full", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function AvatarFallback({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {

&#x20; return (

&#x20;   <AvatarPrimitive.Fallback

&#x20;     data-slot="avatar-fallback"

&#x20;     className={cn(

&#x20;       "bg-muted flex size-full items-center justify-center rounded-full",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Avatar, AvatarImage, AvatarFallback };













**badge.tsx**



import \* as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cva, type VariantProps } from "class-variance-authority";



import { cn } from "./utils";



const badgeVariants = cva(

&#x20; "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 \[\&>svg]:size-3 gap-1 \[\&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-\[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-\[color,box-shadow] overflow-hidden",

&#x20; {

&#x20;   variants: {

&#x20;     variant: {

&#x20;       default:

&#x20;         "border-transparent bg-primary text-primary-foreground \[a\&]:hover:bg-primary/90",

&#x20;       secondary:

&#x20;         "border-transparent bg-secondary text-secondary-foreground \[a\&]:hover:bg-secondary/90",

&#x20;       destructive:

&#x20;         "border-transparent bg-destructive text-white \[a\&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

&#x20;       outline:

&#x20;         "text-foreground \[a\&]:hover:bg-accent \[a\&]:hover:text-accent-foreground",

&#x20;     },

&#x20;   },

&#x20;   defaultVariants: {

&#x20;     variant: "default",

&#x20;   },

&#x20; },

);



function Badge({

&#x20; className,

&#x20; variant,

&#x20; asChild = false,

&#x20; ...props

}: React.ComponentProps<"span"> \&

&#x20; VariantProps<typeof badgeVariants> \& { asChild?: boolean }) {

&#x20; const Comp = asChild ? Slot : "span";



&#x20; return (

&#x20;   <Comp

&#x20;     data-slot="badge"

&#x20;     className={cn(badgeVariants({ variant }), className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Badge, badgeVariants };

















**breadcrumb.tsx**



import \* as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { ChevronRight, MoreHorizontal } from "lucide-react";



import { cn } from "./utils";



function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {

&#x20; return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;

}



function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {

&#x20; return (

&#x20;   <ol

&#x20;     data-slot="breadcrumb-list"

&#x20;     className={cn(

&#x20;       "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {

&#x20; return (

&#x20;   <li

&#x20;     data-slot="breadcrumb-item"

&#x20;     className={cn("inline-flex items-center gap-1.5", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function BreadcrumbLink({

&#x20; asChild,

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"a"> \& {

&#x20; asChild?: boolean;

}) {

&#x20; const Comp = asChild ? Slot : "a";



&#x20; return (

&#x20;   <Comp

&#x20;     data-slot="breadcrumb-link"

&#x20;     className={cn("hover:text-foreground transition-colors", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {

&#x20; return (

&#x20;   <span

&#x20;     data-slot="breadcrumb-page"

&#x20;     role="link"

&#x20;     aria-disabled="true"

&#x20;     aria-current="page"

&#x20;     className={cn("text-foreground font-normal", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function BreadcrumbSeparator({

&#x20; children,

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"li">) {

&#x20; return (

&#x20;   <li

&#x20;     data-slot="breadcrumb-separator"

&#x20;     role="presentation"

&#x20;     aria-hidden="true"

&#x20;     className={cn("\[\&>svg]:size-3.5", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     {children ?? <ChevronRight />}

&#x20;   </li>

&#x20; );

}



function BreadcrumbEllipsis({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"span">) {

&#x20; return (

&#x20;   <span

&#x20;     data-slot="breadcrumb-ellipsis"

&#x20;     role="presentation"

&#x20;     aria-hidden="true"

&#x20;     className={cn("flex size-9 items-center justify-center", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     <MoreHorizontal className="size-4" />

&#x20;     <span className="sr-only">More</span>

&#x20;   </span>

&#x20; );

}



export {

&#x20; Breadcrumb,

&#x20; BreadcrumbList,

&#x20; BreadcrumbItem,

&#x20; BreadcrumbLink,

&#x20; BreadcrumbPage,

&#x20; BreadcrumbSeparator,

&#x20; BreadcrumbEllipsis,

};



















**button.tsx**



import \* as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cva, type VariantProps } from "class-variance-authority";



import { cn } from "./utils";



const buttonVariants = cva(

&#x20; "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg:not(\[class\*='size-'])]:size-4 shrink-0 \[\&\_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-\[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

&#x20; {

&#x20;   variants: {

&#x20;     variant: {

&#x20;       default: "bg-primary text-primary-foreground hover:bg-primary/90",

&#x20;       destructive:

&#x20;         "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

&#x20;       outline:

&#x20;         "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

&#x20;       secondary:

&#x20;         "bg-secondary text-secondary-foreground hover:bg-secondary/80",

&#x20;       ghost:

&#x20;         "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",

&#x20;       link: "text-primary underline-offset-4 hover:underline",

&#x20;     },

&#x20;     size: {

&#x20;       default: "h-9 px-4 py-2 has-\[>svg]:px-3",

&#x20;       sm: "h-8 rounded-md gap-1.5 px-3 has-\[>svg]:px-2.5",

&#x20;       lg: "h-10 rounded-md px-6 has-\[>svg]:px-4",

&#x20;       icon: "size-9 rounded-md",

&#x20;     },

&#x20;   },

&#x20;   defaultVariants: {

&#x20;     variant: "default",

&#x20;     size: "default",

&#x20;   },

&#x20; },

);



function Button({

&#x20; className,

&#x20; variant,

&#x20; size,

&#x20; asChild = false,

&#x20; ...props

}: React.ComponentProps<"button"> \&

&#x20; VariantProps<typeof buttonVariants> \& {

&#x20;   asChild?: boolean;

&#x20; }) {

&#x20; const Comp = asChild ? Slot : "button";



&#x20; return (

&#x20;   <Comp

&#x20;     data-slot="button"

&#x20;     className={cn(buttonVariants({ variant, size, className }))}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Button, buttonVariants };















**calendar.tsx**



"use client";



import \* as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { DayPicker } from "react-day-picker";



import { cn } from "./utils";

import { buttonVariants } from "./button";



function Calendar({

&#x20; className,

&#x20; classNames,

&#x20; showOutsideDays = true,

&#x20; ...props

}: React.ComponentProps<typeof DayPicker>) {

&#x20; return (

&#x20;   <DayPicker

&#x20;     showOutsideDays={showOutsideDays}

&#x20;     className={cn("p-3", className)}

&#x20;     classNames={{

&#x20;       months: "flex flex-col sm:flex-row gap-2",

&#x20;       month: "flex flex-col gap-4",

&#x20;       caption: "flex justify-center pt-1 relative items-center w-full",

&#x20;       caption\_label: "text-sm font-medium",

&#x20;       nav: "flex items-center gap-1",

&#x20;       nav\_button: cn(

&#x20;         buttonVariants({ variant: "outline" }),

&#x20;         "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",

&#x20;       ),

&#x20;       nav\_button\_previous: "absolute left-1",

&#x20;       nav\_button\_next: "absolute right-1",

&#x20;       table: "w-full border-collapse space-x-1",

&#x20;       head\_row: "flex",

&#x20;       head\_cell:

&#x20;         "text-muted-foreground rounded-md w-8 font-normal text-\[0.8rem]",

&#x20;       row: "flex w-full mt-2",

&#x20;       cell: cn(

&#x20;         "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 \[\&:has(\[aria-selected])]:bg-accent \[\&:has(\[aria-selected].day-range-end)]:rounded-r-md",

&#x20;         props.mode === "range"

&#x20;           ? "\[\&:has(>.day-range-end)]:rounded-r-md \[\&:has(>.day-range-start)]:rounded-l-md first:\[\&:has(\[aria-selected])]:rounded-l-md last:\[\&:has(\[aria-selected])]:rounded-r-md"

&#x20;           : "\[\&:has(\[aria-selected])]:rounded-md",

&#x20;       ),

&#x20;       day: cn(

&#x20;         buttonVariants({ variant: "ghost" }),

&#x20;         "size-8 p-0 font-normal aria-selected:opacity-100",

&#x20;       ),

&#x20;       day\_range\_start:

&#x20;         "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",

&#x20;       day\_range\_end:

&#x20;         "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",

&#x20;       day\_selected:

&#x20;         "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",

&#x20;       day\_today: "bg-accent text-accent-foreground",

&#x20;       day\_outside:

&#x20;         "day-outside text-muted-foreground aria-selected:text-muted-foreground",

&#x20;       day\_disabled: "text-muted-foreground opacity-50",

&#x20;       day\_range\_middle:

&#x20;         "aria-selected:bg-accent aria-selected:text-accent-foreground",

&#x20;       day\_hidden: "invisible",

&#x20;       ...classNames,

&#x20;     }}

&#x20;     components={{

&#x20;       IconLeft: ({ className, ...props }) => (

&#x20;         <ChevronLeft className={cn("size-4", className)} {...props} />

&#x20;       ),

&#x20;       IconRight: ({ className, ...props }) => (

&#x20;         <ChevronRight className={cn("size-4", className)} {...props} />

&#x20;       ),

&#x20;     }}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Calendar };











**card.tsx**



import \* as React from "react";



import { cn } from "./utils";



function Card({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="card"

&#x20;     className={cn(

&#x20;       "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CardHeader({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="card-header"

&#x20;     className={cn(

&#x20;       "@container/card-header grid auto-rows-min grid-rows-\[auto\_auto] items-start gap-1.5 px-6 pt-6 has-data-\[slot=card-action]:grid-cols-\[1fr\_auto] \[.border-b]:pb-6",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CardTitle({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <h4

&#x20;     data-slot="card-title"

&#x20;     className={cn("leading-none", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CardDescription({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <p

&#x20;     data-slot="card-description"

&#x20;     className={cn("text-muted-foreground", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CardAction({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="card-action"

&#x20;     className={cn(

&#x20;       "col-start-2 row-span-2 row-start-1 self-start justify-self-end",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CardContent({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="card-content"

&#x20;     className={cn("px-6 \[\&:last-child]:pb-6", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CardFooter({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="card-footer"

&#x20;     className={cn("flex items-center px-6 pb-6 \[.border-t]:pt-6", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; Card,

&#x20; CardHeader,

&#x20; CardFooter,

&#x20; CardTitle,

&#x20; CardAction,

&#x20; CardDescription,

&#x20; CardContent,

};















**carousel.tsx**



"use client";



import \* as React from "react";

import useEmblaCarousel, {

&#x20; type UseEmblaCarouselType,

} from "embla-carousel-react";

import { ArrowLeft, ArrowRight } from "lucide-react";



import { cn } from "./utils";

import { Button } from "./button";



type CarouselApi = UseEmblaCarouselType\[1];

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

type CarouselOptions = UseCarouselParameters\[0];

type CarouselPlugin = UseCarouselParameters\[1];



type CarouselProps = {

&#x20; opts?: CarouselOptions;

&#x20; plugins?: CarouselPlugin;

&#x20; orientation?: "horizontal" | "vertical";

&#x20; setApi?: (api: CarouselApi) => void;

};



type CarouselContextProps = {

&#x20; carouselRef: ReturnType<typeof useEmblaCarousel>\[0];

&#x20; api: ReturnType<typeof useEmblaCarousel>\[1];

&#x20; scrollPrev: () => void;

&#x20; scrollNext: () => void;

&#x20; canScrollPrev: boolean;

&#x20; canScrollNext: boolean;

} \& CarouselProps;



const CarouselContext = React.createContext<CarouselContextProps | null>(null);



function useCarousel() {

&#x20; const context = React.useContext(CarouselContext);



&#x20; if (!context) {

&#x20;   throw new Error("useCarousel must be used within a <Carousel />");

&#x20; }



&#x20; return context;

}



function Carousel({

&#x20; orientation = "horizontal",

&#x20; opts,

&#x20; setApi,

&#x20; plugins,

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<"div"> \& CarouselProps) {

&#x20; const \[carouselRef, api] = useEmblaCarousel(

&#x20;   {

&#x20;     ...opts,

&#x20;     axis: orientation === "horizontal" ? "x" : "y",

&#x20;   },

&#x20;   plugins,

&#x20; );

&#x20; const \[canScrollPrev, setCanScrollPrev] = React.useState(false);

&#x20; const \[canScrollNext, setCanScrollNext] = React.useState(false);



&#x20; const onSelect = React.useCallback((api: CarouselApi) => {

&#x20;   if (!api) return;

&#x20;   setCanScrollPrev(api.canScrollPrev());

&#x20;   setCanScrollNext(api.canScrollNext());

&#x20; }, \[]);



&#x20; const scrollPrev = React.useCallback(() => {

&#x20;   api?.scrollPrev();

&#x20; }, \[api]);



&#x20; const scrollNext = React.useCallback(() => {

&#x20;   api?.scrollNext();

&#x20; }, \[api]);



&#x20; const handleKeyDown = React.useCallback(

&#x20;   (event: React.KeyboardEvent<HTMLDivElement>) => {

&#x20;     if (event.key === "ArrowLeft") {

&#x20;       event.preventDefault();

&#x20;       scrollPrev();

&#x20;     } else if (event.key === "ArrowRight") {

&#x20;       event.preventDefault();

&#x20;       scrollNext();

&#x20;     }

&#x20;   },

&#x20;   \[scrollPrev, scrollNext],

&#x20; );



&#x20; React.useEffect(() => {

&#x20;   if (!api || !setApi) return;

&#x20;   setApi(api);

&#x20; }, \[api, setApi]);



&#x20; React.useEffect(() => {

&#x20;   if (!api) return;

&#x20;   onSelect(api);

&#x20;   api.on("reInit", onSelect);

&#x20;   api.on("select", onSelect);



&#x20;   return () => {

&#x20;     api?.off("select", onSelect);

&#x20;   };

&#x20; }, \[api, onSelect]);



&#x20; return (

&#x20;   <CarouselContext.Provider

&#x20;     value={{

&#x20;       carouselRef,

&#x20;       api: api,

&#x20;       opts,

&#x20;       orientation:

&#x20;         orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),

&#x20;       scrollPrev,

&#x20;       scrollNext,

&#x20;       canScrollPrev,

&#x20;       canScrollNext,

&#x20;     }}

&#x20;   >

&#x20;     <div

&#x20;       onKeyDownCapture={handleKeyDown}

&#x20;       className={cn("relative", className)}

&#x20;       role="region"

&#x20;       aria-roledescription="carousel"

&#x20;       data-slot="carousel"

&#x20;       {...props}

&#x20;     >

&#x20;       {children}

&#x20;     </div>

&#x20;   </CarouselContext.Provider>

&#x20; );

}



function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {

&#x20; const { carouselRef, orientation } = useCarousel();



&#x20; return (

&#x20;   <div

&#x20;     ref={carouselRef}

&#x20;     className="overflow-hidden"

&#x20;     data-slot="carousel-content"

&#x20;   >

&#x20;     <div

&#x20;       className={cn(

&#x20;         "flex",

&#x20;         orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </div>

&#x20; );

}



function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {

&#x20; const { orientation } = useCarousel();



&#x20; return (

&#x20;   <div

&#x20;     role="group"

&#x20;     aria-roledescription="slide"

&#x20;     data-slot="carousel-item"

&#x20;     className={cn(

&#x20;       "min-w-0 shrink-0 grow-0 basis-full",

&#x20;       orientation === "horizontal" ? "pl-4" : "pt-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CarouselPrevious({

&#x20; className,

&#x20; variant = "outline",

&#x20; size = "icon",

&#x20; ...props

}: React.ComponentProps<typeof Button>) {

&#x20; const { orientation, scrollPrev, canScrollPrev } = useCarousel();



&#x20; return (

&#x20;   <Button

&#x20;     data-slot="carousel-previous"

&#x20;     variant={variant}

&#x20;     size={size}

&#x20;     className={cn(

&#x20;       "absolute size-8 rounded-full",

&#x20;       orientation === "horizontal"

&#x20;         ? "top-1/2 -left-12 -translate-y-1/2"

&#x20;         : "-top-12 left-1/2 -translate-x-1/2 rotate-90",

&#x20;       className,

&#x20;     )}

&#x20;     disabled={!canScrollPrev}

&#x20;     onClick={scrollPrev}

&#x20;     {...props}

&#x20;   >

&#x20;     <ArrowLeft />

&#x20;     <span className="sr-only">Previous slide</span>

&#x20;   </Button>

&#x20; );

}



function CarouselNext({

&#x20; className,

&#x20; variant = "outline",

&#x20; size = "icon",

&#x20; ...props

}: React.ComponentProps<typeof Button>) {

&#x20; const { orientation, scrollNext, canScrollNext } = useCarousel();



&#x20; return (

&#x20;   <Button

&#x20;     data-slot="carousel-next"

&#x20;     variant={variant}

&#x20;     size={size}

&#x20;     className={cn(

&#x20;       "absolute size-8 rounded-full",

&#x20;       orientation === "horizontal"

&#x20;         ? "top-1/2 -right-12 -translate-y-1/2"

&#x20;         : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",

&#x20;       className,

&#x20;     )}

&#x20;     disabled={!canScrollNext}

&#x20;     onClick={scrollNext}

&#x20;     {...props}

&#x20;   >

&#x20;     <ArrowRight />

&#x20;     <span className="sr-only">Next slide</span>

&#x20;   </Button>

&#x20; );

}



export {

&#x20; type CarouselApi,

&#x20; Carousel,

&#x20; CarouselContent,

&#x20; CarouselItem,

&#x20; CarouselPrevious,

&#x20; CarouselNext,

};













**chart.tsx**



"use client";



import \* as React from "react";

import \* as RechartsPrimitive from "recharts";



import { cn } from "./utils";



// Format: { THEME\_NAME: CSS\_SELECTOR }

const THEMES = { light: "", dark: ".dark" } as const;



export type ChartConfig = {

&#x20; \[k in string]: {

&#x20;   label?: React.ReactNode;

&#x20;   icon?: React.ComponentType;

&#x20; } \& (

&#x20;   | { color?: string; theme?: never }

&#x20;   | { color?: never; theme: Record<keyof typeof THEMES, string> }

&#x20; );

};



type ChartContextProps = {

&#x20; config: ChartConfig;

};



const ChartContext = React.createContext<ChartContextProps | null>(null);



function useChart() {

&#x20; const context = React.useContext(ChartContext);



&#x20; if (!context) {

&#x20;   throw new Error("useChart must be used within a <ChartContainer />");

&#x20; }



&#x20; return context;

}



function ChartContainer({

&#x20; id,

&#x20; className,

&#x20; children,

&#x20; config,

&#x20; ...props

}: React.ComponentProps<"div"> \& {

&#x20; config: ChartConfig;

&#x20; children: React.ComponentProps<

&#x20;   typeof RechartsPrimitive.ResponsiveContainer

&#x20; >\["children"];

}) {

&#x20; const uniqueId = React.useId();

&#x20; const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;



&#x20; return (

&#x20;   <ChartContext.Provider value={{ config }}>

&#x20;     <div

&#x20;       data-slot="chart"

&#x20;       data-chart={chartId}

&#x20;       className={cn(

&#x20;         "\[\&\_.recharts-cartesian-axis-tick\_text]:fill-muted-foreground \[\&\_.recharts-cartesian-grid\_line\[stroke='#ccc']]:stroke-border/50 \[\&\_.recharts-curve.recharts-tooltip-cursor]:stroke-border \[\&\_.recharts-polar-grid\_\[stroke='#ccc']]:stroke-border \[\&\_.recharts-radial-bar-background-sector]:fill-muted \[\&\_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted \[\&\_.recharts-reference-line\_\[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs \[\&\_.recharts-dot\[stroke='#fff']]:stroke-transparent \[\&\_.recharts-layer]:outline-hidden \[\&\_.recharts-sector]:outline-hidden \[\&\_.recharts-sector\[stroke='#fff']]:stroke-transparent \[\&\_.recharts-surface]:outline-hidden",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     >

&#x20;       <ChartStyle id={chartId} config={config} />

&#x20;       <RechartsPrimitive.ResponsiveContainer>

&#x20;         {children}

&#x20;       </RechartsPrimitive.ResponsiveContainer>

&#x20;     </div>

&#x20;   </ChartContext.Provider>

&#x20; );

}



const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {

&#x20; const colorConfig = Object.entries(config).filter(

&#x20;   (\[, config]) => config.theme || config.color,

&#x20; );



&#x20; if (!colorConfig.length) {

&#x20;   return null;

&#x20; }



&#x20; return (

&#x20;   <style

&#x20;     dangerouslySetInnerHTML={{

&#x20;       \_\_html: Object.entries(THEMES)

&#x20;         .map(

&#x20;           (\[theme, prefix]) => `

${prefix} \[data-chart=${id}] {

${colorConfig

&#x20; .map((\[key, itemConfig]) => {

&#x20;   const color =

&#x20;     itemConfig.theme?.\[theme as keyof typeof itemConfig.theme] ||

&#x20;     itemConfig.color;

&#x20;   return color ? `  --color-${key}: ${color};` : null;

&#x20; })

&#x20; .join("\\n")}

}

`,

&#x20;         )

&#x20;         .join("\\n"),

&#x20;     }}

&#x20;   />

&#x20; );

};



const ChartTooltip = RechartsPrimitive.Tooltip;



function ChartTooltipContent({

&#x20; active,

&#x20; payload,

&#x20; className,

&#x20; indicator = "dot",

&#x20; hideLabel = false,

&#x20; hideIndicator = false,

&#x20; label,

&#x20; labelFormatter,

&#x20; labelClassName,

&#x20; formatter,

&#x20; color,

&#x20; nameKey,

&#x20; labelKey,

}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> \&

&#x20; React.ComponentProps<"div"> \& {

&#x20;   hideLabel?: boolean;

&#x20;   hideIndicator?: boolean;

&#x20;   indicator?: "line" | "dot" | "dashed";

&#x20;   nameKey?: string;

&#x20;   labelKey?: string;

&#x20; }) {

&#x20; const { config } = useChart();



&#x20; const tooltipLabel = React.useMemo(() => {

&#x20;   if (hideLabel || !payload?.length) {

&#x20;     return null;

&#x20;   }



&#x20;   const \[item] = payload;

&#x20;   const key = `${labelKey || item?.dataKey || item?.name || "value"}`;

&#x20;   const itemConfig = getPayloadConfigFromPayload(config, item, key);

&#x20;   const value =

&#x20;     !labelKey \&\& typeof label === "string"

&#x20;       ? config\[label as keyof typeof config]?.label || label

&#x20;       : itemConfig?.label;



&#x20;   if (labelFormatter) {

&#x20;     return (

&#x20;       <div className={cn("font-medium", labelClassName)}>

&#x20;         {labelFormatter(value, payload)}

&#x20;       </div>

&#x20;     );

&#x20;   }



&#x20;   if (!value) {

&#x20;     return null;

&#x20;   }



&#x20;   return <div className={cn("font-medium", labelClassName)}>{value}</div>;

&#x20; }, \[

&#x20;   label,

&#x20;   labelFormatter,

&#x20;   payload,

&#x20;   hideLabel,

&#x20;   labelClassName,

&#x20;   config,

&#x20;   labelKey,

&#x20; ]);



&#x20; if (!active || !payload?.length) {

&#x20;   return null;

&#x20; }



&#x20; const nestLabel = payload.length === 1 \&\& indicator !== "dot";



&#x20; return (

&#x20;   <div

&#x20;     className={cn(

&#x20;       "border-border/50 bg-background grid min-w-\[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",

&#x20;       className,

&#x20;     )}

&#x20;   >

&#x20;     {!nestLabel ? tooltipLabel : null}

&#x20;     <div className="grid gap-1.5">

&#x20;       {payload.map((item, index) => {

&#x20;         const key = `${nameKey || item.name || item.dataKey || "value"}`;

&#x20;         const itemConfig = getPayloadConfigFromPayload(config, item, key);

&#x20;         const indicatorColor = color || item.payload.fill || item.color;



&#x20;         return (

&#x20;           <div

&#x20;             key={item.dataKey}

&#x20;             className={cn(

&#x20;               "\[\&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 \[\&>svg]:h-2.5 \[\&>svg]:w-2.5",

&#x20;               indicator === "dot" \&\& "items-center",

&#x20;             )}

&#x20;           >

&#x20;             {formatter \&\& item?.value !== undefined \&\& item.name ? (

&#x20;               formatter(item.value, item.name, item, index, item.payload)

&#x20;             ) : (

&#x20;               <>

&#x20;                 {itemConfig?.icon ? (

&#x20;                   <itemConfig.icon />

&#x20;                 ) : (

&#x20;                   !hideIndicator \&\& (

&#x20;                     <div

&#x20;                       className={cn(

&#x20;                         "shrink-0 rounded-\[2px] border-(--color-border) bg-(--color-bg)",

&#x20;                         {

&#x20;                           "h-2.5 w-2.5": indicator === "dot",

&#x20;                           "w-1": indicator === "line",

&#x20;                           "w-0 border-\[1.5px] border-dashed bg-transparent":

&#x20;                             indicator === "dashed",

&#x20;                           "my-0.5": nestLabel \&\& indicator === "dashed",

&#x20;                         },

&#x20;                       )}

&#x20;                       style={

&#x20;                         {

&#x20;                           "--color-bg": indicatorColor,

&#x20;                           "--color-border": indicatorColor,

&#x20;                         } as React.CSSProperties

&#x20;                       }

&#x20;                     />

&#x20;                   )

&#x20;                 )}

&#x20;                 <div

&#x20;                   className={cn(

&#x20;                     "flex flex-1 justify-between leading-none",

&#x20;                     nestLabel ? "items-end" : "items-center",

&#x20;                   )}

&#x20;                 >

&#x20;                   <div className="grid gap-1.5">

&#x20;                     {nestLabel ? tooltipLabel : null}

&#x20;                     <span className="text-muted-foreground">

&#x20;                       {itemConfig?.label || item.name}

&#x20;                     </span>

&#x20;                   </div>

&#x20;                   {item.value \&\& (

&#x20;                     <span className="text-foreground font-mono font-medium tabular-nums">

&#x20;                       {item.value.toLocaleString()}

&#x20;                     </span>

&#x20;                   )}

&#x20;                 </div>

&#x20;               </>

&#x20;             )}

&#x20;           </div>

&#x20;         );

&#x20;       })}

&#x20;     </div>

&#x20;   </div>

&#x20; );

}



const ChartLegend = RechartsPrimitive.Legend;



function ChartLegendContent({

&#x20; className,

&#x20; hideIcon = false,

&#x20; payload,

&#x20; verticalAlign = "bottom",

&#x20; nameKey,

}: React.ComponentProps<"div"> \&

&#x20; Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> \& {

&#x20;   hideIcon?: boolean;

&#x20;   nameKey?: string;

&#x20; }) {

&#x20; const { config } = useChart();



&#x20; if (!payload?.length) {

&#x20;   return null;

&#x20; }



&#x20; return (

&#x20;   <div

&#x20;     className={cn(

&#x20;       "flex items-center justify-center gap-4",

&#x20;       verticalAlign === "top" ? "pb-3" : "pt-3",

&#x20;       className,

&#x20;     )}

&#x20;   >

&#x20;     {payload.map((item) => {

&#x20;       const key = `${nameKey || item.dataKey || "value"}`;

&#x20;       const itemConfig = getPayloadConfigFromPayload(config, item, key);



&#x20;       return (

&#x20;         <div

&#x20;           key={item.value}

&#x20;           className={cn(

&#x20;             "\[\&>svg]:text-muted-foreground flex items-center gap-1.5 \[\&>svg]:h-3 \[\&>svg]:w-3",

&#x20;           )}

&#x20;         >

&#x20;           {itemConfig?.icon \&\& !hideIcon ? (

&#x20;             <itemConfig.icon />

&#x20;           ) : (

&#x20;             <div

&#x20;               className="h-2 w-2 shrink-0 rounded-\[2px]"

&#x20;               style={{

&#x20;                 backgroundColor: item.color,

&#x20;               }}

&#x20;             />

&#x20;           )}

&#x20;           {itemConfig?.label}

&#x20;         </div>

&#x20;       );

&#x20;     })}

&#x20;   </div>

&#x20; );

}



// Helper to extract item config from a payload.

function getPayloadConfigFromPayload(

&#x20; config: ChartConfig,

&#x20; payload: unknown,

&#x20; key: string,

) {

&#x20; if (typeof payload !== "object" || payload === null) {

&#x20;   return undefined;

&#x20; }



&#x20; const payloadPayload =

&#x20;   "payload" in payload \&\&

&#x20;   typeof payload.payload === "object" \&\&

&#x20;   payload.payload !== null

&#x20;     ? payload.payload

&#x20;     : undefined;



&#x20; let configLabelKey: string = key;



&#x20; if (

&#x20;   key in payload \&\&

&#x20;   typeof payload\[key as keyof typeof payload] === "string"

&#x20; ) {

&#x20;   configLabelKey = payload\[key as keyof typeof payload] as string;

&#x20; } else if (

&#x20;   payloadPayload \&\&

&#x20;   key in payloadPayload \&\&

&#x20;   typeof payloadPayload\[key as keyof typeof payloadPayload] === "string"

&#x20; ) {

&#x20;   configLabelKey = payloadPayload\[

&#x20;     key as keyof typeof payloadPayload

&#x20;   ] as string;

&#x20; }



&#x20; return configLabelKey in config

&#x20;   ? config\[configLabelKey]

&#x20;   : config\[key as keyof typeof config];

}



export {

&#x20; ChartContainer,

&#x20; ChartTooltip,

&#x20; ChartTooltipContent,

&#x20; ChartLegend,

&#x20; ChartLegendContent,

&#x20; ChartStyle,

};















**checkbox.tsx**



"use client";



import \* as React from "react";

import \* as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { CheckIcon } from "lucide-react";



import { cn } from "./utils";



function Checkbox({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {

&#x20; return (

&#x20;   <CheckboxPrimitive.Root

&#x20;     data-slot="checkbox"

&#x20;     className={cn(

&#x20;       "peer border bg-input-background dark:bg-input/30 data-\[state=checked]:bg-primary data-\[state=checked]:text-primary-foreground dark:data-\[state=checked]:bg-primary data-\[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-\[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-\[3px] disabled:cursor-not-allowed disabled:opacity-50",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <CheckboxPrimitive.Indicator

&#x20;       data-slot="checkbox-indicator"

&#x20;       className="flex items-center justify-center text-current transition-none"

&#x20;     >

&#x20;       <CheckIcon className="size-3.5" />

&#x20;     </CheckboxPrimitive.Indicator>

&#x20;   </CheckboxPrimitive.Root>

&#x20; );

}



export { Checkbox };















**collapsible.tsx**



"use client";



import \* as CollapsiblePrimitive from "@radix-ui/react-collapsible";



function Collapsible({

&#x20; ...props

}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {

&#x20; return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;

}



function CollapsibleTrigger({

&#x20; ...props

}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {

&#x20; return (

&#x20;   <CollapsiblePrimitive.CollapsibleTrigger

&#x20;     data-slot="collapsible-trigger"

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CollapsibleContent({

&#x20; ...props

}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {

&#x20; return (

&#x20;   <CollapsiblePrimitive.CollapsibleContent

&#x20;     data-slot="collapsible-content"

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Collapsible, CollapsibleTrigger, CollapsibleContent };















**command.tsx**



"use client";



import \* as React from "react";

import { Command as CommandPrimitive } from "cmdk";

import { SearchIcon } from "lucide-react";



import { cn } from "./utils";

import {

&#x20; Dialog,

&#x20; DialogContent,

&#x20; DialogDescription,

&#x20; DialogHeader,

&#x20; DialogTitle,

} from "./dialog";



function Command({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof CommandPrimitive>) {

&#x20; return (

&#x20;   <CommandPrimitive

&#x20;     data-slot="command"

&#x20;     className={cn(

&#x20;       "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CommandDialog({

&#x20; title = "Command Palette",

&#x20; description = "Search for a command to run...",

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof Dialog> \& {

&#x20; title?: string;

&#x20; description?: string;

}) {

&#x20; return (

&#x20;   <Dialog {...props}>

&#x20;     <DialogHeader className="sr-only">

&#x20;       <DialogTitle>{title}</DialogTitle>

&#x20;       <DialogDescription>{description}</DialogDescription>

&#x20;     </DialogHeader>

&#x20;     <DialogContent className="overflow-hidden p-0">

&#x20;       <Command className="\[\&\_\[cmdk-group-heading]]:text-muted-foreground \*\*:data-\[slot=command-input-wrapper]:h-12 \[\&\_\[cmdk-group-heading]]:px-2 \[\&\_\[cmdk-group-heading]]:font-medium \[\&\_\[cmdk-group]]:px-2 \[\&\_\[cmdk-group]:not(\[hidden])\_\~\[cmdk-group]]:pt-0 \[\&\_\[cmdk-input-wrapper]\_svg]:h-5 \[\&\_\[cmdk-input-wrapper]\_svg]:w-5 \[\&\_\[cmdk-input]]:h-12 \[\&\_\[cmdk-item]]:px-2 \[\&\_\[cmdk-item]]:py-3 \[\&\_\[cmdk-item]\_svg]:h-5 \[\&\_\[cmdk-item]\_svg]:w-5">

&#x20;         {children}

&#x20;       </Command>

&#x20;     </DialogContent>

&#x20;   </Dialog>

&#x20; );

}



function CommandInput({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof CommandPrimitive.Input>) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="command-input-wrapper"

&#x20;     className="flex h-9 items-center gap-2 border-b px-3"

&#x20;   >

&#x20;     <SearchIcon className="size-4 shrink-0 opacity-50" />

&#x20;     <CommandPrimitive.Input

&#x20;       data-slot="command-input"

&#x20;       className={cn(

&#x20;         "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </div>

&#x20; );

}



function CommandList({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof CommandPrimitive.List>) {

&#x20; return (

&#x20;   <CommandPrimitive.List

&#x20;     data-slot="command-list"

&#x20;     className={cn(

&#x20;       "max-h-\[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CommandEmpty({

&#x20; ...props

}: React.ComponentProps<typeof CommandPrimitive.Empty>) {

&#x20; return (

&#x20;   <CommandPrimitive.Empty

&#x20;     data-slot="command-empty"

&#x20;     className="py-6 text-center text-sm"

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CommandGroup({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof CommandPrimitive.Group>) {

&#x20; return (

&#x20;   <CommandPrimitive.Group

&#x20;     data-slot="command-group"

&#x20;     className={cn(

&#x20;       "text-foreground \[\&\_\[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 \[\&\_\[cmdk-group-heading]]:px-2 \[\&\_\[cmdk-group-heading]]:py-1.5 \[\&\_\[cmdk-group-heading]]:text-xs \[\&\_\[cmdk-group-heading]]:font-medium",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CommandSeparator({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof CommandPrimitive.Separator>) {

&#x20; return (

&#x20;   <CommandPrimitive.Separator

&#x20;     data-slot="command-separator"

&#x20;     className={cn("bg-border -mx-1 h-px", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CommandItem({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof CommandPrimitive.Item>) {

&#x20; return (

&#x20;   <CommandPrimitive.Item

&#x20;     data-slot="command-item"

&#x20;     className={cn(

&#x20;       "data-\[selected=true]:bg-accent data-\[selected=true]:text-accent-foreground \[\&\_svg:not(\[class\*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-\[disabled=true]:pointer-events-none data-\[disabled=true]:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function CommandShortcut({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"span">) {

&#x20; return (

&#x20;   <span

&#x20;     data-slot="command-shortcut"

&#x20;     className={cn(

&#x20;       "text-muted-foreground ml-auto text-xs tracking-widest",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; Command,

&#x20; CommandDialog,

&#x20; CommandInput,

&#x20; CommandList,

&#x20; CommandEmpty,

&#x20; CommandGroup,

&#x20; CommandItem,

&#x20; CommandShortcut,

&#x20; CommandSeparator,

};











**context-menu.tsx**



"use client";



import \* as React from "react";

import \* as ContextMenuPrimitive from "@radix-ui/react-context-menu";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";



import { cn } from "./utils";



function ContextMenu({

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {

&#x20; return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;

}



function ContextMenuTrigger({

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />

&#x20; );

}



function ContextMenuGroup({

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />

&#x20; );

}



function ContextMenuPortal({

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />

&#x20; );

}



function ContextMenuSub({

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {

&#x20; return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;

}



function ContextMenuRadioGroup({

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.RadioGroup

&#x20;     data-slot="context-menu-radio-group"

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function ContextMenuSubTrigger({

&#x20; className,

&#x20; inset,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> \& {

&#x20; inset?: boolean;

}) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.SubTrigger

&#x20;     data-slot="context-menu-sub-trigger"

&#x20;     data-inset={inset}

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground data-\[state=open]:bg-accent data-\[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-\[inset]:pl-8 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     {children}

&#x20;     <ChevronRightIcon className="ml-auto" />

&#x20;   </ContextMenuPrimitive.SubTrigger>

&#x20; );

}



function ContextMenuSubContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.SubContent

&#x20;     data-slot="context-menu-sub-content"

&#x20;     className={cn(

&#x20;       "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 min-w-\[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function ContextMenuContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.Portal>

&#x20;     <ContextMenuPrimitive.Content

&#x20;       data-slot="context-menu-content"

&#x20;       className={cn(

&#x20;         "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-\[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </ContextMenuPrimitive.Portal>

&#x20; );

}



function ContextMenuItem({

&#x20; className,

&#x20; inset,

&#x20; variant = "default",

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Item> \& {

&#x20; inset?: boolean;

&#x20; variant?: "default" | "destructive";

}) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.Item

&#x20;     data-slot="context-menu-item"

&#x20;     data-inset={inset}

&#x20;     data-variant={variant}

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground data-\[variant=destructive]:text-destructive data-\[variant=destructive]:focus:bg-destructive/10 dark:data-\[variant=destructive]:focus:bg-destructive/20 data-\[variant=destructive]:focus:text-destructive data-\[variant=destructive]:\*:\[svg]:!text-destructive \[\&\_svg:not(\[class\*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 data-\[inset]:pl-8 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function ContextMenuCheckboxItem({

&#x20; className,

&#x20; children,

&#x20; checked,

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.CheckboxItem

&#x20;     data-slot="context-menu-checkbox-item"

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     checked={checked}

&#x20;     {...props}

&#x20;   >

&#x20;     <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">

&#x20;       <ContextMenuPrimitive.ItemIndicator>

&#x20;         <CheckIcon className="size-4" />

&#x20;       </ContextMenuPrimitive.ItemIndicator>

&#x20;     </span>

&#x20;     {children}

&#x20;   </ContextMenuPrimitive.CheckboxItem>

&#x20; );

}



function ContextMenuRadioItem({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.RadioItem

&#x20;     data-slot="context-menu-radio-item"

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">

&#x20;       <ContextMenuPrimitive.ItemIndicator>

&#x20;         <CircleIcon className="size-2 fill-current" />

&#x20;       </ContextMenuPrimitive.ItemIndicator>

&#x20;     </span>

&#x20;     {children}

&#x20;   </ContextMenuPrimitive.RadioItem>

&#x20; );

}



function ContextMenuLabel({

&#x20; className,

&#x20; inset,

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Label> \& {

&#x20; inset?: boolean;

}) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.Label

&#x20;     data-slot="context-menu-label"

&#x20;     data-inset={inset}

&#x20;     className={cn(

&#x20;       "text-foreground px-2 py-1.5 text-sm font-medium data-\[inset]:pl-8",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function ContextMenuSeparator({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {

&#x20; return (

&#x20;   <ContextMenuPrimitive.Separator

&#x20;     data-slot="context-menu-separator"

&#x20;     className={cn("bg-border -mx-1 my-1 h-px", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function ContextMenuShortcut({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"span">) {

&#x20; return (

&#x20;   <span

&#x20;     data-slot="context-menu-shortcut"

&#x20;     className={cn(

&#x20;       "text-muted-foreground ml-auto text-xs tracking-widest",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; ContextMenu,

&#x20; ContextMenuTrigger,

&#x20; ContextMenuContent,

&#x20; ContextMenuItem,

&#x20; ContextMenuCheckboxItem,

&#x20; ContextMenuRadioItem,

&#x20; ContextMenuLabel,

&#x20; ContextMenuSeparator,

&#x20; ContextMenuShortcut,

&#x20; ContextMenuGroup,

&#x20; ContextMenuPortal,

&#x20; ContextMenuSub,

&#x20; ContextMenuSubContent,

&#x20; ContextMenuSubTrigger,

&#x20; ContextMenuRadioGroup,

};







**dialog.tsx**



"use client";



import \* as React from "react";

import \* as DialogPrimitive from "@radix-ui/react-dialog";

import { XIcon } from "lucide-react";



import { cn } from "./utils";



function Dialog({

&#x20; ...props

}: React.ComponentProps<typeof DialogPrimitive.Root>) {

&#x20; return <DialogPrimitive.Root data-slot="dialog" {...props} />;

}



function DialogTrigger({

&#x20; ...props

}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {

&#x20; return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;

}



function DialogPortal({

&#x20; ...props

}: React.ComponentProps<typeof DialogPrimitive.Portal>) {

&#x20; return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;

}



function DialogClose({

&#x20; ...props

}: React.ComponentProps<typeof DialogPrimitive.Close>) {

&#x20; return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;

}



function DialogOverlay({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {

&#x20; return (

&#x20;   <DialogPrimitive.Overlay

&#x20;     data-slot="dialog-overlay"

&#x20;     className={cn(

&#x20;       "data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DialogContent({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof DialogPrimitive.Content>) {

&#x20; return (

&#x20;   <DialogPortal data-slot="dialog-portal">

&#x20;     <DialogOverlay />

&#x20;     <DialogPrimitive.Content

&#x20;       data-slot="dialog-content"

&#x20;       className={cn(

&#x20;         "bg-background data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 fixed top-\[50%] left-\[50%] z-50 grid w-full max-w-\[calc(100%-2rem)] translate-x-\[-50%] translate-y-\[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     >

&#x20;       {children}

&#x20;       <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-\[state=open]:bg-accent data-\[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4">

&#x20;         <XIcon />

&#x20;         <span className="sr-only">Close</span>

&#x20;       </DialogPrimitive.Close>

&#x20;     </DialogPrimitive.Content>

&#x20;   </DialogPortal>

&#x20; );

}



function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="dialog-header"

&#x20;     className={cn("flex flex-col gap-2 text-center sm:text-left", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="dialog-footer"

&#x20;     className={cn(

&#x20;       "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DialogTitle({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof DialogPrimitive.Title>) {

&#x20; return (

&#x20;   <DialogPrimitive.Title

&#x20;     data-slot="dialog-title"

&#x20;     className={cn("text-lg leading-none font-semibold", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DialogDescription({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof DialogPrimitive.Description>) {

&#x20; return (

&#x20;   <DialogPrimitive.Description

&#x20;     data-slot="dialog-description"

&#x20;     className={cn("text-muted-foreground text-sm", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; Dialog,

&#x20; DialogClose,

&#x20; DialogContent,

&#x20; DialogDescription,

&#x20; DialogFooter,

&#x20; DialogHeader,

&#x20; DialogOverlay,

&#x20; DialogPortal,

&#x20; DialogTitle,

&#x20; DialogTrigger,

};









**drawer.tsx**



"use client";



import \* as React from "react";

import { Drawer as DrawerPrimitive } from "vaul";



import { cn } from "./utils";



function Drawer({

&#x20; ...props

}: React.ComponentProps<typeof DrawerPrimitive.Root>) {

&#x20; return <DrawerPrimitive.Root data-slot="drawer" {...props} />;

}



function DrawerTrigger({

&#x20; ...props

}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {

&#x20; return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;

}



function DrawerPortal({

&#x20; ...props

}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {

&#x20; return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;

}



function DrawerClose({

&#x20; ...props

}: React.ComponentProps<typeof DrawerPrimitive.Close>) {

&#x20; return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;

}



function DrawerOverlay({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {

&#x20; return (

&#x20;   <DrawerPrimitive.Overlay

&#x20;     data-slot="drawer-overlay"

&#x20;     className={cn(

&#x20;       "data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DrawerContent({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof DrawerPrimitive.Content>) {

&#x20; return (

&#x20;   <DrawerPortal data-slot="drawer-portal">

&#x20;     <DrawerOverlay />

&#x20;     <DrawerPrimitive.Content

&#x20;       data-slot="drawer-content"

&#x20;       className={cn(

&#x20;         "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",

&#x20;         "data-\[vaul-drawer-direction=top]:inset-x-0 data-\[vaul-drawer-direction=top]:top-0 data-\[vaul-drawer-direction=top]:mb-24 data-\[vaul-drawer-direction=top]:max-h-\[80vh] data-\[vaul-drawer-direction=top]:rounded-b-lg data-\[vaul-drawer-direction=top]:border-b",

&#x20;         "data-\[vaul-drawer-direction=bottom]:inset-x-0 data-\[vaul-drawer-direction=bottom]:bottom-0 data-\[vaul-drawer-direction=bottom]:mt-24 data-\[vaul-drawer-direction=bottom]:max-h-\[80vh] data-\[vaul-drawer-direction=bottom]:rounded-t-lg data-\[vaul-drawer-direction=bottom]:border-t",

&#x20;         "data-\[vaul-drawer-direction=right]:inset-y-0 data-\[vaul-drawer-direction=right]:right-0 data-\[vaul-drawer-direction=right]:w-3/4 data-\[vaul-drawer-direction=right]:border-l data-\[vaul-drawer-direction=right]:sm:max-w-sm",

&#x20;         "data-\[vaul-drawer-direction=left]:inset-y-0 data-\[vaul-drawer-direction=left]:left-0 data-\[vaul-drawer-direction=left]:w-3/4 data-\[vaul-drawer-direction=left]:border-r data-\[vaul-drawer-direction=left]:sm:max-w-sm",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     >

&#x20;       <div className="bg-muted mx-auto mt-4 hidden h-2 w-\[100px] shrink-0 rounded-full group-data-\[vaul-drawer-direction=bottom]/drawer-content:block" />

&#x20;       {children}

&#x20;     </DrawerPrimitive.Content>

&#x20;   </DrawerPortal>

&#x20; );

}



function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="drawer-header"

&#x20;     className={cn("flex flex-col gap-1.5 p-4", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="drawer-footer"

&#x20;     className={cn("mt-auto flex flex-col gap-2 p-4", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DrawerTitle({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof DrawerPrimitive.Title>) {

&#x20; return (

&#x20;   <DrawerPrimitive.Title

&#x20;     data-slot="drawer-title"

&#x20;     className={cn("text-foreground font-semibold", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DrawerDescription({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof DrawerPrimitive.Description>) {

&#x20; return (

&#x20;   <DrawerPrimitive.Description

&#x20;     data-slot="drawer-description"

&#x20;     className={cn("text-muted-foreground text-sm", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; Drawer,

&#x20; DrawerPortal,

&#x20; DrawerOverlay,

&#x20; DrawerTrigger,

&#x20; DrawerClose,

&#x20; DrawerContent,

&#x20; DrawerHeader,

&#x20; DrawerFooter,

&#x20; DrawerTitle,

&#x20; DrawerDescription,

};









**dropdown-menu.tsx**



"use client";



import \* as React from "react";

import \* as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";



import { cn } from "./utils";



function DropdownMenu({

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {

&#x20; return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;

}



function DropdownMenuPortal({

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />

&#x20; );

}



function DropdownMenuTrigger({

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.Trigger

&#x20;     data-slot="dropdown-menu-trigger"

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DropdownMenuContent({

&#x20; className,

&#x20; sideOffset = 4,

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.Portal>

&#x20;     <DropdownMenuPrimitive.Content

&#x20;       data-slot="dropdown-menu-content"

&#x20;       sideOffset={sideOffset}

&#x20;       className={cn(

&#x20;         "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-\[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </DropdownMenuPrimitive.Portal>

&#x20; );

}



function DropdownMenuGroup({

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />

&#x20; );

}



function DropdownMenuItem({

&#x20; className,

&#x20; inset,

&#x20; variant = "default",

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> \& {

&#x20; inset?: boolean;

&#x20; variant?: "default" | "destructive";

}) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.Item

&#x20;     data-slot="dropdown-menu-item"

&#x20;     data-inset={inset}

&#x20;     data-variant={variant}

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground data-\[variant=destructive]:text-destructive data-\[variant=destructive]:focus:bg-destructive/10 dark:data-\[variant=destructive]:focus:bg-destructive/20 data-\[variant=destructive]:focus:text-destructive data-\[variant=destructive]:\*:\[svg]:!text-destructive \[\&\_svg:not(\[class\*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 data-\[inset]:pl-8 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DropdownMenuCheckboxItem({

&#x20; className,

&#x20; children,

&#x20; checked,

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.CheckboxItem

&#x20;     data-slot="dropdown-menu-checkbox-item"

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     checked={checked}

&#x20;     {...props}

&#x20;   >

&#x20;     <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">

&#x20;       <DropdownMenuPrimitive.ItemIndicator>

&#x20;         <CheckIcon className="size-4" />

&#x20;       </DropdownMenuPrimitive.ItemIndicator>

&#x20;     </span>

&#x20;     {children}

&#x20;   </DropdownMenuPrimitive.CheckboxItem>

&#x20; );

}



function DropdownMenuRadioGroup({

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.RadioGroup

&#x20;     data-slot="dropdown-menu-radio-group"

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DropdownMenuRadioItem({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.RadioItem

&#x20;     data-slot="dropdown-menu-radio-item"

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">

&#x20;       <DropdownMenuPrimitive.ItemIndicator>

&#x20;         <CircleIcon className="size-2 fill-current" />

&#x20;       </DropdownMenuPrimitive.ItemIndicator>

&#x20;     </span>

&#x20;     {children}

&#x20;   </DropdownMenuPrimitive.RadioItem>

&#x20; );

}



function DropdownMenuLabel({

&#x20; className,

&#x20; inset,

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> \& {

&#x20; inset?: boolean;

}) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.Label

&#x20;     data-slot="dropdown-menu-label"

&#x20;     data-inset={inset}

&#x20;     className={cn(

&#x20;       "px-2 py-1.5 text-sm font-medium data-\[inset]:pl-8",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DropdownMenuSeparator({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.Separator

&#x20;     data-slot="dropdown-menu-separator"

&#x20;     className={cn("bg-border -mx-1 my-1 h-px", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DropdownMenuShortcut({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"span">) {

&#x20; return (

&#x20;   <span

&#x20;     data-slot="dropdown-menu-shortcut"

&#x20;     className={cn(

&#x20;       "text-muted-foreground ml-auto text-xs tracking-widest",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function DropdownMenuSub({

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {

&#x20; return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;

}



function DropdownMenuSubTrigger({

&#x20; className,

&#x20; inset,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> \& {

&#x20; inset?: boolean;

}) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.SubTrigger

&#x20;     data-slot="dropdown-menu-sub-trigger"

&#x20;     data-inset={inset}

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground data-\[state=open]:bg-accent data-\[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-\[inset]:pl-8",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     {children}

&#x20;     <ChevronRightIcon className="ml-auto size-4" />

&#x20;   </DropdownMenuPrimitive.SubTrigger>

&#x20; );

}



function DropdownMenuSubContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {

&#x20; return (

&#x20;   <DropdownMenuPrimitive.SubContent

&#x20;     data-slot="dropdown-menu-sub-content"

&#x20;     className={cn(

&#x20;       "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 min-w-\[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; DropdownMenu,

&#x20; DropdownMenuPortal,

&#x20; DropdownMenuTrigger,

&#x20; DropdownMenuContent,

&#x20; DropdownMenuGroup,

&#x20; DropdownMenuLabel,

&#x20; DropdownMenuItem,

&#x20; DropdownMenuCheckboxItem,

&#x20; DropdownMenuRadioGroup,

&#x20; DropdownMenuRadioItem,

&#x20; DropdownMenuSeparator,

&#x20; DropdownMenuShortcut,

&#x20; DropdownMenuSub,

&#x20; DropdownMenuSubTrigger,

&#x20; DropdownMenuSubContent,

};









**form.tsx**



"use client";



import \* as React from "react";

import \* as LabelPrimitive from "@radix-ui/react-label";

import { Slot } from "@radix-ui/react-slot";

import {

&#x20; Controller,

&#x20; FormProvider,

&#x20; useFormContext,

&#x20; useFormState,

&#x20; type ControllerProps,

&#x20; type FieldPath,

&#x20; type FieldValues,

} from "react-hook-form";



import { cn } from "./utils";

import { Label } from "./label";



const Form = FormProvider;



type FormFieldContextValue<

&#x20; TFieldValues extends FieldValues = FieldValues,

&#x20; TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,

> = {

&#x20; name: TName;

};



const FormFieldContext = React.createContext<FormFieldContextValue>(

&#x20; {} as FormFieldContextValue,

);



const FormField = <

&#x20; TFieldValues extends FieldValues = FieldValues,

&#x20; TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,

>({

&#x20; ...props

}: ControllerProps<TFieldValues, TName>) => {

&#x20; return (

&#x20;   <FormFieldContext.Provider value={{ name: props.name }}>

&#x20;     <Controller {...props} />

&#x20;   </FormFieldContext.Provider>

&#x20; );

};



const useFormField = () => {

&#x20; const fieldContext = React.useContext(FormFieldContext);

&#x20; const itemContext = React.useContext(FormItemContext);

&#x20; const { getFieldState } = useFormContext();

&#x20; const formState = useFormState({ name: fieldContext.name });

&#x20; const fieldState = getFieldState(fieldContext.name, formState);



&#x20; if (!fieldContext) {

&#x20;   throw new Error("useFormField should be used within <FormField>");

&#x20; }



&#x20; const { id } = itemContext;



&#x20; return {

&#x20;   id,

&#x20;   name: fieldContext.name,

&#x20;   formItemId: `${id}-form-item`,

&#x20;   formDescriptionId: `${id}-form-item-description`,

&#x20;   formMessageId: `${id}-form-item-message`,

&#x20;   ...fieldState,

&#x20; };

};



type FormItemContextValue = {

&#x20; id: string;

};



const FormItemContext = React.createContext<FormItemContextValue>(

&#x20; {} as FormItemContextValue,

);



function FormItem({ className, ...props }: React.ComponentProps<"div">) {

&#x20; const id = React.useId();



&#x20; return (

&#x20;   <FormItemContext.Provider value={{ id }}>

&#x20;     <div

&#x20;       data-slot="form-item"

&#x20;       className={cn("grid gap-2", className)}

&#x20;       {...props}

&#x20;     />

&#x20;   </FormItemContext.Provider>

&#x20; );

}



function FormLabel({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof LabelPrimitive.Root>) {

&#x20; const { error, formItemId } = useFormField();



&#x20; return (

&#x20;   <Label

&#x20;     data-slot="form-label"

&#x20;     data-error={!!error}

&#x20;     className={cn("data-\[error=true]:text-destructive", className)}

&#x20;     htmlFor={formItemId}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {

&#x20; const { error, formItemId, formDescriptionId, formMessageId } =

&#x20;   useFormField();



&#x20; return (

&#x20;   <Slot

&#x20;     data-slot="form-control"

&#x20;     id={formItemId}

&#x20;     aria-describedby={

&#x20;       !error

&#x20;         ? `${formDescriptionId}`

&#x20;         : `${formDescriptionId} ${formMessageId}`

&#x20;     }

&#x20;     aria-invalid={!!error}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function FormDescription({ className, ...props }: React.ComponentProps<"p">) {

&#x20; const { formDescriptionId } = useFormField();



&#x20; return (

&#x20;   <p

&#x20;     data-slot="form-description"

&#x20;     id={formDescriptionId}

&#x20;     className={cn("text-muted-foreground text-sm", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function FormMessage({ className, ...props }: React.ComponentProps<"p">) {

&#x20; const { error, formMessageId } = useFormField();

&#x20; const body = error ? String(error?.message ?? "") : props.children;



&#x20; if (!body) {

&#x20;   return null;

&#x20; }



&#x20; return (

&#x20;   <p

&#x20;     data-slot="form-message"

&#x20;     id={formMessageId}

&#x20;     className={cn("text-destructive text-sm", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     {body}

&#x20;   </p>

&#x20; );

}



export {

&#x20; useFormField,

&#x20; Form,

&#x20; FormItem,

&#x20; FormLabel,

&#x20; FormControl,

&#x20; FormDescription,

&#x20; FormMessage,

&#x20; FormField,

};









**hover-card.tsx**



"use client";



import \* as React from "react";

import \* as HoverCardPrimitive from "@radix-ui/react-hover-card";



import { cn } from "./utils";



function HoverCard({

&#x20; ...props

}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {

&#x20; return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;

}



function HoverCardTrigger({

&#x20; ...props

}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {

&#x20; return (

&#x20;   <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />

&#x20; );

}



function HoverCardContent({

&#x20; className,

&#x20; align = "center",

&#x20; sideOffset = 4,

&#x20; ...props

}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {

&#x20; return (

&#x20;   <HoverCardPrimitive.Portal data-slot="hover-card-portal">

&#x20;     <HoverCardPrimitive.Content

&#x20;       data-slot="hover-card-content"

&#x20;       align={align}

&#x20;       sideOffset={sideOffset}

&#x20;       className={cn(

&#x20;         "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </HoverCardPrimitive.Portal>

&#x20; );

}



export { HoverCard, HoverCardTrigger, HoverCardContent };









**input.tsx**



import \* as React from "react";



import { cn } from "./utils";



function Input({ className, type, ...props }: React.ComponentProps<"input">) {

&#x20; return (

&#x20;   <input

&#x20;     type={type}

&#x20;     data-slot="input"

&#x20;     className={cn(

&#x20;       "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-\[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

&#x20;       "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-\[3px]",

&#x20;       "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Input };











**input-otp.tsx**



"use client";



import \* as React from "react";

import { OTPInput, OTPInputContext } from "input-otp";

import { MinusIcon } from "lucide-react";



import { cn } from "./utils";



function InputOTP({

&#x20; className,

&#x20; containerClassName,

&#x20; ...props

}: React.ComponentProps<typeof OTPInput> \& {

&#x20; containerClassName?: string;

}) {

&#x20; return (

&#x20;   <OTPInput

&#x20;     data-slot="input-otp"

&#x20;     containerClassName={cn(

&#x20;       "flex items-center gap-2 has-disabled:opacity-50",

&#x20;       containerClassName,

&#x20;     )}

&#x20;     className={cn("disabled:cursor-not-allowed", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="input-otp-group"

&#x20;     className={cn("flex items-center gap-1", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function InputOTPSlot({

&#x20; index,

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"div"> \& {

&#x20; index: number;

}) {

&#x20; const inputOTPContext = React.useContext(OTPInputContext);

&#x20; const { char, hasFakeCaret, isActive } = inputOTPContext?.slots\[index] ?? {};



&#x20; return (

&#x20;   <div

&#x20;     data-slot="input-otp-slot"

&#x20;     data-active={isActive}

&#x20;     className={cn(

&#x20;       "data-\[active=true]:border-ring data-\[active=true]:ring-ring/50 data-\[active=true]:aria-invalid:ring-destructive/20 dark:data-\[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-\[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-\[active=true]:z-10 data-\[active=true]:ring-\[3px]",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     {char}

&#x20;     {hasFakeCaret \&\& (

&#x20;       <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

&#x20;         <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />

&#x20;       </div>

&#x20;     )}

&#x20;   </div>

&#x20; );

}



function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div data-slot="input-otp-separator" role="separator" {...props}>

&#x20;     <MinusIcon />

&#x20;   </div>

&#x20; );

}



export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };













**label.tsx**



"use client";



import \* as React from "react";

import \* as LabelPrimitive from "@radix-ui/react-label";



import { cn } from "./utils";



function Label({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof LabelPrimitive.Root>) {

&#x20; return (

&#x20;   <LabelPrimitive.Root

&#x20;     data-slot="label"

&#x20;     className={cn(

&#x20;       "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-\[disabled=true]:pointer-events-none group-data-\[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Label };









**menubar.tsx**



"use client";



import \* as React from "react";

import \* as MenubarPrimitive from "@radix-ui/react-menubar";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";



import { cn } from "./utils";



function Menubar({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Root>) {

&#x20; return (

&#x20;   <MenubarPrimitive.Root

&#x20;     data-slot="menubar"

&#x20;     className={cn(

&#x20;       "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function MenubarMenu({

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {

&#x20; return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;

}



function MenubarGroup({

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Group>) {

&#x20; return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;

}



function MenubarPortal({

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {

&#x20; return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;

}



function MenubarRadioGroup({

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {

&#x20; return (

&#x20;   <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />

&#x20; );

}



function MenubarTrigger({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {

&#x20; return (

&#x20;   <MenubarPrimitive.Trigger

&#x20;     data-slot="menubar-trigger"

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground data-\[state=open]:bg-accent data-\[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function MenubarContent({

&#x20; className,

&#x20; align = "start",

&#x20; alignOffset = -4,

&#x20; sideOffset = 8,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Content>) {

&#x20; return (

&#x20;   <MenubarPortal>

&#x20;     <MenubarPrimitive.Content

&#x20;       data-slot="menubar-content"

&#x20;       align={align}

&#x20;       alignOffset={alignOffset}

&#x20;       sideOffset={sideOffset}

&#x20;       className={cn(

&#x20;         "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 min-w-\[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </MenubarPortal>

&#x20; );

}



function MenubarItem({

&#x20; className,

&#x20; inset,

&#x20; variant = "default",

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Item> \& {

&#x20; inset?: boolean;

&#x20; variant?: "default" | "destructive";

}) {

&#x20; return (

&#x20;   <MenubarPrimitive.Item

&#x20;     data-slot="menubar-item"

&#x20;     data-inset={inset}

&#x20;     data-variant={variant}

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground data-\[variant=destructive]:text-destructive data-\[variant=destructive]:focus:bg-destructive/10 dark:data-\[variant=destructive]:focus:bg-destructive/20 data-\[variant=destructive]:focus:text-destructive data-\[variant=destructive]:\*:\[svg]:!text-destructive \[\&\_svg:not(\[class\*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 data-\[inset]:pl-8 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function MenubarCheckboxItem({

&#x20; className,

&#x20; children,

&#x20; checked,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {

&#x20; return (

&#x20;   <MenubarPrimitive.CheckboxItem

&#x20;     data-slot="menubar-checkbox-item"

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     checked={checked}

&#x20;     {...props}

&#x20;   >

&#x20;     <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">

&#x20;       <MenubarPrimitive.ItemIndicator>

&#x20;         <CheckIcon className="size-4" />

&#x20;       </MenubarPrimitive.ItemIndicator>

&#x20;     </span>

&#x20;     {children}

&#x20;   </MenubarPrimitive.CheckboxItem>

&#x20; );

}



function MenubarRadioItem({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {

&#x20; return (

&#x20;   <MenubarPrimitive.RadioItem

&#x20;     data-slot="menubar-radio-item"

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">

&#x20;       <MenubarPrimitive.ItemIndicator>

&#x20;         <CircleIcon className="size-2 fill-current" />

&#x20;       </MenubarPrimitive.ItemIndicator>

&#x20;     </span>

&#x20;     {children}

&#x20;   </MenubarPrimitive.RadioItem>

&#x20; );

}



function MenubarLabel({

&#x20; className,

&#x20; inset,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Label> \& {

&#x20; inset?: boolean;

}) {

&#x20; return (

&#x20;   <MenubarPrimitive.Label

&#x20;     data-slot="menubar-label"

&#x20;     data-inset={inset}

&#x20;     className={cn(

&#x20;       "px-2 py-1.5 text-sm font-medium data-\[inset]:pl-8",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function MenubarSeparator({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {

&#x20; return (

&#x20;   <MenubarPrimitive.Separator

&#x20;     data-slot="menubar-separator"

&#x20;     className={cn("bg-border -mx-1 my-1 h-px", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function MenubarShortcut({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"span">) {

&#x20; return (

&#x20;   <span

&#x20;     data-slot="menubar-shortcut"

&#x20;     className={cn(

&#x20;       "text-muted-foreground ml-auto text-xs tracking-widest",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function MenubarSub({

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {

&#x20; return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;

}



function MenubarSubTrigger({

&#x20; className,

&#x20; inset,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> \& {

&#x20; inset?: boolean;

}) {

&#x20; return (

&#x20;   <MenubarPrimitive.SubTrigger

&#x20;     data-slot="menubar-sub-trigger"

&#x20;     data-inset={inset}

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground data-\[state=open]:bg-accent data-\[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-\[inset]:pl-8",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     {children}

&#x20;     <ChevronRightIcon className="ml-auto h-4 w-4" />

&#x20;   </MenubarPrimitive.SubTrigger>

&#x20; );

}



function MenubarSubContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {

&#x20; return (

&#x20;   <MenubarPrimitive.SubContent

&#x20;     data-slot="menubar-sub-content"

&#x20;     className={cn(

&#x20;       "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 min-w-\[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; Menubar,

&#x20; MenubarPortal,

&#x20; MenubarMenu,

&#x20; MenubarTrigger,

&#x20; MenubarContent,

&#x20; MenubarGroup,

&#x20; MenubarSeparator,

&#x20; MenubarLabel,

&#x20; MenubarItem,

&#x20; MenubarShortcut,

&#x20; MenubarCheckboxItem,

&#x20; MenubarRadioGroup,

&#x20; MenubarRadioItem,

&#x20; MenubarSub,

&#x20; MenubarSubTrigger,

&#x20; MenubarSubContent,

};







**navigation-menu.tsx**



import \* as React from "react";

import \* as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { cva } from "class-variance-authority";

import { ChevronDownIcon } from "lucide-react";



import { cn } from "./utils";



function NavigationMenu({

&#x20; className,

&#x20; children,

&#x20; viewport = true,

&#x20; ...props

}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> \& {

&#x20; viewport?: boolean;

}) {

&#x20; return (

&#x20;   <NavigationMenuPrimitive.Root

&#x20;     data-slot="navigation-menu"

&#x20;     data-viewport={viewport}

&#x20;     className={cn(

&#x20;       "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     {children}

&#x20;     {viewport \&\& <NavigationMenuViewport />}

&#x20;   </NavigationMenuPrimitive.Root>

&#x20; );

}



function NavigationMenuList({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {

&#x20; return (

&#x20;   <NavigationMenuPrimitive.List

&#x20;     data-slot="navigation-menu-list"

&#x20;     className={cn(

&#x20;       "group flex flex-1 list-none items-center justify-center gap-1",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function NavigationMenuItem({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {

&#x20; return (

&#x20;   <NavigationMenuPrimitive.Item

&#x20;     data-slot="navigation-menu-item"

&#x20;     className={cn("relative", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



const navigationMenuTriggerStyle = cva(

&#x20; "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-\[state=open]:hover:bg-accent data-\[state=open]:text-accent-foreground data-\[state=open]:focus:bg-accent data-\[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-\[color,box-shadow] focus-visible:ring-\[3px] focus-visible:outline-1",

);



function NavigationMenuTrigger({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {

&#x20; return (

&#x20;   <NavigationMenuPrimitive.Trigger

&#x20;     data-slot="navigation-menu-trigger"

&#x20;     className={cn(navigationMenuTriggerStyle(), "group", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     {children}{" "}

&#x20;     <ChevronDownIcon

&#x20;       className="relative top-\[1px] ml-1 size-3 transition duration-300 group-data-\[state=open]:rotate-180"

&#x20;       aria-hidden="true"

&#x20;     />

&#x20;   </NavigationMenuPrimitive.Trigger>

&#x20; );

}



function NavigationMenuContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {

&#x20; return (

&#x20;   <NavigationMenuPrimitive.Content

&#x20;     data-slot="navigation-menu-content"

&#x20;     className={cn(

&#x20;       "data-\[motion^=from-]:animate-in data-\[motion^=to-]:animate-out data-\[motion^=from-]:fade-in data-\[motion^=to-]:fade-out data-\[motion=from-end]:slide-in-from-right-52 data-\[motion=from-start]:slide-in-from-left-52 data-\[motion=to-end]:slide-out-to-right-52 data-\[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",

&#x20;       "group-data-\[viewport=false]/navigation-menu:bg-popover group-data-\[viewport=false]/navigation-menu:text-popover-foreground group-data-\[viewport=false]/navigation-menu:data-\[state=open]:animate-in group-data-\[viewport=false]/navigation-menu:data-\[state=closed]:animate-out group-data-\[viewport=false]/navigation-menu:data-\[state=closed]:zoom-out-95 group-data-\[viewport=false]/navigation-menu:data-\[state=open]:zoom-in-95 group-data-\[viewport=false]/navigation-menu:data-\[state=open]:fade-in-0 group-data-\[viewport=false]/navigation-menu:data-\[state=closed]:fade-out-0 group-data-\[viewport=false]/navigation-menu:top-full group-data-\[viewport=false]/navigation-menu:mt-1.5 group-data-\[viewport=false]/navigation-menu:overflow-hidden group-data-\[viewport=false]/navigation-menu:rounded-md group-data-\[viewport=false]/navigation-menu:border group-data-\[viewport=false]/navigation-menu:shadow group-data-\[viewport=false]/navigation-menu:duration-200 \*\*:data-\[slot=navigation-menu-link]:focus:ring-0 \*\*:data-\[slot=navigation-menu-link]:focus:outline-none",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function NavigationMenuViewport({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {

&#x20; return (

&#x20;   <div

&#x20;     className={cn(

&#x20;       "absolute top-full left-0 isolate z-50 flex justify-center",

&#x20;     )}

&#x20;   >

&#x20;     <NavigationMenuPrimitive.Viewport

&#x20;       data-slot="navigation-menu-viewport"

&#x20;       className={cn(

&#x20;         "origin-top-center bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-90 relative mt-1.5 h-\[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-\[var(--radix-navigation-menu-viewport-width)]",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </div>

&#x20; );

}



function NavigationMenuLink({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {

&#x20; return (

&#x20;   <NavigationMenuPrimitive.Link

&#x20;     data-slot="navigation-menu-link"

&#x20;     className={cn(

&#x20;       "data-\[active=true]:focus:bg-accent data-\[active=true]:hover:bg-accent data-\[active=true]:bg-accent/50 data-\[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 \[\&\_svg:not(\[class\*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-\[3px] focus-visible:outline-1 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function NavigationMenuIndicator({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {

&#x20; return (

&#x20;   <NavigationMenuPrimitive.Indicator

&#x20;     data-slot="navigation-menu-indicator"

&#x20;     className={cn(

&#x20;       "data-\[state=visible]:animate-in data-\[state=hidden]:animate-out data-\[state=hidden]:fade-out data-\[state=visible]:fade-in top-full z-\[1] flex h-1.5 items-end justify-center overflow-hidden",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <div className="bg-border relative top-\[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />

&#x20;   </NavigationMenuPrimitive.Indicator>

&#x20; );

}



export {

&#x20; NavigationMenu,

&#x20; NavigationMenuList,

&#x20; NavigationMenuItem,

&#x20; NavigationMenuContent,

&#x20; NavigationMenuTrigger,

&#x20; NavigationMenuLink,

&#x20; NavigationMenuIndicator,

&#x20; NavigationMenuViewport,

&#x20; navigationMenuTriggerStyle,

};







**pagination.tsx**



import \* as React from "react";

import {

&#x20; ChevronLeftIcon,

&#x20; ChevronRightIcon,

&#x20; MoreHorizontalIcon,

} from "lucide-react";



import { cn } from "./utils";

import { Button, buttonVariants } from "./button";



function Pagination({ className, ...props }: React.ComponentProps<"nav">) {

&#x20; return (

&#x20;   <nav

&#x20;     role="navigation"

&#x20;     aria-label="pagination"

&#x20;     data-slot="pagination"

&#x20;     className={cn("mx-auto flex w-full justify-center", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function PaginationContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"ul">) {

&#x20; return (

&#x20;   <ul

&#x20;     data-slot="pagination-content"

&#x20;     className={cn("flex flex-row items-center gap-1", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function PaginationItem({ ...props }: React.ComponentProps<"li">) {

&#x20; return <li data-slot="pagination-item" {...props} />;

}



type PaginationLinkProps = {

&#x20; isActive?: boolean;

} \& Pick<React.ComponentProps<typeof Button>, "size"> \&

&#x20; React.ComponentProps<"a">;



function PaginationLink({

&#x20; className,

&#x20; isActive,

&#x20; size = "icon",

&#x20; ...props

}: PaginationLinkProps) {

&#x20; return (

&#x20;   <a

&#x20;     aria-current={isActive ? "page" : undefined}

&#x20;     data-slot="pagination-link"

&#x20;     data-active={isActive}

&#x20;     className={cn(

&#x20;       buttonVariants({

&#x20;         variant: isActive ? "outline" : "ghost",

&#x20;         size,

&#x20;       }),

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function PaginationPrevious({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof PaginationLink>) {

&#x20; return (

&#x20;   <PaginationLink

&#x20;     aria-label="Go to previous page"

&#x20;     size="default"

&#x20;     className={cn("gap-1 px-2.5 sm:pl-2.5", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     <ChevronLeftIcon />

&#x20;     <span className="hidden sm:block">Previous</span>

&#x20;   </PaginationLink>

&#x20; );

}



function PaginationNext({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof PaginationLink>) {

&#x20; return (

&#x20;   <PaginationLink

&#x20;     aria-label="Go to next page"

&#x20;     size="default"

&#x20;     className={cn("gap-1 px-2.5 sm:pr-2.5", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     <span className="hidden sm:block">Next</span>

&#x20;     <ChevronRightIcon />

&#x20;   </PaginationLink>

&#x20; );

}



function PaginationEllipsis({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"span">) {

&#x20; return (

&#x20;   <span

&#x20;     aria-hidden

&#x20;     data-slot="pagination-ellipsis"

&#x20;     className={cn("flex size-9 items-center justify-center", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     <MoreHorizontalIcon className="size-4" />

&#x20;     <span className="sr-only">More pages</span>

&#x20;   </span>

&#x20; );

}



export {

&#x20; Pagination,

&#x20; PaginationContent,

&#x20; PaginationLink,

&#x20; PaginationItem,

&#x20; PaginationPrevious,

&#x20; PaginationNext,

&#x20; PaginationEllipsis,

};









**popover.tsx**



"use client";



import \* as React from "react";

import \* as PopoverPrimitive from "@radix-ui/react-popover";



import { cn } from "./utils";



function Popover({

&#x20; ...props

}: React.ComponentProps<typeof PopoverPrimitive.Root>) {

&#x20; return <PopoverPrimitive.Root data-slot="popover" {...props} />;

}



function PopoverTrigger({

&#x20; ...props

}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {

&#x20; return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;

}



function PopoverContent({

&#x20; className,

&#x20; align = "center",

&#x20; sideOffset = 4,

&#x20; ...props

}: React.ComponentProps<typeof PopoverPrimitive.Content>) {

&#x20; return (

&#x20;   <PopoverPrimitive.Portal>

&#x20;     <PopoverPrimitive.Content

&#x20;       data-slot="popover-content"

&#x20;       align={align}

&#x20;       sideOffset={sideOffset}

&#x20;       className={cn(

&#x20;         "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     />

&#x20;   </PopoverPrimitive.Portal>

&#x20; );

}



function PopoverAnchor({

&#x20; ...props

}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {

&#x20; return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;

}



export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };









**progress.tsx**



"use client";



import \* as React from "react";

import \* as ProgressPrimitive from "@radix-ui/react-progress";



import { cn } from "./utils";



function Progress({

&#x20; className,

&#x20; value,

&#x20; ...props

}: React.ComponentProps<typeof ProgressPrimitive.Root>) {

&#x20; return (

&#x20;   <ProgressPrimitive.Root

&#x20;     data-slot="progress"

&#x20;     className={cn(

&#x20;       "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <ProgressPrimitive.Indicator

&#x20;       data-slot="progress-indicator"

&#x20;       className="bg-primary h-full w-full flex-1 transition-all"

&#x20;       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}

&#x20;     />

&#x20;   </ProgressPrimitive.Root>

&#x20; );

}



export { Progress };









**radio-group.tsx**



"use client";



import \* as React from "react";

import \* as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { CircleIcon } from "lucide-react";



import { cn } from "./utils";



function RadioGroup({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {

&#x20; return (

&#x20;   <RadioGroupPrimitive.Root

&#x20;     data-slot="radio-group"

&#x20;     className={cn("grid gap-3", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function RadioGroupItem({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {

&#x20; return (

&#x20;   <RadioGroupPrimitive.Item

&#x20;     data-slot="radio-group-item"

&#x20;     className={cn(

&#x20;       "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-\[color,box-shadow] outline-none focus-visible:ring-\[3px] disabled:cursor-not-allowed disabled:opacity-50",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <RadioGroupPrimitive.Indicator

&#x20;       data-slot="radio-group-indicator"

&#x20;       className="relative flex items-center justify-center"

&#x20;     >

&#x20;       <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />

&#x20;     </RadioGroupPrimitive.Indicator>

&#x20;   </RadioGroupPrimitive.Item>

&#x20; );

}



export { RadioGroup, RadioGroupItem };









**resizable.tsx**



"use client";



import \* as React from "react";

import { GripVerticalIcon } from "lucide-react";

import \* as ResizablePrimitive from "react-resizable-panels";



import { cn } from "./utils";



function ResizablePanelGroup({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {

&#x20; return (

&#x20;   <ResizablePrimitive.PanelGroup

&#x20;     data-slot="resizable-panel-group"

&#x20;     className={cn(

&#x20;       "flex h-full w-full data-\[panel-group-direction=vertical]:flex-col",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function ResizablePanel({

&#x20; ...props

}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {

&#x20; return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;

}



function ResizableHandle({

&#x20; withHandle,

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> \& {

&#x20; withHandle?: boolean;

}) {

&#x20; return (

&#x20;   <ResizablePrimitive.PanelResizeHandle

&#x20;     data-slot="resizable-handle"

&#x20;     className={cn(

&#x20;       "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-\[panel-group-direction=vertical]:h-px data-\[panel-group-direction=vertical]:w-full data-\[panel-group-direction=vertical]:after:left-0 data-\[panel-group-direction=vertical]:after:h-1 data-\[panel-group-direction=vertical]:after:w-full data-\[panel-group-direction=vertical]:after:-translate-y-1/2 data-\[panel-group-direction=vertical]:after:translate-x-0 \[\&\[data-panel-group-direction=vertical]>div]:rotate-90",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     {withHandle \&\& (

&#x20;       <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">

&#x20;         <GripVerticalIcon className="size-2.5" />

&#x20;       </div>

&#x20;     )}

&#x20;   </ResizablePrimitive.PanelResizeHandle>

&#x20; );

}



export { ResizablePanelGroup, ResizablePanel, ResizableHandle };









**scroll-area.tsx**



"use client";



import \* as React from "react";

import \* as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";



import { cn } from "./utils";



function ScrollArea({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {

&#x20; return (

&#x20;   <ScrollAreaPrimitive.Root

&#x20;     data-slot="scroll-area"

&#x20;     className={cn("relative", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     <ScrollAreaPrimitive.Viewport

&#x20;       data-slot="scroll-area-viewport"

&#x20;       className="focus-visible:ring-ring/50 size-full rounded-\[inherit] transition-\[color,box-shadow] outline-none focus-visible:ring-\[3px] focus-visible:outline-1"

&#x20;     >

&#x20;       {children}

&#x20;     </ScrollAreaPrimitive.Viewport>

&#x20;     <ScrollBar />

&#x20;     <ScrollAreaPrimitive.Corner />

&#x20;   </ScrollAreaPrimitive.Root>

&#x20; );

}



function ScrollBar({

&#x20; className,

&#x20; orientation = "vertical",

&#x20; ...props

}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {

&#x20; return (

&#x20;   <ScrollAreaPrimitive.ScrollAreaScrollbar

&#x20;     data-slot="scroll-area-scrollbar"

&#x20;     orientation={orientation}

&#x20;     className={cn(

&#x20;       "flex touch-none p-px transition-colors select-none",

&#x20;       orientation === "vertical" \&\&

&#x20;         "h-full w-2.5 border-l border-l-transparent",

&#x20;       orientation === "horizontal" \&\&

&#x20;         "h-2.5 flex-col border-t border-t-transparent",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <ScrollAreaPrimitive.ScrollAreaThumb

&#x20;       data-slot="scroll-area-thumb"

&#x20;       className="bg-border relative flex-1 rounded-full"

&#x20;     />

&#x20;   </ScrollAreaPrimitive.ScrollAreaScrollbar>

&#x20; );

}



export { ScrollArea, ScrollBar };









**select.tsx**



"use client";



import \* as React from "react";

import \* as SelectPrimitive from "@radix-ui/react-select";

import {

&#x20; CheckIcon,

&#x20; ChevronDownIcon,

&#x20; ChevronUpIcon,

} from "lucide-react";



import { cn } from "./utils";



function Select({

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.Root>) {

&#x20; return <SelectPrimitive.Root data-slot="select" {...props} />;

}



function SelectGroup({

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.Group>) {

&#x20; return <SelectPrimitive.Group data-slot="select-group" {...props} />;

}



function SelectValue({

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.Value>) {

&#x20; return <SelectPrimitive.Value data-slot="select-value" {...props} />;

}



function SelectTrigger({

&#x20; className,

&#x20; size = "default",

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.Trigger> \& {

&#x20; size?: "sm" | "default";

}) {

&#x20; return (

&#x20;   <SelectPrimitive.Trigger

&#x20;     data-slot="select-trigger"

&#x20;     data-size={size}

&#x20;     className={cn(

&#x20;       "border-input data-\[placeholder]:text-muted-foreground \[\&\_svg:not(\[class\*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-\[color,box-shadow] outline-none focus-visible:ring-\[3px] disabled:cursor-not-allowed disabled:opacity-50 data-\[size=default]:h-9 data-\[size=sm]:h-8 \*:data-\[slot=select-value]:line-clamp-1 \*:data-\[slot=select-value]:flex \*:data-\[slot=select-value]:items-center \*:data-\[slot=select-value]:gap-2 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     {children}

&#x20;     <SelectPrimitive.Icon asChild>

&#x20;       <ChevronDownIcon className="size-4 opacity-50" />

&#x20;     </SelectPrimitive.Icon>

&#x20;   </SelectPrimitive.Trigger>

&#x20; );

}



function SelectContent({

&#x20; className,

&#x20; children,

&#x20; position = "popper",

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.Content>) {

&#x20; return (

&#x20;   <SelectPrimitive.Portal>

&#x20;     <SelectPrimitive.Content

&#x20;       data-slot="select-content"

&#x20;       className={cn(

&#x20;         "bg-popover text-popover-foreground data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 data-\[state=closed]:zoom-out-95 data-\[state=open]:zoom-in-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-\[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",

&#x20;         position === "popper" \&\&

&#x20;           "data-\[side=bottom]:translate-y-1 data-\[side=left]:-translate-x-1 data-\[side=right]:translate-x-1 data-\[side=top]:-translate-y-1",

&#x20;         className,

&#x20;       )}

&#x20;       position={position}

&#x20;       {...props}

&#x20;     >

&#x20;       <SelectScrollUpButton />

&#x20;       <SelectPrimitive.Viewport

&#x20;         className={cn(

&#x20;           "p-1",

&#x20;           position === "popper" \&\&

&#x20;             "h-\[var(--radix-select-trigger-height)] w-full min-w-\[var(--radix-select-trigger-width)] scroll-my-1",

&#x20;         )}

&#x20;       >

&#x20;         {children}

&#x20;       </SelectPrimitive.Viewport>

&#x20;       <SelectScrollDownButton />

&#x20;     </SelectPrimitive.Content>

&#x20;   </SelectPrimitive.Portal>

&#x20; );

}



function SelectLabel({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.Label>) {

&#x20; return (

&#x20;   <SelectPrimitive.Label

&#x20;     data-slot="select-label"

&#x20;     className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SelectItem({

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.Item>) {

&#x20; return (

&#x20;   <SelectPrimitive.Item

&#x20;     data-slot="select-item"

&#x20;     className={cn(

&#x20;       "focus:bg-accent focus:text-accent-foreground \[\&\_svg:not(\[class\*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-\[disabled]:pointer-events-none data-\[disabled]:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4 \*:\[span]:last:flex \*:\[span]:last:items-center \*:\[span]:last:gap-2",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <span className="absolute right-2 flex size-3.5 items-center justify-center">

&#x20;       <SelectPrimitive.ItemIndicator>

&#x20;         <CheckIcon className="size-4" />

&#x20;       </SelectPrimitive.ItemIndicator>

&#x20;     </span>

&#x20;     <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

&#x20;   </SelectPrimitive.Item>

&#x20; );

}



function SelectSeparator({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.Separator>) {

&#x20; return (

&#x20;   <SelectPrimitive.Separator

&#x20;     data-slot="select-separator"

&#x20;     className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SelectScrollUpButton({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {

&#x20; return (

&#x20;   <SelectPrimitive.ScrollUpButton

&#x20;     data-slot="select-scroll-up-button"

&#x20;     className={cn(

&#x20;       "flex cursor-default items-center justify-center py-1",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <ChevronUpIcon className="size-4" />

&#x20;   </SelectPrimitive.ScrollUpButton>

&#x20; );

}



function SelectScrollDownButton({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {

&#x20; return (

&#x20;   <SelectPrimitive.ScrollDownButton

&#x20;     data-slot="select-scroll-down-button"

&#x20;     className={cn(

&#x20;       "flex cursor-default items-center justify-center py-1",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <ChevronDownIcon className="size-4" />

&#x20;   </SelectPrimitive.ScrollDownButton>

&#x20; );

}



export {

&#x20; Select,

&#x20; SelectContent,

&#x20; SelectGroup,

&#x20; SelectItem,

&#x20; SelectLabel,

&#x20; SelectScrollDownButton,

&#x20; SelectScrollUpButton,

&#x20; SelectSeparator,

&#x20; SelectTrigger,

&#x20; SelectValue,

};









**separator.tsx**



"use client";



import \* as React from "react";

import \* as SeparatorPrimitive from "@radix-ui/react-separator";



import { cn } from "./utils";



function Separator({

&#x20; className,

&#x20; orientation = "horizontal",

&#x20; decorative = true,

&#x20; ...props

}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {

&#x20; return (

&#x20;   <SeparatorPrimitive.Root

&#x20;     data-slot="separator-root"

&#x20;     decorative={decorative}

&#x20;     orientation={orientation}

&#x20;     className={cn(

&#x20;       "bg-border shrink-0 data-\[orientation=horizontal]:h-px data-\[orientation=horizontal]:w-full data-\[orientation=vertical]:h-full data-\[orientation=vertical]:w-px",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Separator };









**sheet.tsx**



"use client";



import \* as React from "react";

import \* as SheetPrimitive from "@radix-ui/react-dialog";

import { XIcon } from "lucide-react";



import { cn } from "./utils";



function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {

&#x20; return <SheetPrimitive.Root data-slot="sheet" {...props} />;

}



function SheetTrigger({

&#x20; ...props

}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {

&#x20; return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;

}



function SheetClose({

&#x20; ...props

}: React.ComponentProps<typeof SheetPrimitive.Close>) {

&#x20; return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;

}



function SheetPortal({

&#x20; ...props

}: React.ComponentProps<typeof SheetPrimitive.Portal>) {

&#x20; return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;

}



function SheetOverlay({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {

&#x20; return (

&#x20;   <SheetPrimitive.Overlay

&#x20;     data-slot="sheet-overlay"

&#x20;     className={cn(

&#x20;       "data-\[state=open]:animate-in data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SheetContent({

&#x20; className,

&#x20; children,

&#x20; side = "right",

&#x20; ...props

}: React.ComponentProps<typeof SheetPrimitive.Content> \& {

&#x20; side?: "top" | "right" | "bottom" | "left";

}) {

&#x20; return (

&#x20;   <SheetPortal>

&#x20;     <SheetOverlay />

&#x20;     <SheetPrimitive.Content

&#x20;       data-slot="sheet-content"

&#x20;       className={cn(

&#x20;         "bg-background data-\[state=open]:animate-in data-\[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-\[state=closed]:duration-300 data-\[state=open]:duration-500",

&#x20;         side === "right" \&\&

&#x20;           "data-\[state=closed]:slide-out-to-right data-\[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",

&#x20;         side === "left" \&\&

&#x20;           "data-\[state=closed]:slide-out-to-left data-\[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",

&#x20;         side === "top" \&\&

&#x20;           "data-\[state=closed]:slide-out-to-top data-\[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",

&#x20;         side === "bottom" \&\&

&#x20;           "data-\[state=closed]:slide-out-to-bottom data-\[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     >

&#x20;       {children}

&#x20;       <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-\[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">

&#x20;         <XIcon className="size-4" />

&#x20;         <span className="sr-only">Close</span>

&#x20;       </SheetPrimitive.Close>

&#x20;     </SheetPrimitive.Content>

&#x20;   </SheetPortal>

&#x20; );

}



function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="sheet-header"

&#x20;     className={cn("flex flex-col gap-1.5 p-4", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="sheet-footer"

&#x20;     className={cn("mt-auto flex flex-col gap-2 p-4", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SheetTitle({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof SheetPrimitive.Title>) {

&#x20; return (

&#x20;   <SheetPrimitive.Title

&#x20;     data-slot="sheet-title"

&#x20;     className={cn("text-foreground font-semibold", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SheetDescription({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof SheetPrimitive.Description>) {

&#x20; return (

&#x20;   <SheetPrimitive.Description

&#x20;     data-slot="sheet-description"

&#x20;     className={cn("text-muted-foreground text-sm", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; Sheet,

&#x20; SheetTrigger,

&#x20; SheetClose,

&#x20; SheetContent,

&#x20; SheetHeader,

&#x20; SheetFooter,

&#x20; SheetTitle,

&#x20; SheetDescription,

};









**sidebar.tsx**



"use client";



import \* as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { VariantProps, cva } from "class-variance-authority";

import { PanelLeftIcon } from "lucide-react";



import { useIsMobile } from "./use-mobile";

import { cn } from "./utils";

import { Button } from "./button";

import { Input } from "./input";

import { Separator } from "./separator";

import {

&#x20; Sheet,

&#x20; SheetContent,

&#x20; SheetDescription,

&#x20; SheetHeader,

&#x20; SheetTitle,

} from "./sheet";

import { Skeleton } from "./skeleton";

import {

&#x20; Tooltip,

&#x20; TooltipContent,

&#x20; TooltipProvider,

&#x20; TooltipTrigger,

} from "./tooltip";



const SIDEBAR\_COOKIE\_NAME = "sidebar\_state";

const SIDEBAR\_COOKIE\_MAX\_AGE = 60 \* 60 \* 24 \* 7;

const SIDEBAR\_WIDTH = "16rem";

const SIDEBAR\_WIDTH\_MOBILE = "18rem";

const SIDEBAR\_WIDTH\_ICON = "3rem";

const SIDEBAR\_KEYBOARD\_SHORTCUT = "b";



type SidebarContextProps = {

&#x20; state: "expanded" | "collapsed";

&#x20; open: boolean;

&#x20; setOpen: (open: boolean) => void;

&#x20; openMobile: boolean;

&#x20; setOpenMobile: (open: boolean) => void;

&#x20; isMobile: boolean;

&#x20; toggleSidebar: () => void;

};



const SidebarContext = React.createContext<SidebarContextProps | null>(null);



function useSidebar() {

&#x20; const context = React.useContext(SidebarContext);

&#x20; if (!context) {

&#x20;   throw new Error("useSidebar must be used within a SidebarProvider.");

&#x20; }



&#x20; return context;

}



function SidebarProvider({

&#x20; defaultOpen = true,

&#x20; open: openProp,

&#x20; onOpenChange: setOpenProp,

&#x20; className,

&#x20; style,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<"div"> \& {

&#x20; defaultOpen?: boolean;

&#x20; open?: boolean;

&#x20; onOpenChange?: (open: boolean) => void;

}) {

&#x20; const isMobile = useIsMobile();

&#x20; const \[openMobile, setOpenMobile] = React.useState(false);



&#x20; // This is the internal state of the sidebar.

&#x20; // We use openProp and setOpenProp for control from outside the component.

&#x20; const \[\_open, \_setOpen] = React.useState(defaultOpen);

&#x20; const open = openProp ?? \_open;

&#x20; const setOpen = React.useCallback(

&#x20;   (value: boolean | ((value: boolean) => boolean)) => {

&#x20;     const openState = typeof value === "function" ? value(open) : value;

&#x20;     if (setOpenProp) {

&#x20;       setOpenProp(openState);

&#x20;     } else {

&#x20;       \_setOpen(openState);

&#x20;     }



&#x20;     // This sets the cookie to keep the sidebar state.

&#x20;     document.cookie = `${SIDEBAR\_COOKIE\_NAME}=${openState}; path=/; max-age=${SIDEBAR\_COOKIE\_MAX\_AGE}`;

&#x20;   },

&#x20;   \[setOpenProp, open],

&#x20; );



&#x20; // Helper to toggle the sidebar.

&#x20; const toggleSidebar = React.useCallback(() => {

&#x20;   return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);

&#x20; }, \[isMobile, setOpen, setOpenMobile]);



&#x20; // Adds a keyboard shortcut to toggle the sidebar.

&#x20; React.useEffect(() => {

&#x20;   const handleKeyDown = (event: KeyboardEvent) => {

&#x20;     if (

&#x20;       event.key === SIDEBAR\_KEYBOARD\_SHORTCUT \&\&

&#x20;       (event.metaKey || event.ctrlKey)

&#x20;     ) {

&#x20;       event.preventDefault();

&#x20;       toggleSidebar();

&#x20;     }

&#x20;   };



&#x20;   window.addEventListener("keydown", handleKeyDown);

&#x20;   return () => window.removeEventListener("keydown", handleKeyDown);

&#x20; }, \[toggleSidebar]);



&#x20; // We add a state so that we can do data-state="expanded" or "collapsed".

&#x20; // This makes it easier to style the sidebar with Tailwind classes.

&#x20; const state = open ? "expanded" : "collapsed";



&#x20; const contextValue = React.useMemo<SidebarContextProps>(

&#x20;   () => ({

&#x20;     state,

&#x20;     open,

&#x20;     setOpen,

&#x20;     isMobile,

&#x20;     openMobile,

&#x20;     setOpenMobile,

&#x20;     toggleSidebar,

&#x20;   }),

&#x20;   \[state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],

&#x20; );



&#x20; return (

&#x20;   <SidebarContext.Provider value={contextValue}>

&#x20;     <TooltipProvider delayDuration={0}>

&#x20;       <div

&#x20;         data-slot="sidebar-wrapper"

&#x20;         style={

&#x20;           {

&#x20;             "--sidebar-width": SIDEBAR\_WIDTH,

&#x20;             "--sidebar-width-icon": SIDEBAR\_WIDTH\_ICON,

&#x20;             ...style,

&#x20;           } as React.CSSProperties

&#x20;         }

&#x20;         className={cn(

&#x20;           "group/sidebar-wrapper has-data-\[variant=inset]:bg-sidebar flex min-h-svh w-full",

&#x20;           className,

&#x20;         )}

&#x20;         {...props}

&#x20;       >

&#x20;         {children}

&#x20;       </div>

&#x20;     </TooltipProvider>

&#x20;   </SidebarContext.Provider>

&#x20; );

}



function Sidebar({

&#x20; side = "left",

&#x20; variant = "sidebar",

&#x20; collapsible = "offcanvas",

&#x20; className,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<"div"> \& {

&#x20; side?: "left" | "right";

&#x20; variant?: "sidebar" | "floating" | "inset";

&#x20; collapsible?: "offcanvas" | "icon" | "none";

}) {

&#x20; const { isMobile, state, openMobile, setOpenMobile } = useSidebar();



&#x20; if (collapsible === "none") {

&#x20;   return (

&#x20;     <div

&#x20;       data-slot="sidebar"

&#x20;       className={cn(

&#x20;         "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     >

&#x20;       {children}

&#x20;     </div>

&#x20;   );

&#x20; }



&#x20; if (isMobile) {

&#x20;   return (

&#x20;     <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>

&#x20;       <SheetContent

&#x20;         data-sidebar="sidebar"

&#x20;         data-slot="sidebar"

&#x20;         data-mobile="true"

&#x20;         className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 \[\&>button]:hidden"

&#x20;         style={

&#x20;           {

&#x20;             "--sidebar-width": SIDEBAR\_WIDTH\_MOBILE,

&#x20;           } as React.CSSProperties

&#x20;         }

&#x20;         side={side}

&#x20;       >

&#x20;         <SheetHeader className="sr-only">

&#x20;           <SheetTitle>Sidebar</SheetTitle>

&#x20;           <SheetDescription>Displays the mobile sidebar.</SheetDescription>

&#x20;         </SheetHeader>

&#x20;         <div className="flex h-full w-full flex-col">{children}</div>

&#x20;       </SheetContent>

&#x20;     </Sheet>

&#x20;   );

&#x20; }



&#x20; return (

&#x20;   <div

&#x20;     className="group peer text-sidebar-foreground hidden md:block"

&#x20;     data-state={state}

&#x20;     data-collapsible={state === "collapsed" ? collapsible : ""}

&#x20;     data-variant={variant}

&#x20;     data-side={side}

&#x20;     data-slot="sidebar"

&#x20;   >

&#x20;     {/\* This is what handles the sidebar gap on desktop \*/}

&#x20;     <div

&#x20;       data-slot="sidebar-gap"

&#x20;       className={cn(

&#x20;         "relative w-(--sidebar-width) bg-transparent transition-\[width] duration-200 ease-linear",

&#x20;         "group-data-\[collapsible=offcanvas]:w-0",

&#x20;         "group-data-\[side=right]:rotate-180",

&#x20;         variant === "floating" || variant === "inset"

&#x20;           ? "group-data-\[collapsible=icon]:w-\[calc(var(--sidebar-width-icon)+(--spacing(4)))]"

&#x20;           : "group-data-\[collapsible=icon]:w-(--sidebar-width-icon)",

&#x20;       )}

&#x20;     />

&#x20;     <div

&#x20;       data-slot="sidebar-container"

&#x20;       className={cn(

&#x20;         "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-\[left,right,width] duration-200 ease-linear md:flex",

&#x20;         side === "left"

&#x20;           ? "left-0 group-data-\[collapsible=offcanvas]:left-\[calc(var(--sidebar-width)\*-1)]"

&#x20;           : "right-0 group-data-\[collapsible=offcanvas]:right-\[calc(var(--sidebar-width)\*-1)]",

&#x20;         // Adjust the padding for floating and inset variants.

&#x20;         variant === "floating" || variant === "inset"

&#x20;           ? "p-2 group-data-\[collapsible=icon]:w-\[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"

&#x20;           : "group-data-\[collapsible=icon]:w-(--sidebar-width-icon) group-data-\[side=left]:border-r group-data-\[side=right]:border-l",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     >

&#x20;       <div

&#x20;         data-sidebar="sidebar"

&#x20;         data-slot="sidebar-inner"

&#x20;         className="bg-sidebar group-data-\[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-\[variant=floating]:rounded-lg group-data-\[variant=floating]:border group-data-\[variant=floating]:shadow-sm"

&#x20;       >

&#x20;         {children}

&#x20;       </div>

&#x20;     </div>

&#x20;   </div>

&#x20; );

}



function SidebarTrigger({

&#x20; className,

&#x20; onClick,

&#x20; ...props

}: React.ComponentProps<typeof Button>) {

&#x20; const { toggleSidebar } = useSidebar();



&#x20; return (

&#x20;   <Button

&#x20;     data-sidebar="trigger"

&#x20;     data-slot="sidebar-trigger"

&#x20;     variant="ghost"

&#x20;     size="icon"

&#x20;     className={cn("size-7", className)}

&#x20;     onClick={(event) => {

&#x20;       onClick?.(event);

&#x20;       toggleSidebar();

&#x20;     }}

&#x20;     {...props}

&#x20;   >

&#x20;     <PanelLeftIcon />

&#x20;     <span className="sr-only">Toggle Sidebar</span>

&#x20;   </Button>

&#x20; );

}



function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {

&#x20; const { toggleSidebar } = useSidebar();



&#x20; return (

&#x20;   <button

&#x20;     data-sidebar="rail"

&#x20;     data-slot="sidebar-rail"

&#x20;     aria-label="Toggle Sidebar"

&#x20;     tabIndex={-1}

&#x20;     onClick={toggleSidebar}

&#x20;     title="Toggle Sidebar"

&#x20;     className={cn(

&#x20;       "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-\[side=left]:-right-4 group-data-\[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-\[2px] sm:flex",

&#x20;       "in-data-\[side=left]:cursor-w-resize in-data-\[side=right]:cursor-e-resize",

&#x20;       "\[\[data-side=left]\[data-state=collapsed]\_\&]:cursor-e-resize \[\[data-side=right]\[data-state=collapsed]\_\&]:cursor-w-resize",

&#x20;       "hover:group-data-\[collapsible=offcanvas]:bg-sidebar group-data-\[collapsible=offcanvas]:translate-x-0 group-data-\[collapsible=offcanvas]:after:left-full",

&#x20;       "\[\[data-side=left]\[data-collapsible=offcanvas]\_\&]:-right-2",

&#x20;       "\[\[data-side=right]\[data-collapsible=offcanvas]\_\&]:-left-2",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {

&#x20; return (

&#x20;   <main

&#x20;     data-slot="sidebar-inset"

&#x20;     className={cn(

&#x20;       "bg-background relative flex w-full flex-1 flex-col",

&#x20;       "md:peer-data-\[variant=inset]:m-2 md:peer-data-\[variant=inset]:ml-0 md:peer-data-\[variant=inset]:rounded-xl md:peer-data-\[variant=inset]:shadow-sm md:peer-data-\[variant=inset]:peer-data-\[state=collapsed]:ml-2",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarInput({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof Input>) {

&#x20; return (

&#x20;   <Input

&#x20;     data-slot="sidebar-input"

&#x20;     data-sidebar="input"

&#x20;     className={cn("bg-background h-8 w-full shadow-none", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="sidebar-header"

&#x20;     data-sidebar="header"

&#x20;     className={cn("flex flex-col gap-2 p-2", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="sidebar-footer"

&#x20;     data-sidebar="footer"

&#x20;     className={cn("flex flex-col gap-2 p-2", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarSeparator({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof Separator>) {

&#x20; return (

&#x20;   <Separator

&#x20;     data-slot="sidebar-separator"

&#x20;     data-sidebar="separator"

&#x20;     className={cn("bg-sidebar-border mx-2 w-auto", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="sidebar-content"

&#x20;     data-sidebar="content"

&#x20;     className={cn(

&#x20;       "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-\[collapsible=icon]:overflow-hidden",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="sidebar-group"

&#x20;     data-sidebar="group"

&#x20;     className={cn("relative flex w-full min-w-0 flex-col p-2", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarGroupLabel({

&#x20; className,

&#x20; asChild = false,

&#x20; ...props

}: React.ComponentProps<"div"> \& { asChild?: boolean }) {

&#x20; const Comp = asChild ? Slot : "div";



&#x20; return (

&#x20;   <Comp

&#x20;     data-slot="sidebar-group-label"

&#x20;     data-sidebar="group-label"

&#x20;     className={cn(

&#x20;       "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-\[margin,opacity] duration-200 ease-linear focus-visible:ring-2 \[\&>svg]:size-4 \[\&>svg]:shrink-0",

&#x20;       "group-data-\[collapsible=icon]:-mt-8 group-data-\[collapsible=icon]:opacity-0",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarGroupAction({

&#x20; className,

&#x20; asChild = false,

&#x20; ...props

}: React.ComponentProps<"button"> \& { asChild?: boolean }) {

&#x20; const Comp = asChild ? Slot : "button";



&#x20; return (

&#x20;   <Comp

&#x20;     data-slot="sidebar-group-action"

&#x20;     data-sidebar="group-action"

&#x20;     className={cn(

&#x20;       "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 \[\&>svg]:size-4 \[\&>svg]:shrink-0",

&#x20;       // Increases the hit area of the button on mobile.

&#x20;       "after:absolute after:-inset-2 md:after:hidden",

&#x20;       "group-data-\[collapsible=icon]:hidden",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarGroupContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="sidebar-group-content"

&#x20;     data-sidebar="group-content"

&#x20;     className={cn("w-full text-sm", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {

&#x20; return (

&#x20;   <ul

&#x20;     data-slot="sidebar-menu"

&#x20;     data-sidebar="menu"

&#x20;     className={cn("flex w-full min-w-0 flex-col gap-1", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {

&#x20; return (

&#x20;   <li

&#x20;     data-slot="sidebar-menu-item"

&#x20;     data-sidebar="menu-item"

&#x20;     className={cn("group/menu-item relative", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



const sidebarMenuButtonVariants = cva(

&#x20; "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-\[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-\[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-\[active=true]:bg-sidebar-accent data-\[active=true]:font-medium data-\[active=true]:text-sidebar-accent-foreground data-\[state=open]:hover:bg-sidebar-accent data-\[state=open]:hover:text-sidebar-accent-foreground group-data-\[collapsible=icon]:size-8! group-data-\[collapsible=icon]:p-2! \[\&>span:last-child]:truncate \[\&>svg]:size-4 \[\&>svg]:shrink-0",

&#x20; {

&#x20;   variants: {

&#x20;     variant: {

&#x20;       default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",

&#x20;       outline:

&#x20;         "bg-background shadow-\[0\_0\_0\_1px\_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-\[0\_0\_0\_1px\_hsl(var(--sidebar-accent))]",

&#x20;     },

&#x20;     size: {

&#x20;       default: "h-8 text-sm",

&#x20;       sm: "h-7 text-xs",

&#x20;       lg: "h-12 text-sm group-data-\[collapsible=icon]:p-0!",

&#x20;     },

&#x20;   },

&#x20;   defaultVariants: {

&#x20;     variant: "default",

&#x20;     size: "default",

&#x20;   },

&#x20; },

);



function SidebarMenuButton({

&#x20; asChild = false,

&#x20; isActive = false,

&#x20; variant = "default",

&#x20; size = "default",

&#x20; tooltip,

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"button"> \& {

&#x20; asChild?: boolean;

&#x20; isActive?: boolean;

&#x20; tooltip?: string | React.ComponentProps<typeof TooltipContent>;

} \& VariantProps<typeof sidebarMenuButtonVariants>) {

&#x20; const Comp = asChild ? Slot : "button";

&#x20; const { isMobile, state } = useSidebar();



&#x20; const button = (

&#x20;   <Comp

&#x20;     data-slot="sidebar-menu-button"

&#x20;     data-sidebar="menu-button"

&#x20;     data-size={size}

&#x20;     data-active={isActive}

&#x20;     className={cn(sidebarMenuButtonVariants({ variant, size }), className)}

&#x20;     {...props}

&#x20;   />

&#x20; );



&#x20; if (!tooltip) {

&#x20;   return button;

&#x20; }



&#x20; if (typeof tooltip === "string") {

&#x20;   tooltip = {

&#x20;     children: tooltip,

&#x20;   };

&#x20; }



&#x20; return (

&#x20;   <Tooltip>

&#x20;     <TooltipTrigger asChild>{button}</TooltipTrigger>

&#x20;     <TooltipContent

&#x20;       side="right"

&#x20;       align="center"

&#x20;       hidden={state !== "collapsed" || isMobile}

&#x20;       {...tooltip}

&#x20;     />

&#x20;   </Tooltip>

&#x20; );

}



function SidebarMenuAction({

&#x20; className,

&#x20; asChild = false,

&#x20; showOnHover = false,

&#x20; ...props

}: React.ComponentProps<"button"> \& {

&#x20; asChild?: boolean;

&#x20; showOnHover?: boolean;

}) {

&#x20; const Comp = asChild ? Slot : "button";



&#x20; return (

&#x20;   <Comp

&#x20;     data-slot="sidebar-menu-action"

&#x20;     data-sidebar="menu-action"

&#x20;     className={cn(

&#x20;       "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 \[\&>svg]:size-4 \[\&>svg]:shrink-0",

&#x20;       // Increases the hit area of the button on mobile.

&#x20;       "after:absolute after:-inset-2 md:after:hidden",

&#x20;       "peer-data-\[size=sm]/menu-button:top-1",

&#x20;       "peer-data-\[size=default]/menu-button:top-1.5",

&#x20;       "peer-data-\[size=lg]/menu-button:top-2.5",

&#x20;       "group-data-\[collapsible=icon]:hidden",

&#x20;       showOnHover \&\&

&#x20;         "peer-data-\[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-\[state=open]:opacity-100 md:opacity-0",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarMenuBadge({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="sidebar-menu-badge"

&#x20;     data-sidebar="menu-badge"

&#x20;     className={cn(

&#x20;       "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",

&#x20;       "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-\[active=true]/menu-button:text-sidebar-accent-foreground",

&#x20;       "peer-data-\[size=sm]/menu-button:top-1",

&#x20;       "peer-data-\[size=default]/menu-button:top-1.5",

&#x20;       "peer-data-\[size=lg]/menu-button:top-2.5",

&#x20;       "group-data-\[collapsible=icon]:hidden",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarMenuSkeleton({

&#x20; className,

&#x20; showIcon = false,

&#x20; ...props

}: React.ComponentProps<"div"> \& {

&#x20; showIcon?: boolean;

}) {

&#x20; // Random width between 50 to 90%.

&#x20; const width = React.useMemo(() => {

&#x20;   return `${Math.floor(Math.random() \* 40) + 50}%`;

&#x20; }, \[]);



&#x20; return (

&#x20;   <div

&#x20;     data-slot="sidebar-menu-skeleton"

&#x20;     data-sidebar="menu-skeleton"

&#x20;     className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}

&#x20;     {...props}

&#x20;   >

&#x20;     {showIcon \&\& (

&#x20;       <Skeleton

&#x20;         className="size-4 rounded-md"

&#x20;         data-sidebar="menu-skeleton-icon"

&#x20;       />

&#x20;     )}

&#x20;     <Skeleton

&#x20;       className="h-4 max-w-(--skeleton-width) flex-1"

&#x20;       data-sidebar="menu-skeleton-text"

&#x20;       style={

&#x20;         {

&#x20;           "--skeleton-width": width,

&#x20;         } as React.CSSProperties

&#x20;       }

&#x20;     />

&#x20;   </div>

&#x20; );

}



function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {

&#x20; return (

&#x20;   <ul

&#x20;     data-slot="sidebar-menu-sub"

&#x20;     data-sidebar="menu-sub"

&#x20;     className={cn(

&#x20;       "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",

&#x20;       "group-data-\[collapsible=icon]:hidden",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarMenuSubItem({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"li">) {

&#x20; return (

&#x20;   <li

&#x20;     data-slot="sidebar-menu-sub-item"

&#x20;     data-sidebar="menu-sub-item"

&#x20;     className={cn("group/menu-sub-item relative", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function SidebarMenuSubButton({

&#x20; asChild = false,

&#x20; size = "md",

&#x20; isActive = false,

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"a"> \& {

&#x20; asChild?: boolean;

&#x20; size?: "sm" | "md";

&#x20; isActive?: boolean;

}) {

&#x20; const Comp = asChild ? Slot : "a";



&#x20; return (

&#x20;   <Comp

&#x20;     data-slot="sidebar-menu-sub-button"

&#x20;     data-sidebar="menu-sub-button"

&#x20;     data-size={size}

&#x20;     data-active={isActive}

&#x20;     className={cn(

&#x20;       "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground \[\&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 \[\&>span:last-child]:truncate \[\&>svg]:size-4 \[\&>svg]:shrink-0",

&#x20;       "data-\[active=true]:bg-sidebar-accent data-\[active=true]:text-sidebar-accent-foreground",

&#x20;       size === "sm" \&\& "text-xs",

&#x20;       size === "md" \&\& "text-sm",

&#x20;       "group-data-\[collapsible=icon]:hidden",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; Sidebar,

&#x20; SidebarContent,

&#x20; SidebarFooter,

&#x20; SidebarGroup,

&#x20; SidebarGroupAction,

&#x20; SidebarGroupContent,

&#x20; SidebarGroupLabel,

&#x20; SidebarHeader,

&#x20; SidebarInput,

&#x20; SidebarInset,

&#x20; SidebarMenu,

&#x20; SidebarMenuAction,

&#x20; SidebarMenuBadge,

&#x20; SidebarMenuButton,

&#x20; SidebarMenuItem,

&#x20; SidebarMenuSkeleton,

&#x20; SidebarMenuSub,

&#x20; SidebarMenuSubButton,

&#x20; SidebarMenuSubItem,

&#x20; SidebarProvider,

&#x20; SidebarRail,

&#x20; SidebarSeparator,

&#x20; SidebarTrigger,

&#x20; useSidebar,

};











**skeleton.tsx**



import { cn } from "./utils";



function Skeleton({ className, ...props }: React.ComponentProps<"div">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="skeleton"

&#x20;     className={cn("bg-accent animate-pulse rounded-md", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Skeleton };















**slider.tsx**



"use client";



import \* as React from "react";

import \* as SliderPrimitive from "@radix-ui/react-slider";



import { cn } from "./utils";



function Slider({

&#x20; className,

&#x20; defaultValue,

&#x20; value,

&#x20; min = 0,

&#x20; max = 100,

&#x20; ...props

}: React.ComponentProps<typeof SliderPrimitive.Root>) {

&#x20; const \_values = React.useMemo(

&#x20;   () =>

&#x20;     Array.isArray(value)

&#x20;       ? value

&#x20;       : Array.isArray(defaultValue)

&#x20;         ? defaultValue

&#x20;         : \[min, max],

&#x20;   \[value, defaultValue, min, max],

&#x20; );



&#x20; return (

&#x20;   <SliderPrimitive.Root

&#x20;     data-slot="slider"

&#x20;     defaultValue={defaultValue}

&#x20;     value={value}

&#x20;     min={min}

&#x20;     max={max}

&#x20;     className={cn(

&#x20;       "relative flex w-full touch-none items-center select-none data-\[disabled]:opacity-50 data-\[orientation=vertical]:h-full data-\[orientation=vertical]:min-h-44 data-\[orientation=vertical]:w-auto data-\[orientation=vertical]:flex-col",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <SliderPrimitive.Track

&#x20;       data-slot="slider-track"

&#x20;       className={cn(

&#x20;         "bg-muted relative grow overflow-hidden rounded-full data-\[orientation=horizontal]:h-4 data-\[orientation=horizontal]:w-full data-\[orientation=vertical]:h-full data-\[orientation=vertical]:w-1.5",

&#x20;       )}

&#x20;     >

&#x20;       <SliderPrimitive.Range

&#x20;         data-slot="slider-range"

&#x20;         className={cn(

&#x20;           "bg-primary absolute data-\[orientation=horizontal]:h-full data-\[orientation=vertical]:w-full",

&#x20;         )}

&#x20;       />

&#x20;     </SliderPrimitive.Track>

&#x20;     {Array.from({ length: \_values.length }, (\_, index) => (

&#x20;       <SliderPrimitive.Thumb

&#x20;         data-slot="slider-thumb"

&#x20;         key={index}

&#x20;         className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-\[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"

&#x20;       />

&#x20;     ))}

&#x20;   </SliderPrimitive.Root>

&#x20; );

}



export { Slider };













**sonner.tsx**



"use client";



import { useTheme } from "next-themes";

import { Toaster as Sonner, ToasterProps } from "sonner";



const Toaster = ({ ...props }: ToasterProps) => {

&#x20; const { theme = "system" } = useTheme();



&#x20; return (

&#x20;   <Sonner

&#x20;     theme={theme as ToasterProps\["theme"]}

&#x20;     className="toaster group"

&#x20;     style={

&#x20;       {

&#x20;         "--normal-bg": "var(--popover)",

&#x20;         "--normal-text": "var(--popover-foreground)",

&#x20;         "--normal-border": "var(--border)",

&#x20;       } as React.CSSProperties

&#x20;     }

&#x20;     {...props}

&#x20;   />

&#x20; );

};



export { Toaster };















**switch.tsx**



"use client";



import \* as React from "react";

import \* as SwitchPrimitive from "@radix-ui/react-switch";



import { cn } from "./utils";



function Switch({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof SwitchPrimitive.Root>) {

&#x20; return (

&#x20;   <SwitchPrimitive.Root

&#x20;     data-slot="switch"

&#x20;     className={cn(

&#x20;       "peer data-\[state=checked]:bg-primary data-\[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-\[state=unchecked]:bg-input/80 inline-flex h-\[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-\[3px] disabled:cursor-not-allowed disabled:opacity-50",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <SwitchPrimitive.Thumb

&#x20;       data-slot="switch-thumb"

&#x20;       className={cn(

&#x20;         "bg-card dark:data-\[state=unchecked]:bg-card-foreground dark:data-\[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-\[state=checked]:translate-x-\[calc(100%-2px)] data-\[state=unchecked]:translate-x-0",

&#x20;       )}

&#x20;     />

&#x20;   </SwitchPrimitive.Root>

&#x20; );

}



export { Switch };

















**table.tsx**



"use client";



import \* as React from "react";



import { cn } from "./utils";



function Table({ className, ...props }: React.ComponentProps<"table">) {

&#x20; return (

&#x20;   <div

&#x20;     data-slot="table-container"

&#x20;     className="relative w-full overflow-x-auto"

&#x20;   >

&#x20;     <table

&#x20;       data-slot="table"

&#x20;       className={cn("w-full caption-bottom text-sm", className)}

&#x20;       {...props}

&#x20;     />

&#x20;   </div>

&#x20; );

}



function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {

&#x20; return (

&#x20;   <thead

&#x20;     data-slot="table-header"

&#x20;     className={cn("\[\&\_tr]:border-b", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {

&#x20; return (

&#x20;   <tbody

&#x20;     data-slot="table-body"

&#x20;     className={cn("\[\&\_tr:last-child]:border-0", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {

&#x20; return (

&#x20;   <tfoot

&#x20;     data-slot="table-footer"

&#x20;     className={cn(

&#x20;       "bg-muted/50 border-t font-medium \[\&>tr]:last:border-b-0",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TableRow({ className, ...props }: React.ComponentProps<"tr">) {

&#x20; return (

&#x20;   <tr

&#x20;     data-slot="table-row"

&#x20;     className={cn(

&#x20;       "hover:bg-muted/50 data-\[state=selected]:bg-muted border-b transition-colors",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TableHead({ className, ...props }: React.ComponentProps<"th">) {

&#x20; return (

&#x20;   <th

&#x20;     data-slot="table-head"

&#x20;     className={cn(

&#x20;       "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap \[\&:has(\[role=checkbox])]:pr-0 \[\&>\[role=checkbox]]:translate-y-\[2px]",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TableCell({ className, ...props }: React.ComponentProps<"td">) {

&#x20; return (

&#x20;   <td

&#x20;     data-slot="table-cell"

&#x20;     className={cn(

&#x20;       "p-2 align-middle whitespace-nowrap \[\&:has(\[role=checkbox])]:pr-0 \[\&>\[role=checkbox]]:translate-y-\[2px]",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TableCaption({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<"caption">) {

&#x20; return (

&#x20;   <caption

&#x20;     data-slot="table-caption"

&#x20;     className={cn("text-muted-foreground mt-4 text-sm", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export {

&#x20; Table,

&#x20; TableHeader,

&#x20; TableBody,

&#x20; TableFooter,

&#x20; TableHead,

&#x20; TableRow,

&#x20; TableCell,

&#x20; TableCaption,

};













**tabs.tsx**



"use client";



import \* as React from "react";

import \* as TabsPrimitive from "@radix-ui/react-tabs";



import { cn } from "./utils";



function Tabs({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof TabsPrimitive.Root>) {

&#x20; return (

&#x20;   <TabsPrimitive.Root

&#x20;     data-slot="tabs"

&#x20;     className={cn("flex flex-col gap-2", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TabsList({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof TabsPrimitive.List>) {

&#x20; return (

&#x20;   <TabsPrimitive.List

&#x20;     data-slot="tabs-list"

&#x20;     className={cn(

&#x20;       "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-\[3px] flex",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TabsTrigger({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {

&#x20; return (

&#x20;   <TabsPrimitive.Trigger

&#x20;     data-slot="tabs-trigger"

&#x20;     className={cn(

&#x20;       "data-\[state=active]:bg-card dark:data-\[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-\[state=active]:border-input dark:data-\[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-\[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-\[color,box-shadow] focus-visible:ring-\[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 \[\&\_svg]:pointer-events-none \[\&\_svg]:shrink-0 \[\&\_svg:not(\[class\*='size-'])]:size-4",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function TabsContent({

&#x20; className,

&#x20; ...props

}: React.ComponentProps<typeof TabsPrimitive.Content>) {

&#x20; return (

&#x20;   <TabsPrimitive.Content

&#x20;     data-slot="tabs-content"

&#x20;     className={cn("flex-1 outline-none", className)}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Tabs, TabsList, TabsTrigger, TabsContent };

















**textarea.tsx**



import \* as React from "react";



import { cn } from "./utils";



function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {

&#x20; return (

&#x20;   <textarea

&#x20;     data-slot="textarea"

&#x20;     className={cn(

&#x20;       "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-\[color,box-shadow] outline-none focus-visible:ring-\[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Textarea };

















**toggle.tsx**



"use client";



import \* as React from "react";

import \* as TogglePrimitive from "@radix-ui/react-toggle";

import { cva, type VariantProps } from "class-variance-authority";



import { cn } from "./utils";



const toggleVariants = cva(

&#x20; "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-\[state=on]:bg-accent data-\[state=on]:text-accent-foreground \[\&\_svg]:pointer-events-none \[\&\_svg:not(\[class\*='size-'])]:size-4 \[\&\_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-\[3px] outline-none transition-\[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",

&#x20; {

&#x20;   variants: {

&#x20;     variant: {

&#x20;       default: "bg-transparent",

&#x20;       outline:

&#x20;         "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",

&#x20;     },

&#x20;     size: {

&#x20;       default: "h-9 px-2 min-w-9",

&#x20;       sm: "h-8 px-1.5 min-w-8",

&#x20;       lg: "h-10 px-2.5 min-w-10",

&#x20;     },

&#x20;   },

&#x20;   defaultVariants: {

&#x20;     variant: "default",

&#x20;     size: "default",

&#x20;   },

&#x20; },

);



function Toggle({

&#x20; className,

&#x20; variant,

&#x20; size,

&#x20; ...props

}: React.ComponentProps<typeof TogglePrimitive.Root> \&

&#x20; VariantProps<typeof toggleVariants>) {

&#x20; return (

&#x20;   <TogglePrimitive.Root

&#x20;     data-slot="toggle"

&#x20;     className={cn(toggleVariants({ variant, size, className }))}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



export { Toggle, toggleVariants };















**toggle-group.tsx**



"use client";



import \* as React from "react";

import \* as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { type VariantProps } from "class-variance-authority";



import { cn } from "./utils";

import { toggleVariants } from "./toggle";



const ToggleGroupContext = React.createContext<

&#x20; VariantProps<typeof toggleVariants>

>({

&#x20; size: "default",

&#x20; variant: "default",

});



function ToggleGroup({

&#x20; className,

&#x20; variant,

&#x20; size,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> \&

&#x20; VariantProps<typeof toggleVariants>) {

&#x20; return (

&#x20;   <ToggleGroupPrimitive.Root

&#x20;     data-slot="toggle-group"

&#x20;     data-variant={variant}

&#x20;     data-size={size}

&#x20;     className={cn(

&#x20;       "group/toggle-group flex w-fit items-center rounded-md data-\[variant=outline]:shadow-xs",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     <ToggleGroupContext.Provider value={{ variant, size }}>

&#x20;       {children}

&#x20;     </ToggleGroupContext.Provider>

&#x20;   </ToggleGroupPrimitive.Root>

&#x20; );

}



function ToggleGroupItem({

&#x20; className,

&#x20; children,

&#x20; variant,

&#x20; size,

&#x20; ...props

}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> \&

&#x20; VariantProps<typeof toggleVariants>) {

&#x20; const context = React.useContext(ToggleGroupContext);



&#x20; return (

&#x20;   <ToggleGroupPrimitive.Item

&#x20;     data-slot="toggle-group-item"

&#x20;     data-variant={context.variant || variant}

&#x20;     data-size={context.size || size}

&#x20;     className={cn(

&#x20;       toggleVariants({

&#x20;         variant: context.variant || variant,

&#x20;         size: context.size || size,

&#x20;       }),

&#x20;       "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-\[variant=outline]:border-l-0 data-\[variant=outline]:first:border-l",

&#x20;       className,

&#x20;     )}

&#x20;     {...props}

&#x20;   >

&#x20;     {children}

&#x20;   </ToggleGroupPrimitive.Item>

&#x20; );

}



export { ToggleGroup, ToggleGroupItem };













**tooltip.tsx**



"use client";



import \* as React from "react";

import \* as TooltipPrimitive from "@radix-ui/react-tooltip";



import { cn } from "./utils";



function TooltipProvider({

&#x20; delayDuration = 0,

&#x20; ...props

}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {

&#x20; return (

&#x20;   <TooltipPrimitive.Provider

&#x20;     data-slot="tooltip-provider"

&#x20;     delayDuration={delayDuration}

&#x20;     {...props}

&#x20;   />

&#x20; );

}



function Tooltip({

&#x20; ...props

}: React.ComponentProps<typeof TooltipPrimitive.Root>) {

&#x20; return (

&#x20;   <TooltipProvider>

&#x20;     <TooltipPrimitive.Root data-slot="tooltip" {...props} />

&#x20;   </TooltipProvider>

&#x20; );

}



function TooltipTrigger({

&#x20; ...props

}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {

&#x20; return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;

}



function TooltipContent({

&#x20; className,

&#x20; sideOffset = 0,

&#x20; children,

&#x20; ...props

}: React.ComponentProps<typeof TooltipPrimitive.Content>) {

&#x20; return (

&#x20;   <TooltipPrimitive.Portal>

&#x20;     <TooltipPrimitive.Content

&#x20;       data-slot="tooltip-content"

&#x20;       sideOffset={sideOffset}

&#x20;       className={cn(

&#x20;         "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-\[state=closed]:animate-out data-\[state=closed]:fade-out-0 data-\[state=closed]:zoom-out-95 data-\[side=bottom]:slide-in-from-top-2 data-\[side=left]:slide-in-from-right-2 data-\[side=right]:slide-in-from-left-2 data-\[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",

&#x20;         className,

&#x20;       )}

&#x20;       {...props}

&#x20;     >

&#x20;       {children}

&#x20;       <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-\[calc(-50%\_-\_2px)] rotate-45 rounded-\[2px]" />

&#x20;     </TooltipPrimitive.Content>

&#x20;   </TooltipPrimitive.Portal>

&#x20; );

}



export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };





