const Loading = () => {
  return (
    <div className='relative'>
      <div className='animate-spin h-8 w-8 border-4 border-gray-200/50 border-t-gradient-to-r border-t-from-[#2c7b89]/80 border-t-to-blue-500/80 rounded-full shadow-xl backdrop-blur-sm'>
      </div>
      <div className='absolute inset-0 h-8 w-8 border-3 border-transparent border-t-white/90 rounded-full animate-ping shadow-2xl' />
      <div className='absolute inset-0 h-6 w-6 border-2 border-transparent border-t-gradient-to-r border-t-from-emerald-400/90 border-t-to-purple-400/90 rounded-full bg-white/20 backdrop-blur-xl animate-pulse mx-auto my-auto shadow-lg' />
    </div>
  )
}

export default Loading