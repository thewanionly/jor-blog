import React from 'react';
import dynamic from 'next/dynamic';

import { loadBlogPost } from '@/helpers/file-helpers';

import { BLOG_TITLE } from '@/constants';
import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';

import CodeSnippet from '@/components/CodeSnippet';
import styles from './postSlug.module.css';

const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'));

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
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
