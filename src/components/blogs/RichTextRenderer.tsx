import DomPurify from "dompurify";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

const RichTextRenderer = ({ content, className }: Props) => {
  // If you are using Next.js/SSR, DOMPurify needs a check to ensure it's running in the browser.
  const sanitizedContent =
    typeof window !== "undefined" ? DomPurify.sanitize(content) : content; // if it contains any JS or XSS code, it will be sanitized.

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className={className}
    />
  );
};

export default RichTextRenderer;
