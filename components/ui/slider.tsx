"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn('relative flex w-full touch-none select-none items-center', className)}
		{...props}>
		{/* bg-white/40 shadow-md  hover:bg-white/60 hover:shadow-lg transition-all duration-150 ease-in-out */}

		<SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/50 backdrop-blur-sm border border-black/30'>
			<SliderPrimitive.Range className='absolute h-full bg-primary' />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[1.2]' />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
