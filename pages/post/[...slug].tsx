import glob from 'glob';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';

export default function PostTemplate({ frontmatter, markdownBody, siteTitle }: any) {
  function reformatDate(fullDate: string) {
    const date = new Date(fullDate);
    return date.toDateString().slice(4);
  }

  /*
   ** Odd fix to get build to run
   ** It seems like on first go the props
   ** are undefined — could be a Next bug?
   */

  if (!frontmatter) return <></>;

  return (
    <Layout siteTitle={siteTitle}>
      <article className="post">
        {frontmatter.hero_image && (
          <figure className="post__hero">
            <img src={frontmatter.hero_image} alt="" />
          </figure>
        )}
        <div className="post__info">
          <h1>{frontmatter.title}</h1>
          {frontmatter.date && <h3>{reformatDate(frontmatter.date)}</h3>}
        </div>
        <div className="post__body">
          <ReactMarkdown source={markdownBody} />
        </div>
        {frontmatter.author && <h2 className="post__footer">Written By: {frontmatter.author}</h2>}
      </article>
      <style jsx>
        {`
          .post h1 {
            margin-bottom: 0.7rem;
          }

          .post__hero {
            min-height: 300px;
            height: 60vh;
            width: 100%;
            margin: 0;
            overflow: hidden;
          }
          .post__hero img {
            margin-bottom: 0;
            object-fit: cover;
            min-height: 100%;
            min-width: 100%;
            object-position: center;
          }

          .post__info {
            padding: 1.5rem 1.25rem;
            width: 100%;
            max-width: 768px;
            margin: 0 auto;
          }
          .post__info h1 {
            margin-bottom: 0.66rem;
          }
          .post__info h3 {
            margin-bottom: 0;
          }

          .post__body {
            width: 100%;
            padding: 0 1.25rem;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .post__body a {
            padding-bottom: 1.5rem;
          }
          .post__body:last-child {
            margin-bottom: 0;
          }
          .post__body h1 h2 h3 h4 h5 h6 p {
            font-weight: normal;
          }
          .post__body p {
            color: inherit;
          }
          .post__body ul {
            list-style: initial;
          }
          .post__body ul ol {
            margin-left: 1.25rem;
            margin-bottom: 1.25rem;
            padding-left: 1.45rem;
          }

          .post__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 1.25rem;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }
          .post__footer h2 {
            margin-bottom: 0;
          }
          .post__footer a {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .post__footer a svg {
            width: 20px;
          }

          @media (min-width: 768px) {
            .post {
              display: flex;
              flex-direction: column;
            }
            .post__body {
              max-width: 800px;
              padding: 0 2rem;
            }
            .post__body span {
              width: 100%;
              margin: 1.5rem auto;
            }
            .post__body ul ol {
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }
            .post__hero {
              min-height: 600px;
              height: 75vh;
            }
            .post__info {
              text-align: center;
              padding: 2rem 0;
            }
            .post__info h1 {
              max-width: 500px;
              margin: 0 auto 0.66rem auto;
            }
            .post__footer {
              padding: 2.25rem;
            }
          }

          @media (min-width: 1440px) {
            .post__hero {
              height: 70vh;
            }
            .post__info {
              padding: 3rem 0;
            }
            .post__footer {
              padding: 2rem 2rem 3rem 2rem;
            }
          }
        `}
      </style>
    </Layout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const slug = (ctx.params.slug as string[]).join('/');
  console.info('slug', slug);
  const content = await import(`../../content/posts/${slug}.md`);
  const config = await import(`../../content/config.json`);
  const data = matter(content.default);

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  const posts = glob.sync('content/posts/**/*.md');

  const paths = posts.map((file) => ({
    params: {
      slug: file.replace(/^content\/posts\/(.*)\.md$/, '$1').split('/'),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
