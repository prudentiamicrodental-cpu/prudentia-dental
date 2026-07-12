import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


type Props = {
  children: string;
  className?: string;
  inline?:boolean;
};

export default function Markdown({ children, className = "",inline = false}: Props) {
   const Wrapper = inline ? "span" : "div";
  return (
    <Wrapper className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) =>
            inline ? <span>{children}</span> : <p>{children}</p>,
            a: ({ href = "", children }) =>
            href.startsWith("/") ? (
            <Link href={href} className=" underline hover:text-blue-800">
                {children}
            </Link>
            ) : (
            <a href={href} className=" underline hover:text-blue-800">
                {children}
            </a>
            ),
        }}
      >
        {children}
      </ReactMarkdown>
 
    </Wrapper>
  );
}