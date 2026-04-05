import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Markdoc from "@markdoc/markdoc";
import { getArticle, getArticles } from "@/lib/content";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  // Render markdoc content to HTML
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { node } = await article.content() as any;
  const transformed = Markdoc.transform(node);
  const html = Markdoc.renderers.html(transformed);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "4rem",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src={`/images/${article.image}`}
            alt={article.title}
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(10,6,4,0.35) 0%, rgba(10,6,4,0.75) 70%, rgba(10,6,4,1) 100%)",
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 2rem",
            maxWidth: "900px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {article.category && (
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  border: "1px solid rgba(201,168,76,0.3)",
                  padding: "0.25rem 0.75rem",
                }}
              >
                {article.category}
              </span>
            )}
            <span style={{ fontSize: "0.75rem", color: "rgba(245,230,204,0.4)" }}>
              {article.dateDisplay}
              {article.readTime ? ` · ${article.readTime} de lecture` : ""}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              color: "#F5E6CC",
              lineHeight: 1.15,
            }}
          >
            {article.title}
          </h1>
        </div>
      </section>

      {/* Contenu */}
      <section style={{ backgroundColor: "#0A0604", padding: "4rem 2rem 8rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.35rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.8)",
              lineHeight: 1.8,
              marginBottom: "3rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            {article.excerpt}
          </p>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div
            style={{
              marginTop: "4rem",
              padding: "2.5rem",
              border: "1px solid rgba(201,168,76,0.2)",
              backgroundColor: "#0D0806",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.25rem",
                fontStyle: "italic",
                color: "rgba(245,230,204,0.7)",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              Envie de découvrir ce breuvage millénaire par vous-même ?
            </p>
            <Link href="/nos-hydromels" className="btn-gold">
              Découvrir nos hydromels
            </Link>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Link
              href="/chroniques"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(245,230,204,0.5)",
                textDecoration: "none",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
              }}
            >
              <ArrowLeft size={16} />
              Retour aux chroniques
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .article-body h2 {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1.8rem;
          font-weight: 500;
          color: #C9A84C;
          margin-bottom: 1.25rem;
          margin-top: 2.5rem;
          line-height: 1.2;
        }
        .article-body h3 {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1.35rem;
          font-weight: 500;
          color: #C9A84C;
          margin-bottom: 1rem;
          margin-top: 2rem;
        }
        .article-body p {
          color: rgba(245,230,204,0.75);
          line-height: 1.9;
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .article-body strong {
          color: #F5E6CC;
        }
        .article-body em {
          color: rgba(245,230,204,0.9);
        }
        .article-body ul, .article-body ol {
          color: rgba(245,230,204,0.75);
          line-height: 1.9;
          font-size: 1rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .article-body li {
          margin-bottom: 0.4rem;
        }
      `}</style>
    </>
  );
}
