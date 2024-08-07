import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
		<div className="w-full h-[calc(100vh-70px)] flex items-center flex-1 justify-center">
			<Loader  className="h-10 w-10 animate-spin md:h-32" />
		</div>
	);
}

export default Loading
