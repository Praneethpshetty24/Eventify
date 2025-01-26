import BackgroundAnimation from '@/components/ui/BackgroundAnimation'

const Credits = () => {
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 relative">
      <BackgroundAnimation />
      
      <div className="relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-8">Credits & Recognition</h2>
        
        <div className="bg-[#1E1E24] rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-purple-500/20">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Your Event Credits</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 p-3 sm:p-4 bg-[#2A2A2F] rounded-md border border-purple-500/10">
            <div className="mb-2 sm:mb-0">
              <p className="text-base sm:text-lg font-medium text-white">Available Credits</p>
              <p className="text-xs sm:text-sm text-gray-300">Use these credits for upcoming events</p>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-400">500</div>
          </div>
        </div>

        <div className="bg-[#1E1E24] rounded-lg shadow-lg p-4 sm:p-6 border border-purple-500/20">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Credit History</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b border-purple-500/10">
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-white">Tech Conference 2024</p>
                <p className="text-xs sm:text-sm text-gray-300">Credits earned for attendance</p>
              </div>
              <div className="text-green-400 font-medium">+100 credits</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b border-purple-500/10">
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-white">Workshop Registration</p>
                <p className="text-xs sm:text-sm text-gray-300">Credits used for registration</p>
              </div>
              <div className="text-red-400 font-medium">-50 credits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credits 