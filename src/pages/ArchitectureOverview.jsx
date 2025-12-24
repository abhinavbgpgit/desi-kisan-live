import React, { useState, useEffect } from 'react';

const ArchitectureOverview = () => {
  const [activeFlow, setActiveFlow] = useState(0);
  const [hoveredComponent, setHoveredComponent] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const architectureComponents = [
    {
      id: 'data-sources',
      title: 'Data Sources',
      icon: '📊',
      color: 'from-blue-500 to-blue-600',
      items: ['Web/App Events', 'CRM Data', 'Email Interactions', 'Ad Conversions', 'Inventory', 'Product Catalog', 'Payment Transactions', 'Support Tickets'],
      position: 'left-0'
    },
    {
      id: 'ingestion',
      title: 'Event Ingestion Layer',
      icon: '⚡',
      color: 'from-purple-500 to-purple-600',
      items: ['Apache Kafka', 'AWS Kinesis', 'Event Streaming', 'Real-time Processing'],
      position: 'left-1/4'
    },
    {
      id: 'storage',
      title: 'Data Lake & Storage',
      icon: '🗄️',
      color: 'from-indigo-500 to-indigo-600',
      items: ['Delta Lake', 'AWS S3', 'PostgreSQL', 'Vector DB (Milvus)', 'Feature Store'],
      position: 'left-2/4'
    },
    {
      id: 'processing',
      title: 'Processing & ML',
      icon: '🤖',
      color: 'from-pink-500 to-pink-600',
      items: ['Batch ETL', 'ML Training', 'Model Serving', 'Feature Engineering', 'Real-time Inference'],
      position: 'left-3/4'
    },
    {
      id: 'services',
      title: 'AI/ML Services',
      icon: '🧠',
      color: 'from-emerald-500 to-emerald-600',
      items: ['Recommendation Engine', 'Personalization API', 'LLM Assistant', 'Predictive Analytics', 'Contextual Bandit'],
      position: 'right-0'
    }
  ];

  const dataFlows = [
    { from: 'data-sources', to: 'ingestion', label: 'Real-time Events', color: 'blue' },
    { from: 'ingestion', to: 'storage', label: 'Stream Processing', color: 'purple' },
    { from: 'storage', to: 'processing', label: 'Batch & Real-time', color: 'indigo' },
    { from: 'processing', to: 'services', label: 'ML Models', color: 'pink' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-4 animate-pulse">
          360° Consumer Engagement Architecture
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          A comprehensive GenAI-powered platform architecture for Wedding Equipment & NRI Temple Visit platforms
        </p>
      </div>

      {/* Animated Architecture Diagram */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-12 mb-12 overflow-hidden">
        {/* Background Grid Animation */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Architecture Flow */}
        <div className="relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Data Flow Architecture</h2>
          
          {/* Main Architecture Components */}
          <div className="grid grid-cols-5 gap-6 mb-12">
            {architectureComponents.map((component, index) => (
              <div
                key={component.id}
                className={`relative ${
                  hoveredComponent === component.id ? 'z-10' : ''
                }`}
                onMouseEnter={() => setHoveredComponent(component.id)}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                <div className={`bg-gradient-to-br ${component.color} rounded-2xl p-6 shadow-lg`}>
                  <div className="text-4xl mb-3 text-center animate-bounce">{component.icon}</div>
                  <h3 className="text-white font-bold text-center mb-4 text-lg">{component.title}</h3>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white opacity-20 animate-pulse"></div>
                  
                  {/* Hover Details */}
                  {hoveredComponent === component.id && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl p-4 z-20 animate-fadeIn">
                      <ul className="space-y-2">
                        {component.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center">
                            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Animated Connection Lines */}
                {index < architectureComponents.length - 1 && (
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className={`w-6 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 ${
                      activeFlow === index ? 'animate-pulse' : ''
                    }`}>
                      <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
                        activeFlow === index ? 'animate-ping' : ''
                      }`}>
                        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data Flow Indicators */}
            <div className="grid grid-cols-4 gap-4 mb-8">
            {dataFlows.map((flow, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-${flow.color}-100 to-${flow.color}-200 rounded-xl p-4 border-2 border-${flow.color}-300 ${
                  activeFlow === index ? 'scale-105 shadow-lg' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">{flow.label}</span>
                  <div className={`w-3 h-3 rounded-full bg-${flow.color}-500 ${
                    activeFlow === index ? 'animate-ping' : ''
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Layer Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
  {/* Layer 1: Data Ingestion */}
  <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl mr-4">
              📥
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Data Ingestion Layer</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Event Streaming</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Apache Kafka for high-throughput messaging</li>
                <li>• AWS Kinesis for real-time data streaming</li>
                <li>• Event-driven architecture</li>
                <li>• Schema registry for data validation</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Data Sources</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Web & Mobile Analytics</li>
                <li>• CRM Integration (Salesforce, HubSpot)</li>
                <li>• Payment Gateway Events</li>
                <li>• Customer Support Systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Layer 2: Storage & Processing */}
  <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl mr-4">
              ⚙️
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Processing & Storage</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Data Lake</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Delta Lake for ACID transactions</li>
                <li>• AWS S3 for object storage</li>
                <li>• Data versioning & time travel</li>
                <li>• Partitioning strategies</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Feature Store</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time feature serving</li>
                <li>• Feature versioning & lineage</li>
                <li>• Online/Offline consistency</li>
                <li>• Feature monitoring</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Layer 3: ML & AI Services */}
  <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl mr-4">
              🤖
            </div>
            <h3 className="text-2xl font-bold text-gray-800">AI/ML Services</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">ML Models</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Recommendation engines (collaborative filtering)</li>
                <li>• Personalization models</li>
                <li>• Churn prediction</li>
                <li>• Price optimization</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">GenAI Services</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• LLM-powered chatbots</li>
                <li>• Content generation</li>
                <li>• Semantic search</li>
                <li>• Sentiment analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Apache Kafka', category: 'Streaming', color: 'blue' },
            { name: 'Delta Lake', category: 'Storage', color: 'indigo' },
            { name: 'TensorFlow', category: 'ML Framework', color: 'orange' },
            { name: 'PyTorch', category: 'Deep Learning', color: 'red' },
            { name: 'PostgreSQL', category: 'Database', color: 'blue' },
            { name: 'Redis', category: 'Caching', color: 'red' },
            { name: 'Milvus', category: 'Vector DB', color: 'purple' },
            { name: 'FastAPI', category: 'API Framework', color: 'green' },
            { name: 'React', category: 'Frontend', color: 'cyan' },
            { name: 'Docker', category: 'Containerization', color: 'blue' },
            { name: 'Kubernetes', category: 'Orchestration', color: 'blue' },
            { name: 'OpenAI', category: 'LLM', color: 'green' }
          ].map((tech, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-${tech.color}-50 to-${tech.color}-100 rounded-xl p-4 border-2 border-${tech.color}-200`}
            >
              <h4 className="font-bold text-gray-800 mb-1">{tech.name}</h4>
              <p className="text-sm text-gray-600">{tech.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: '🚀',
            title: 'Scalability',
            description: 'Horizontal scaling with microservices architecture',
            color: 'blue'
          },
          {
            icon: '⚡',
            title: 'Real-time Processing',
            description: 'Sub-100ms latency for personalization',
            color: 'yellow'
          },
          {
            icon: '🔒',
            title: 'Security',
            description: 'End-to-end encryption and GDPR compliance',
            color: 'green'
          },
          {
            icon: '📊',
            title: 'Analytics',
            description: 'Real-time dashboards and insights',
            color: 'purple'
          }
        ].map((feature, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-2xl p-6 shadow-lg`}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ArchitectureOverview;
