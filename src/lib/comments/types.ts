import type { TextAnchor } from "@/lib/comments/anchor";
import type { CommentKind } from "@/lib/comments/kinds";

export interface CommentReply {
  id: string;
  userId: string;
  authorName: string;
  authorIsAdmin: boolean;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonComment {
  id: string;
  userId: string;
  authorName: string;
  courseSlug: string;
  lessonId: string;
  locale: string;
  kind: CommentKind;
  body: string;
  anchor: TextAnchor;
  resolvedAt: string | null;
  resolvedByName: string | null;
  createdAt: string;
  updatedAt: string;
  replies: CommentReply[];
}
