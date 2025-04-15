
import React from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-3xl border border-red-200 dark:border-red-900/30 text-red-800 dark:text-red-200 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
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
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <EventCard event={event} variant="compact" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <EventCard key={event.id} event={event} />
              </motion.div>
            ))}
          </div>
        )
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <p className="text-muted-foreground">{emptyMessage}</p>
        </motion.div>
      )}
    </div>
  );
}

function EventCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm">
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
    <div className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm">
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
