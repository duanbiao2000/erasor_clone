import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// 从kinde-auth-nextjs库中导入getKindeServerSession函数
// 该函数用于获取Kinde服务器端会话，以便在服务器端进行用户身份验证和授权
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// This function can be marked `async` if using `await` inside
/**
 * 中间件函数，用于检查用户是否已通过身份验证
 * 如果用户未通过身份验证，则重定向到登录页面
 * 
 * @param request NextRequest对象，包含请求信息
 */
export async function middleware(request: NextRequest) {
  // 从服务器会话中获取身份验证状态
  const { isAuthenticated } = getKindeServerSession();
  
  // 如果用户未通过身份验证，则重定向到登录页面
  if (!await isAuthenticated()) {
    // 创建重定向响应，引导用户登录
    return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url))
  }
}

// See "Matching Paths" below to learn more
// 定义一个名为config的常量对象，用于配置特定的路由匹配规则
export const config = {
  // matcher属性包含一个数组，指定了需要匹配的路由路径
  // 这里的['/dashboard']表示该配置将应用于'/dashboard'路径的页面
  matcher: ['/dashboard'],
}