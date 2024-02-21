import React from 'react';

import { loadBlogPost } from '@/helpers/file-helpers';

import { BLOG_TITLE } from '@/constants';
import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';

import styles from './postSlug.module.css';

import { COMPONENT_MAP } from '@/helpers/mdx-components';

export async function generateMetadata({ params: { postSlug } }) {
  const { frontmatter } = await loadBlogPost(postSlug);
  const { title, abstract } = frontmatter;

  return {
    title: `${title} · ${BLOG_TITLE}`,
    description: abstract
  };
}

async function BlogPost({ params: { postSlug } }) {
  const { frontmatter, content } = await loadBlogPost(postSlug);

  const { title, publishedOn } = frontmatter;
  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
