// import { useEffect } from "react";

// export default function useSEO({ title, description, canonical, robots = "index, follow", ogImage } = {}) {
//   useEffect(() => {
//     if (title) document.title = title;

//     const setMeta = (selector, attrKey, attrVal, content) => {
//       if (!content) return;
//       let el = document.querySelector(selector);
//       if (!el) {
//         el = document.createElement("meta");
//         el.setAttribute(attrKey, attrVal);
//         document.head.appendChild(el);
//       }
//       el.setAttribute("content", content);
//     };

//     const setLink = (rel, href) => {
//       if (!href) return;
//       let el = document.querySelector(`link[rel="${rel}"]`);
//       if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
//       el.setAttribute("href", href);
//     };

//     setMeta('meta[name="description"]',        "name",     "description",        description);
//     setMeta('meta[name="robots"]',             "name",     "robots",             robots);
//     setMeta('meta[property="og:title"]',       "property", "og:title",           title);
//     setMeta('meta[property="og:description"]', "property", "og:description",     description);
//     setMeta('meta[property="og:url"]',         "property", "og:url",             canonical);
//     setMeta('meta[property="og:image"]',       "property", "og:image",           ogImage);
//     setLink("canonical", canonical);
//   }, [title, description, canonical, robots, ogImage]);
// }


// hooks/useSEO.jsx  ← must be .jsx not .js
import { Helmet } from "react-helmet-async";

export function SEO({
  title,
  description,
  canonical,
  robots = "index, follow",
  ogImage,
  ogType = "article",
  siteName = "Local Trade Street",
}) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}

export default SEO;