import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import desi_logo_inverted from '../../assets/desi_logo_inverted.png';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section - 100vh minus header */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 animate-gradient"></div>
        
        {/* Geometric Shapes Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200/30 to-green-300/30 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-2xl"
          ></motion.div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-green-100"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-800">🌾 Trusted by 10,000+ Farmers</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed"
              >
                <span className="block text-gray-900">Sell Your Crops </span>
                <span className="block gradient-text mt-2">Directly to Customers</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed max-w-xl"
              >
                DesiKisan Farmer App empowers you to sell your produce directly to urban customers without any middlemen. Set your own prices, get full control, and receive timely payments straight into your bank account.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-8 pt-4"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">0%</div>
                  <div className="text-sm text-gray-600">Commission</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">24 hrs</div>
                  <div className="text-sm text-gray-600">Payment Cycle</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Price Control</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  to="/auth"
                  className="group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 text-center overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Join as a Farmer
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Link>
                <Link
                  to="/how-desi-basket-works"
                  className="group glass-effect hover:bg-white/20 text-green-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center flex items-center justify-center gap-2 border-2 border-green-600"
                >
                  How It Works
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Main Card with Glassmorphism */}
              <div className="relative">
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -left-8 z-20"
                >
                  <div className="glass-effect bg-white/40 rounded-2xl p-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Certified</div>
                        <div className="text-sm text-gray-600">100% Organic</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-6 z-20"
                >
                  <div className="glass-effect bg-white/40 rounded-2xl p-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Fast</div>
                        <div className="text-sm text-gray-600">Same Day</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Main Product Grid */}
                <div className="relative bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative overflow-hidden rounded-xl mb-3">
                        <img
                          src="https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg"
                          alt="Fresh Vegetables"
                          className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <p className="font-bold text-gray-900">Fresh Vegetables</p>
                      <p className="text-sm text-green-600">Farm Fresh Daily</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      className="bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative overflow-hidden rounded-xl mb-3">
                        <img
                          src="https://media.licdn.com/dms/image/v2/C4E1BAQEHYo5_dBogWQ/company-background_10000/company-background_10000/0/1642089902290/naturalfruitsind_cover?e=2147483647&v=beta&t=OzMi4wUj_2KUcWbnKu65dzKZKpLvK3pycw0eAj0jYY8"
                          alt="Natural Fruits"
                          className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <p className="font-bold text-gray-900">Natural Fruits</p>
                      <p className="text-sm text-green-600">Seasonal Picks</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      className="bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group col-span-2"
                    >
                      <div className="relative overflow-hidden rounded-xl mb-3">
                        <img
                          src="https://shawellness.com/shamagazine/wp-content/uploads/2023/08/iStock-1276446367_-scaled.jpg"
                          alt="Dairy Products"
                          className="w-full h-28 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <p className="font-bold text-gray-900">Dairy Products</p>
                      <p className="text-sm text-green-600">Pure & Natural</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          {/* <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <span className="text-sm text-gray-600 font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-green-600 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-green-600 rounded-full"
              ></motion.div>
            </motion.div>
          </div> */}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 mb-4">
              How DesiKisan Works for Farmers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From your farm to the customer — simple, transparent, profitable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1: List Your Produce */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl mb-6 shadow-lg">
                <span className="text-5xl">🧺</span>
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                List Your Produce
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Upload crops, vegetables, fruits, grains, milk, or any farm products directly from your mobile. Set your own prices.
              </p>
            </motion.div>

            {/* Step 2: Get Orders Instantly */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl mb-6 shadow-lg">
                <span className="text-5xl">🧮</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">
                Get Orders Instantly
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Receive customer orders in real time. No middlemen, no mandi pressure — full control stays with you.
              </p>
            </motion.div>

            {/* Step 3: Get Paid Directly */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl mb-6 shadow-lg">
                <span className="text-5xl">💳</span>
              </div>
              <h3 className="text-2xl font-bold text-teal-700 mb-4">
                Get Paid Directly
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Payments are transferred directly to your bank account within 24 hours after delivery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 mb-4">
              Why Choose DesiKisan?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-bold text-green-800 mb-3 text-lg">Verified Farmers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Join a trusted network of verified farmers selling genuine farm produce.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-bold text-emerald-800 mb-3 text-lg">Fast Order Processing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Orders are confirmed quickly so you can plan harvesting and delivery easily.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">💯</span>
              </div>
              <h3 className="font-bold text-teal-800 mb-3 text-lg">No Middlemen</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Sell directly to customers and earn the full value of your hard work.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-green-800 mb-3 text-lg">Fair & Transparent Pricing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">You decide the price. We ensure transparent payments without hidden charges.</p>
            </motion.div>
          </div>

          {/* CTA Section within Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Grow Your Income with DesiKisan?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of farmers already selling directly to customers and earning better profits.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/50 transform hover:scale-105"
            >
              Get Started Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to Experience Desi Basket Goodness?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-green-100 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers who enjoy fresh, natural produce delivered right to their doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/auth"
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A5A32] text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={desi_logo_inverted} alt="Desi Basket" className="w-56" />
              </div>
              <p className="text-green-200 text-sm">
                Connecting farmers directly with consumers for fresh, natural produce.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/how-desi-basket-works" className="text-green-200 hover:text-white">How It Works</Link></li>
                <li><Link to="/auth" className="text-green-200 hover:text-white">Login</Link></li>
                <li><Link to="#" className="text-green-200 hover:text-white">About Us</Link></li>
                <li><Link to="#" className="text-green-200 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-green-200">support@desibasket.com</li>
                <li className="text-green-200">+91 98765 43210</li>
                <li className="text-green-200">Mon-Sat: 8AM - 8PM</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-6 text-center text-sm text-green-300">
            <p>© {new Date().getFullYear()} Desi Basket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;