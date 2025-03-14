'use client'

import { Badge } from "@/components/ui/badge";

/**
 * 通用页面头部组件
 */
export default function PageHeader({ 
  badge = null,
  title, 
  description = null
}) {
  return (
    <div className="text-center">
      {badge && (
        <Badge variant="secondary" className="mb-6">
          {badge}
        </Badge>
      )}
      <h2 
        className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
          {description}
        </p>
      )}
    </div>
  );
} 