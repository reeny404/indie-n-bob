import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start">
      <main className="w-full max-w-4xl p-8 rounded">
        {children}
      </main>
    </div>
  );
}

export default MyPageLayout;