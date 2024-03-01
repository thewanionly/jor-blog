import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';

export const dynamic = 'force-dynamic';

const feedOptions = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  feed_url: 'http://localhost:3000/rss.xml',
  site_url: 'http://localhost:3000/'
};

export async function GET() {
  // genernate rss feed
  const feed = new RSS(feedOptions);

  // fetch blogPostLis
  const blogPostList = await getBlogPostList();

  // add feed items
  blogPostList.forEach(({ title, abstract, slug, publishedOn }) => {
    feed.item({
      title,
      description: abstract,
      url: `${feedOptions.site_url}${slug}`,
      date: new Date(publishedOn)
    });
  });

  // return rss feed
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
