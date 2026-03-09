import * as contentful from "contentful";
// import {
//   documentToHtmlString,
//   Options,
// } from "@contentful/rich-text-html-renderer";
// import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export interface FlattenedBlogPost {
  id: string;
  title: string;
  title_english: string;
  tag_english: string;
  content_english: string;
  tag: string;
  image: string;
  content: string;
  createdAt: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function richTextToHtml(node: any, showImage = false): string {
  if (!node) return "";

  switch (node.nodeType) {
    case "document":
      return node.content
        .map((child: any) => richTextToHtml(child, showImage))
        .join("");

    case "paragraph":
      const paragraphText = node.content
        .map((child: any) => richTextToHtml(child, showImage))
        .join("");
      return `<p style="white-space: pre-wrap;">${paragraphText}</p>`;

    case "text":
      let text = escapeHtml(node.value);

      if (node.marks?.some((m: any) => m.type === "bold")) {
        text = `<strong>${text}</strong>`;
      }

      return text;

    case "embedded-asset-block":
      if (!showImage) return "";

      const file = node.data?.target?.fields?.file;
      const title = node.data?.target?.fields?.title || "";
      const description = node.data?.target?.fields?.description || "";

      if (!file?.url) return "";

      return `
        <div class="my-4">
          <img 
            src="https:${file.url}" 
            alt="${escapeHtml(description || title)}"
            class="w-full h-100 object-cover rounded-lg"
          />
        </div>
      `;

    default:
      return node.content
        ? node.content
            .map((child: any) => richTextToHtml(child, showImage))
            .join("")
        : "";
  }
}

export class ContentfulProvider {
  private static getClient() {
    return contentful.createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
    });
  }

  static async getBlogEntries() {
    try {
      const entries = await this.getClient().getEntries({
        content_type: "zinterBlogPost",
      });

      return this.flattenEntries(entries.items);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  static async getBlogEntry(entryId: string) {
    try {
      const entry = await this.getClient().getEntry(entryId);

      return this.flattenEntry(entry);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  private static flattenEntries(entries: any[]): FlattenedBlogPost[] {
    return entries.map((entry) => {
      const {
        title,
        titleEnglish:title_english,
        contentEnglish:content_english,
        tagEnglish:tag_english,
        tag,
        content,
        image,
      } = entry.fields;


      const richContent = richTextToHtml(content, false);
      const richContentEnglish = richTextToHtml(content_english, false);

      return {
        id: entry.sys.id,
        createdAt: entry.sys.createdAt,
        title,
        tag,
        title_english,
        tag_english,
        content: richContent,
        content_english: richContentEnglish,
        image: image?.fields?.file?.url ? `https:${image.fields.file.url}` : "",
      };
    });
  }
  private static flattenEntry(entry: any): FlattenedBlogPost {
    const {
      title,
      tag,
      titleEnglish:title_english,
      contentEnglish:content_english,
      tagEnglish:tag_english,
      content,
      image,
    } = entry.fields;
    const richContent = richTextToHtml(content, true);
    const richContentEnglish = richTextToHtml(content_english, true);
    return {
      id: entry.sys.id,
      title,
      tag,
      content: richContent,
      content_english: richContentEnglish,
      title_english,
      tag_english,
      createdAt: entry.sys.createdAt,
      image: image?.fields?.file?.url ? `https:${image.fields.file.url}` : "",
    };
  }
}

