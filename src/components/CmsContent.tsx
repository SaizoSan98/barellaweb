'use client';

import { useState, useEffect } from 'react';

type CmsContentProps = {
  pageSlug: string;
  sectionSlug: string;
  contentKey: string;
  fallback?: string;
  children: (value: string) => React.ReactNode;
};

export function CmsContent({ pageSlug, sectionSlug, contentKey, fallback, children }: CmsContentProps) {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch(`/api/cms/content?pageSlug=${pageSlug}&sectionSlug=${sectionSlug}&contentKey=${contentKey}`);
        if (res.ok) {
          const data = await res.json();
          setValue(data.value);
        }
      } catch (error) {
        console.error('Error loading CMS content:', error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [pageSlug, sectionSlug, contentKey]);

  if (loading) {
    return <>{fallback || ''}</>;
  }

  return <>{children(value || fallback || '')}</>;
}
