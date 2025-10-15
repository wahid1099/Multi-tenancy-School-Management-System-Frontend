import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
          {item.path ? (
            <a
              href={item.path}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};