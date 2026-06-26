import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import styled from "@emotion/styled"

type Props = {
  markdown: string
}

const NotionRenderer: FC<Props> = ({ markdown }) => {
  return (
    <StyledWrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          img({ src, alt }: any) {
            return <img src={src} alt={alt || ""} style={{ maxWidth: "100%", borderRadius: "0.5rem" }} />
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  line-height: 1.75;
  font-size: 1rem;
  word-break: break-word;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    line-height: 1.3;
  }
  h1 { font-size: 1.875rem; }
  h2 { font-size: 1.5rem; border-bottom: 1px solid rgba(128,128,128,0.2); padding-bottom: 0.3rem; }
  h3 { font-size: 1.25rem; }

  p { margin-bottom: 1rem; }

  a {
    color: #3b82f6;
    text-decoration: underline;
    &:hover { opacity: 0.8; }
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  ul { list-style-type: disc; }
  ol { list-style-type: decimal; }
  li { margin-bottom: 0.25rem; }

  blockquote {
    border-left: 4px solid rgba(128,128,128,0.4);
    padding-left: 1rem;
    margin: 1rem 0 1rem 0;
    color: rgba(128,128,128,0.9);
    font-style: italic;
  }

  code {
    background: rgba(128,128,128,0.15);
    padding: 0.1rem 0.3rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-family: monospace;
  }

  pre {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    overflow: auto;
    > div {
      border-radius: 0.5rem !important;
    }
  }

  img {
    max-width: 100%;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  th, td {
    border: 1px solid rgba(128,128,128,0.3);
    padding: 0.5rem 0.75rem;
    text-align: left;
  }
  th { font-weight: 700; background: rgba(128,128,128,0.1); }

  hr {
    border: none;
    border-top: 1px solid rgba(128,128,128,0.2);
    margin: 1.5rem 0;
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`
