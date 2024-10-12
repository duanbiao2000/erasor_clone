import React, { useEffect } from 'react';

function AdBanner({ props }: any) {
  useEffect(() => {
    try {
      // 向广告管理系统推送一个空对象，触发广告加载
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    {/*Google AdSense 通常会提供一段包含 <ins> 标签的代码，用于在网页中嵌入广告。*/}
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: 'block',
        overflow: 'hidden',
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      {...props}
    />
  );
}

export default AdBanner;
