export default function OrderTracking({ order }) {
  const steps = [
    { label: "Placed", icon: "📦" },
    { label: "Processing", icon: "⚙️" },
    { label: "Shipped", icon: "🚚" },
    { label: "Out for Delivery", icon: "🛵" },
    { label: "Delivered", icon: "✅" },
  ];

  const cancelledStatuses = ["Cancelled"];
  const isCancelled = cancelledStatuses.includes(order.orderStatus);

  const currentStep = isCancelled
    ? -1
    : steps.findIndex((s) => s.label === order.orderStatus);

  return (
    <div className="bg-white rounded-xl shadow p-5 mt-4">
      <h3 className="text-lg font-bold mb-4 text-gray-800">📍 Order Tracking</h3>

      {isCancelled ? (
        <div className="text-center py-4">
          <span className="text-red-500 text-4xl">❌</span>
          <p className="text-red-500 font-semibold mt-2">Order Cancelled</p>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="flex items-center justify-between relative mb-6">
            {/* Background line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0" />
            {/* Active line */}
            <div
              className="absolute top-5 left-0 h-1 bg-orange-400 z-0 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div key={idx} className="flex flex-col items-center z-10 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all
                    ${isCompleted ? "bg-orange-400 border-orange-400 text-white" :
                      isCurrent ? "bg-white border-orange-400 text-orange-500 shadow-md" :
                      "bg-white border-gray-300 text-gray-400"}`}>
                    {step.icon}
                  </div>
                  <p className={`text-xs mt-2 text-center font-medium
                    ${isCompleted || isCurrent ? "text-orange-500" : "text-gray-400"}`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tracking Details */}
          <div className="bg-orange-50 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Status:</span>
              <span className="font-semibold text-orange-600">{order.orderStatus}</span>
            </div>

            {order.trackingInfo?.shippedAt && (
              <div className="flex justify-between">
                <span className="text-gray-600">Shipped On:</span>
                <span className="font-semibold">{new Date(order.trackingInfo.shippedAt).toLocaleDateString()}</span>
              </div>
            )}

            {order.trackingInfo?.estimatedDelivery && order.orderStatus !== "Delivered" && (
              <div className="flex justify-between">
                <span className="text-gray-600">Est. Delivery:</span>
                <span className="font-semibold text-green-600">
                  {new Date(order.trackingInfo.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
            )}

            {order.trackingInfo?.deliveredAt && (
              <div className="flex justify-between">
                <span className="text-gray-600">Delivered On:</span>
                <span className="font-semibold text-green-600">
                  {new Date(order.trackingInfo.deliveredAt).toLocaleDateString()}
                </span>
              </div>
            )}

            {order.trackingInfo?.trackingNote && (
              <div className="mt-2 pt-2 border-t border-orange-100">
                <span className="text-gray-600">Note: </span>
                <span className="text-gray-700">{order.trackingInfo.trackingNote}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}