const Credits = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Credits & Recognition</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Event Credits</h3>
        <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-md">
          <div>
            <p className="text-lg font-medium text-gray-900">Available Credits</p>
            <p className="text-sm text-gray-600">Use these credits for upcoming events</p>
          </div>
          <div className="text-2xl font-bold text-blue-600">500</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Credit History</h3>
        <div className="space-y-4">
          {/* Sample credit history items */}
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Tech Conference 2024</p>
              <p className="text-sm text-gray-600">Credits earned for attendance</p>
            </div>
            <div className="text-green-600 font-medium">+100 credits</div>
          </div>
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Workshop Registration</p>
              <p className="text-sm text-gray-600">Credits used for registration</p>
            </div>
            <div className="text-red-600 font-medium">-50 credits</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credits 