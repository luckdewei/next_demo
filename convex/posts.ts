import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createPost = mutation({
    args: { title: v.string(), body: v.string(), imageStorgeId: v.optional(v.id("_storage")), },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Unauthorized");
        }
        const newPostId = await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId: user._id,
            imageStorgeId: args.imageStorgeId,
        });
        return newPostId;
    },
});