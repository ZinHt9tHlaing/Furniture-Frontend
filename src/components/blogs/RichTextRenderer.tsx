"use client";

import DOMPurify from "isomorphic-dompurify";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

const RichTextRenderer = ({ content, className }: Props) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: sanitizedContent,
      }}
    />
  );
};

export default RichTextRenderer;