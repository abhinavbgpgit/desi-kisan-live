import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { LanguageProvider } from './context/LanguageContext'
import LandingPage from './pages/landingPage/LandingPage.jsx'
import HowDesiBasketWorks from './pages/HowDesiBasketWorks'
import Auth from './pages/Auth'
import MainLayout from './layouts/MainLayout'
import HomeDashboard from './pages/HomeDashboard'
import CategoryListing from './pages/CategoryListing'
import ProductDetails from './pages/ProductDetails'
import WeeklyCart from './pages/WeeklyCart'
import RequestConfirmation from './pages/RequestConfirmation'
import MyRequests from './pages/MyRequests'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import AddProduct from './pages/AddProduct'
import EditProfile from './pages/EditProfile'
import ManageProducts from './pages/ManageProducts'
import AllTrainings from './pages/training/all-tranings/AllTrainings'
import UpcomingTrainings from './pages/training/upcoming/UpcomingTrainings'
import ApplyForTraining from './pages/training/apply/ApplyForTraining'
import SuccessfulTrainings from './pages/training/gallery/SuccessfulTrainings'
import TrainingDetails from './pages/training/all-tranings/TrainingDetails'
import BeeTraining from './pages/training/all-tranings/BeeTraining'
import FishFarming from './pages/training/all-tranings/fish_farming/FishFarming'
import MushroomFarming from './pages/training/all-tranings/MushroomFarming'
import DairyFarming from './pages/training/all-tranings/DairyFarming'
import GoatFarming from './pages/training/all-tranings/GoatFarming'
import Horticulture from './pages/training/all-tranings/Horticulture'
import NetHouse from './pages/training/all-tranings/NetHouse'
import VermiCompost from './pages/training/all-tranings/VermiCompost'
import OrganicFarming from './pages/training/all-tranings/OrganicFarming'
import FoodProcessing from './pages/training/all-tranings/FoodProcessing'
import PigFarming from './pages/training/all-tranings/PigFarming'
import SeasonalPestControl from './pages/training/all-tranings/SeasonalPestControl'
import WasteManagement from './pages/training/all-tranings/WasteManagement'
import ModernFarming from './pages/training/all-tranings/ModernFarming'
import Hydroponics from './pages/training/all-tranings/Hydroponics'
import IrrigationSystem from './pages/training/all-tranings/IrrigationSystem'
import MultiLayerFarming from './pages/training/all-tranings/MultiLayerFarming'
import DuckFarming from './pages/training/all-tranings/DuckFarming'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return user ? children : <Navigate to="/landingPage" replace />;
};

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/landingPage" replace />} />
              <Route path="/landingPage" element={<LandingPage />} />
              <Route path="/how-desi-basket-works" element={<HowDesiBasketWorks />} />
              <Route path="/auth" element={
                <AuthRoute>
                  <Auth />
                </AuthRoute>
              } />

              <Route path="/training/all-tranings" element={<AllTrainings />} />
              <Route path="/training/upcoming" element={<UpcomingTrainings />} />
              <Route path="/training/apply" element={<ApplyForTraining />} />
              <Route path="/training/gallery" element={<SuccessfulTrainings />} />
              <Route path="/training/details/:id" element={<TrainingDetails />} />
              
              {/* Individual Training Pages */}
              <Route path="/training/bee-training" element={<BeeTraining />} />
              <Route path="/training/fish-farming" element={<FishFarming />} />
              <Route path="/training/mushroom-farming" element={<MushroomFarming />} />
              <Route path="/training/dairy-farming" element={<DairyFarming />} />
              <Route path="/training/goat-farming" element={<GoatFarming />} />
              <Route path="/training/horticulture" element={<Horticulture />} />
              <Route path="/training/net-house" element={<NetHouse />} />
              <Route path="/training/vermi-compost" element={<VermiCompost />} />
              <Route path="/training/organic-farming" element={<OrganicFarming />} />
              <Route path="/training/food-processing" element={<FoodProcessing />} />
              <Route path="/training/pig-farming" element={<PigFarming />} />
              <Route path="/training/seasonal-pest-control" element={<SeasonalPestControl />} />
              <Route path="/training/waste-management" element={<WasteManagement />} />
              <Route path="/training/modern-farming" element={<ModernFarming />} />
              <Route path="/training/hydroponics" element={<Hydroponics />} />
              <Route path="/training/irrigation-system" element={<IrrigationSystem />} />
              <Route path="/training/multi-layer-farming" element={<MultiLayerFarming />} />
              <Route path="/training/duck-farming" element={<DuckFarming />} />

            <Route path="/dashboard" element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }>
                <Route index element={<HomeDashboard />} />
                <Route path="category/:categoryId" element={<CategoryListing />} />
                <Route path="product/:productId" element={<ProductDetails />} />
                <Route path="cart" element={<WeeklyCart />} />
                <Route path="request-confirmation" element={<RequestConfirmation />} />
                <Route path="requests" element={<MyRequests />} />
                <Route path="profile" element={<Profile />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="manage-products" element={<ManageProducts />} />
              </Route>

              {/* Redirect /app to /dashboard for backward compatibility */}
              <Route path="/app/*" element={<Navigate to="/dashboard" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
