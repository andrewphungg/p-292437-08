
import React from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event";
import { Skeleton } from "@/components/ui/skeleton";

interface EventListProps {
  events: Event[];
  loading?: boolean;
  error?: string;
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  variant?: "default" | "grid" | "compact";
}

export function EventList({
  events,
  loading = false,
  error,
  title,
  subtitle,
  emptyMessage = "No events found",
  variant = "default",
}: EventListProps) {
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-800 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      {loading ? (
        variant === "grid" ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )
      ) : events.length > 0 ? (
        variant === "grid" ? (
          <div className="grid grid-cols-2 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

function EventCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Skeleton className="w-full h-32" />
        <div className="p-3">
          <Skeleton className="w-3/4 h-4 mb-2" />
          <Skeleton className="w-1/2 h-3 mb-1" />
          <Skeleton className="w-2/3 h-3" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="w-full md:w-1/3 h-48 md:h-full" />
        <div className="p-4 flex-1">
          <Skeleton className="w-3/4 h-6 mb-3" />
          <Skeleton className="w-1/2 h-4 mb-2" />
          <Skeleton className="w-2/3 h-4 mb-2" />
          <Skeleton className="w-1/2 h-4 mb-3" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-24 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
