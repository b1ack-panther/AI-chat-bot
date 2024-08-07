import Sidebar from '@/components/Sidebar';
import React from 'react'

const Layout = ({ children, params }: { children: React.ReactNode, params: { chatId: string } }) => {
  return (
		<div className="flex-1 flex w-full px-2 gap-2 relative">
			<div className="hidden md:flex rounded-md inset-y-0 mb-2 mt-2 sticky max-h-svh top-[80px] bottom-0 flex-col h-full w-[240px] z-20">
				<Sidebar chatId={params.chatId} />
      </div>
      {children}
		</div>
	);
}

export default Layout
