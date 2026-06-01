"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Network, Radio, Wifi } from "lucide-react";

interface MITAIConnectivityPageProps {
  theme?: "horizon" | "dark";
}

export default function MITAIConnectivityPage({ theme = "horizon" }: MITAIConnectivityPageProps) {
  const isHorizon = theme === "horizon";
  const bgImage = isHorizon 
    ? "url('https://i.postimg.cc/tC27RY82/file-0000000004e0720783388eb9c86621af.png')"
    : "url('https://i.postimg.cc/nh1vKFs4/file-00000000748871faab2cff1000c4b4bb.png')";
  const overlayGradient = isHorizon
    ? "from-blue-900/10 via-transparent to-cyan-900/5"
    : "from-purple-950/10 via-black/20 to-gray-950/15";
  const textColor = isHorizon ? "text-blue-200/70" : "text-purple-300/60";
  const borderColor = isHorizon ? "border-blue-400/20" : "border-purple-600/20";
  const gradientFrom = isHorizon ? "from-blue-900/20" : "from-purple-900/20";
  const gradientTo = isHorizon ? "to-cyan-900/20" : "to-gray-900/30";
  const accentColor = isHorizon ? "text-cyan-400" : "text-purple-400";
  const connections = [
    {
      name: "AI Neural Network",
      status: "Connected",
      latency: "2ms",
      icon: Brain,
      color: "text-blue-400",
    },
    {
      name: "Data Pipeline",
      status: "Active",
      latency: "1ms",
      icon: Network,
      color: "text-cyan-400",
    },
    {
      name: "Cloud Sync",
      status: "Synchronized",
      latency: "3ms",
      icon: Wifi,
      color: "text-green-400",
    },
    {
      name: "Signal Relay",
      status: "Transmitting",
      latency: "1ms",
      icon: Radio,
      color: "text-purple-400",
    },
  ];

  return (
    <main 
      className="min-h-screen px-3 py-16 sm:px-4 sm:py-20 md:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Liquid Glass Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient} backdrop-blur-xs`} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            MIT AI Connectivity Hub
          </h1>
          <p className={`${textColor} text-lg`}>
            Advanced AI-powered network intelligence and real-time analysis
          </p>
        </div>

        {/* Connection Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {connections.map((conn, idx) => {
            const Icon = conn.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border ${borderColor} bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-xl`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-2 bg-white/10 rounded-lg"
                    >
                      <Icon className={`w-5 h-5 ${conn.color}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold">{conn.name}</h3>
                      <p className={`${isHorizon ? "text-blue-200/60" : "text-purple-300/60"} text-sm`}>{conn.status}</p>
                    </div>
                  </div>
                  <motion.div
                    className="h-2 w-2 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-xs text-blue-300/50 font-mono">
                    Latency: <span className="text-cyan-400">{conn.latency}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-8 rounded-2xl border ${borderColor} bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-xl mb-12`}
        >
          <h2 className="text-2xl font-bold text-white mb-6">AI Analytics Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Processing Power", value: "98.5%", icon: Zap },
              { label: "Network Bandwidth", value: "99.2%", icon: Wifi },
              { label: "Data Throughput", value: "97.8%", icon: Network },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon className={`w-6 h-6 ${accentColor} mx-auto mb-3`} />
                  <p className={`${isHorizon ? "text-blue-200/70" : "text-purple-300/60"} text-sm mb-2`}>{stat.label}</p>
                  <motion.p
                    className={`text-3xl font-bold ${accentColor}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              title: "Predictive Analysis",
              description: "AI-driven forecasting and anomaly detection",
            },
            {
              title: "Adaptive Learning",
              description: "Self-improving algorithms and pattern recognition",
            },
            {
              title: "Real-time Processing",
              description: "Instant data correlation and insights",
            },
            {
              title: "Security Integration",
              description: "AI-powered threat detection and prevention",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border ${borderColor} bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-xl`}
            >
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className={`${isHorizon ? "text-blue-200/60" : "text-purple-300/50"} text-sm`}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
