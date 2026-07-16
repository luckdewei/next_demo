"use server";
import z from "zod";
import { postSchema } from "./schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { fetchAuthMutation } from "@/lib/auth-server";
import { query } from "@/convex/_generated/server";

 // 告诉服务器这是一个服务器端函数

export async function createBlogAction(values: z.infer<typeof postSchema>) {
    try {
        const parsed = postSchema.safeParse(values);
        if (!parsed.success) {
            throw new Error(parsed.error.message);
        }
        await fetchAuthMutation(api.posts.createPost, {
            body: parsed.data.content,
            title: parsed.data.title,
        });
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to create blog"
        };
    }
    return redirect("/");
}

export const getPosts = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db.query("posts").order("desc").collect();

        return await Promise.all(
            posts.map((post) => ({
                ...post
            }))
        );
    },
});