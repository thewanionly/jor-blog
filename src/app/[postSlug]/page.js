import React from 'react';

import { notFound } from 'next/navigation';

import { loadBlogPost } from '@/helpers/file-helpers';

import { BLOG_TITLE } from '@/constants';
import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';

import styles from './postSlug.module.css';

import { COMPONENT_MAP } from '@/helpers/mdx-components';

export async function generateMetadata({ params: { postSlug } }) {
  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) {
    return {
      title: `404 Not found · ${BLOG_TITLE}`
    };
  }

  const { frontmatter } = blogPost;
  const { title, abstract } = frontmatter;

  return {
    title: `${title} · ${BLOG_TITLE}`,
    description: abstract
  };
}

async function BlogPost({ params: { postSlug } }) {
  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) {
    notFound();
  }

  const { frontmatter, content } = blogPost;
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
