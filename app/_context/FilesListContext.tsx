import { createContext } from "react";

/**
 * 创建一个文件列表上下文，用于在组件树中传递文件列表相关的数据和操作
 * 通过这个上下文，可以确保文件列表数据的一致性和可访问性
 */
export const FileListContext=createContext<any>(undefined);