import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        title: v.string(),
        body: v.string(),
        authorId: v.string(),
        // imageStorageId: v.optional(v.id("_storage")), // _storage 是convex的存储系统
    }).searchIndex("search_title", {
        searchField: "title",
    }).searchIndex("search_body", {
        searchField: "body",
    })
});