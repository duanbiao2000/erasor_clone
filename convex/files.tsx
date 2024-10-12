import {v} from 'convex/values';
import { mutation, query } from './_generated/server';

/**
 * 创建文件的mutation操作
 * 
 * 该函数负责在数据库中插入一个新的文件记录，包括文件名、团队ID、创建者、是否归档、文档内容和白板内容等信息
 * 
 * @param {object} ctx - 上下文对象，包含数据库操作方法等
 * @param {object} args - 用于创建文件的参数对象，包括fileName、teamId、createdBy、archive、document和whiteboard字段
 * @returns {Promise<object>} - 返回插入操作的结果，包括新文件的唯一标识符和其他相关数据
 */
export const createFile = mutation({
    args: {
        fileName: v.string(), // 文件名，字符串类型
        teamId: v.string(), // 团队ID，字符串类型
        createdBy: v.string(), // 创建者，字符串类型，通常是一个用户ID
        archive: v.boolean(), // 是否归档，布尔类型，表示文件是否被归档
        document: v.string(), // 文档内容，字符串类型，表示文件的文档内容
        whiteboard: v.string() // 白板内容，字符串类型，表示文件的白板内容
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('files', args); // 在数据库的files集合中插入一条新记录
        return result; // 返回插入操作的结果
    },
});

/**
 * 根据团队ID查询文件
 * 
 * 该查询函数用于从数据库中获取特定团队的所有文件，根据团队ID进行过滤，并按照特定顺序排列
 * 
 * @param ctx 上下文对象，包含数据库等信息
 * @param args 查询参数，包含团队ID（teamId）
 * @returns 返回查询到的文件结果
 */
export const getFiles=query({
    args:{
        teamId:v.string()
    },
    handler:async(ctx, args)=> {
        const result=ctx.db.query('files')
        .filter(q=>q.eq(q.field('teamId'),args.teamId))
        .order('desc')
        .collect();

        return result;
    },
})

/**
 * 更新文档内容
 * 
 * 该变异函数用于更新数据库中特定文件的文档内容，根据文件ID定位文件并更新
 * 
 * @param ctx 上下文对象，包含数据库等信息
 * @param args 更新参数，包含文件ID（_id）和新的文档内容（document）
 * @returns 返回更新后的结果
 */
export const updateDocument=mutation({
    args:{
        _id:v.id('files'),
        document:v.string()
    },
    handler:async(ctx, args) =>{
        const result =await ctx.db.patch(args._id,{document:args.document});
        return result;
    },
})

/**
 * 更新白板内容
 * 
 * 该变异函数用于更新数据库中特定文件的白板内容，根据文件ID定位文件并更新
 * 
 * @param ctx 上下文对象，包含数据库等信息
 * @param args 更新参数，包含文件ID（_id）和新的白板内容（whiteboard）
 * @returns 返回更新后的结果
 */
export const updateWhiteboard=mutation({
    args:{
        _id:v.id('files'),
        whiteboard:v.string()
    },
    handler:async(ctx, args) =>{
        const result =await ctx.db.patch(args._id,{whiteboard:args.whiteboard});
        return result;
    },
})

/**
 * 根据文件ID获取文件
 * 
 * 该查询函数用于从数据库中获取特定文件，根据文件ID进行定位
 * 
 * @param ctx 上下文对象，包含数据库等信息
 * @param args 查询参数，包含文件ID（_id）
 * @returns 返回查询到的文件结果
 */
export const getFileById=query({
    args:{
        _id:v.id('files')
    },
    handler:async(ctx, args)=> {
        const result=await ctx.db.get(args._id);
        return result;
    },
})