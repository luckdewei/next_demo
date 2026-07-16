import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createPost = mutation({
    args: { title: v.string(), body: v.string()},
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Unauthorized");
        }
        const newPostId = await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId: user._id
        });
        return newPostId;
    },
});

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
