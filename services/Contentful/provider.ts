/* eslint-disable @typescript-eslint/no-explicit-any */
import * as contentful from "contentful";
// import {
//   documentToHtmlString,
//   Options,
// } from "@contentful/rich-text-html-renderer";
// import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export interface FlattenedBlogPost {
  id: string;
  title: string;
  tag: string;
  image: string;
  content: string;
  createdAt:string,
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

function richTextToHtml(node: any): string {
  if (!node) return "";

  switch (node.nodeType) {
    case "document":
      // Each top-level node becomes a paragraph
      return node.content.map(richTextToHtml).join("");
    case "paragraph":
      // Join all child text and preserve line breaks
      const paragraphText = node.content.map(richTextToHtml).join("");
      return `<p style="white-space: pre-wrap;">${paragraphText}</p>`;
    case "text":
      let text = escapeHtml(node.value);
      if (node.marks?.some((m: any) => m.type === "bold")) {
        text = `<strong>${text}</strong>`;
      }
      return text;
    default:
      // recursively process children if any
      return node.content ? node.content.map(richTextToHtml).join("") : "";
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
  static async getBlogEntry(entryId:string) {
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
      const { title, tag, content, image } = entry.fields;

      const richContent = richTextToHtml(content);

      return {
        id: entry.sys.id,
        createdAt:entry.sys.createdAt,
        title,
        tag,
        content: richContent,
        image: image?.fields?.file?.url ? `https:${image.fields.file.url}` : "",
      };
    });
  } 
  private static flattenEntry(entry: any): FlattenedBlogPost {
     const { title, tag, content, image } = entry.fields;

      const richContent = richTextToHtml(content);

      return {
        id: entry.sys.id,
        title,
        tag,
        content: richContent,
        createdAt:entry.sys.createdAt,
        image: image?.fields?.file?.url ? `https:${image.fields.file.url}` : "",
      };
  }
}
