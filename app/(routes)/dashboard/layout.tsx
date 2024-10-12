'use client';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_context/FilesListContext';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 初始化Convex客户端，用于与Convex后端服务进行交互
  const convex = useConvex();

  // 使用Kinde Browser客户端钩子来获取当前用户信息，将用户信息解构出来
  const { user }: any = useKindeBrowserClient();

  // 管理文件列表的状态，初始值为空，通过setFileList_来更新文件列表
  const [fileList_, setFileList_] = useState();

  // 获取路由对象，用于导航和路由操作
  const router = useRouter();
  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      router.push('teams/create');
    }
  };

  return (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="grid grid-cols-4">
          <div className="bg-white h-screen w-72 fixed">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  );
}

export default DashboardLayout;
