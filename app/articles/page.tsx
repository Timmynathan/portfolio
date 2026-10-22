import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeInObserver } from "@/components/FadeInObserver";
import { RichText } from "@/components/RichText";
import { ArrowLeftIcon, ArrowUpRightIcon, ArticleIcon } from "@/components/icons";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles | Ilesanmi Oluwatimilehin",
  description: "Articles and write-ups by Nathaniel, published around the web.",
};

export default async function ArticlesPage() {
  const { articles, site } = await getContent();

  return (
    <>
      <Navbar />
      <main>
        <section className="articles-page">
          <div className="container fade-in">
            <a href="/" className="back-link">
              <ArrowLeftIcon />
              Back to home
            </a>

            <div className="section-heading">
              <span className="section-tag" aria-hidden="true"><ArticleIcon /></span>
              <h1 className="section-title">Articles</h1>
            </div>

            {articles.length > 0 ? (
              <div className="article-list">
                {articles.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-card"
                  >
                    <div className="article-meta">
                      {[article.source, article.date].filter(Boolean).join(" · ")}
                    </div>
                    <h2 className="article-title">{article.title}</h2>
                    {article.summary && <p className="article-summary"><RichText text={article.summary} links={false} /></p>}
                    <span className="article-read">
                      Read{article.source ? ` on ${article.source}` : " article"} <ArrowUpRightIcon />
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="article-empty">Nothing published yet — check back soon.</p>
            )}
          </div>
        </section>
      </main>
      <Footer site={site} />
      <FadeInObserver />
    </>
  );
}
