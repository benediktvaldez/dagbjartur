import Layout from '$components/Layout';
import PostList from '$components/PostList';
import { urlify } from '$util/urlify';
import matter from 'gray-matter';

const Index = (props: any) => {
  return (
    <Layout pathname="/" siteTitle={props.title} siteDescription={props.description}>
      <section>
        <PostList allPosts={props.allPosts} />
      </section>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  // const posts = glob.sync('content/posts/**/*.md');
  const siteConfig = await import(`../content/config.json`);

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key: string, index: number) => {
      const slug = key.replace(/^\.\/(.*)\.md/, '/post/$1');

      const value = values[index];
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default);

      return {
        frontmatter: {
          ...document.data,
          hero_image: document.data.hero_image
            ? document.data.hero_image
            : `https://source.unsplash.com/random/?${document.data.title
                .replace(/^.*-/, '')
                .split(' ')
                .filter((v: string) => !!v)
                .map((v: string) => urlify(v))
                .join(',')}`,
        },
        markdownBody: document.content,
        slug,
      };
    });

    return data;
    // @ts-ignore
  })(require.context('../content/posts', true, /\.md$/));

  return {
    props: {
      allPosts: posts,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  };
}
