import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, "姓名至少 3 个字符").max(30, "姓名最多 30 个字符"),
    email: z.email("请输入有效邮箱"),
    password: z.string().min(8, "密码至少 8 位").max(30, "密码最多 30 位"),
});

export const loginSchema = z.object({
    email: z.email("请输入有效邮箱"),
    password: z.string().min(8, "密码至少 8 位").max(30, "密码最多 30 位"),
})