import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Fish, Leaf, TrendingUp, Users, Award, Globe, Building, Zap, Calendar, 
  GraduationCap, ArrowLeft, Droplet, MapPin, Hammer, Layers, Target, 
  Eye, ShoppingCart, Beaker, Shield, ThermometerSun, CheckCircle, 
  AlertTriangle, Package, Sprout, Activity, Languages
} from 'lucide-react';
import Header from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';

// Reusable Components
const SectionHeader = ({ title, subtitle, icon: Icon }) => (
  <div className="text-center mb-12">
    {Icon && (
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
  </div>
);

const InfoCard = ({ icon: Icon, title, description, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    red: "text-red-600",
    yellow: "text-yellow-600"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
      <Icon className={`w-12 h-12 ${colorClasses[color]} mx-auto mb-4`} />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const EpisodeCard = ({ number, title, description, keyPoints, videoUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
            {number}
          </div>
          <h3 className="text-2xl font-bold flex-1">{title}</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            {isExpanded ? 'छुपाएं' : 'विस्तार से देखें'}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700 text-lg mb-4">{description}</p>
        
        {isExpanded && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                मुख्य बिंदु:
              </h4>
              <ul className="space-y-2">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {videoUrl && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Zap className="w-5 h-5" />
                YouTube पर देखें
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SpeciesCard = ({ name, layer, growth, features, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white`}>
    <h4 className="text-xl font-bold mb-3">{name}</h4>
    <div className="space-y-2 text-sm">
      <p><strong>परत:</strong> {layer}</p>
      <p><strong>वृद्धि:</strong> {growth}</p>
      <div>
        <strong>विशेषताएं:</strong>
        <ul className="mt-2 space-y-1 ml-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-white/80">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const FishFarming = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  const content = {
    hi: {
      title: "मछली पालन प्रशिक्षण कार्यक्रम",
      subtitle: "मछली देने से एक दिन की भूख मिटती है, लेकिन मछली पकड़ना/पालना सिखाने से पूरी जिंदगी की जरूरतें पूरी हो सकती हैं",
      backButton: "सभी प्रशिक्षण पर वापस जाएं",
      trainerTitle: "प्रशिक्षक: रोहित मिश्रा",
      trainerDesc: "पिछले कुछ सालों में कई किसानों की घाटे वाली मछली पालन को लाभ में बदलने का अमूल्य अनुभव। इसी व्यावहारिक अनुभव और वैज्ञानिक ज्ञान के आधार पर यह पूरा प्रशिक्षण कार्यक्रम तैयार किया गया है।",
      registerButton: "अभी पंजीकरण करें"
    },
    en: {
      title: "Fish Farming Training Program",
      subtitle: "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime",
      backButton: "Back to All Trainings",
      trainerTitle: "Trainer: Rohit Mishra",
      trainerDesc: "Invaluable experience in transforming loss-making fish farming into profitable ventures for many farmers over the past few years. This entire training program is prepared based on this practical experience and scientific knowledge.",
      registerButton: "Register Now"
    }
  };

  const currentContent = content[language];

  // Episode Data
  const episodes = [
    {
      number: 1,
      title: language === 'hi' ? "भारत में मछली पालन का परिचय" : "Introduction to Fish Farming in India",
      description: language === 'hi' 
        ? "भारत में मछली पालन का महत्व, बाजार का आकार, और व्यवसाय के अवसर।"
        : "Importance of fish farming in India, market size, and business opportunities.",
      keyPoints: language === 'hi' ? [
        "भारत एक्वाकल्चर में विश्व में दूसरे स्थान पर",
        "लगभग 2 करोड़ लोग सीधे निर्भर",
        "2020 में ₹1232 अरब का बाजार",
        "उत्तर प्रदेश, बिहार में मांग-आपूर्ति अंतर",
        "ताजी मछली की प्राथमिकता",
        "1 एकड़ में खेती से अधिक लाभ"
      ] : [
        "India ranks 2nd globally in aquaculture",
        "About 2 crore people directly dependent",
        "₹1232 billion market in 2020",
        "Demand-supply gap in UP, Bihar",
        "Preference for fresh fish",
        "More profit than traditional farming in 1 acre"
      ],
      videoUrl: "https://www.youtube.com/watch?v=518XHsLLxb4"
    },
    {
      number: 2,
      title: language === 'hi' ? "मछली की प्रजातियों का वर्गीकरण" : "Fish Species Classification",
      description: language === 'hi'
        ? "भारत में पाली जाने वाली मछलियों के तीन मुख्य समूह और उनकी विशेषताएं।"
        : "Three main groups of fish farmed in India and their characteristics.",
      keyPoints: language === 'hi' ? [
        "कार्प समूह (IMC): रोहू, कतला, मृगल - नदी की मछलियां, अच्छी वृद्धि",
        "विदेशी कार्प: सिल्वर कार्प, ग्रास कार्प, कॉमन कार्प",
        "उच्च स्टॉकिंग मछली: मोनोसेक्स टिलापिया, रूपचंदा, पंगास",
        "उच्च मूल्य मछली: सिंघी, पाबदा, कोई, देसी मागुर (₹200-1000/kg)",
        "परत प्रणाली: सतह (कतला), मध्य (रोहू), तल (मृगल)",
        "प्रत्येक प्रजाति का मुंह का आकार और भोजन की आदत अलग"
      ] : [
        "Carp Group (IMC): Rohu, Catla, Mrigal - river fish, good growth",
        "Exotic Carp: Silver carp, Grass carp, Common carp",
        "High Stocking Fish: Monosex Tilapia, Rupchanda, Pangasius",
        "High Value Fish: Singhi, Pabda, Koi, Desi Magur (₹200-1000/kg)",
        "Layer System: Surface (Catla), Middle (Rohu), Bottom (Mrigal)",
        "Each species has different mouth shape and feeding habit"
      ],
      videoUrl: "https://www.youtube.com/watch?v=518XHsLLxb4"
    },
    {
      number: 3,
      title: language === 'hi' ? "स्थल चयन के मानदंड" : "Site Selection Criteria",
      description: language === 'hi'
        ? "मछली फार्म के लिए सही जगह चुनने के 8 महत्वपूर्ण कारक।"
        : "8 important factors for choosing the right location for fish farm.",
      keyPoints: language === 'hi' ? [
        "पानी की उपलब्धता: साल भर लगातार पानी, pH और hardness टेस्ट",
        "मिट्टी की गुणवत्ता: काली/पीली मिट्टी, 8-10 फीट तक जांच",
        "बिजली: 10-12 घंटे जरूरी, बायोफ्लॉक में 24 घंटे",
        "सड़क संपर्क: खराब रोड से ₹5-10/kg कम दाम",
        "भूगोल: समतल जमीन, बाढ़ से सुरक्षित",
        "श्रमिक उपलब्धता: आपातकाल के लिए जरूरी",
        "घर से दूरी: नियमित निगरानी के लिए पास होना चाहिए",
        "बाजार की निकटता: परिवहन लागत कम करने के लिए"
      ] : [
        "Water Availability: Year-round continuous water, pH and hardness test",
        "Soil Quality: Black/yellow soil, check up to 8-10 feet",
        "Electricity: 10-12 hours necessary, 24 hours for biofloc",
        "Road Connectivity: Poor road leads to ₹5-10/kg less price",
        "Geography: Level land, flood-protected",
        "Labour Availability: Essential for emergencies",
        "Distance from Home: Should be close for regular monitoring",
        "Market Proximity: To reduce transportation costs"
      ],
      videoUrl: "https://www.youtube.com/watch?v=0TYYx1KhNRA"
    },
    {
      number: 4,
      title: language === 'hi' ? "तालाब निर्माण दिशानिर्देश" : "Pond Construction Guidelines",
      description: language === 'hi'
        ? "वैज्ञानिक तरीके से तालाब का डिजाइन और निर्माण।"
        : "Scientific pond design and construction.",
      keyPoints: language === 'hi' ? [
        "आकार, गहराई और ढलान का सही डिजाइन",
        "औसत 5-6 फीट कार्य जल गहराई",
        "इन-लेट और आउट-लेट की व्यवस्था",
        "बांध की मजबूती और जल स्तर प्रबंधन",
        "स्थानीय मिट्टी का अधिकतम उपयोग",
        "मशीन से सफाई और हार्वेस्टिंग के लिए डिजाइन",
        "भविष्य में बायोफ्लॉक/RAS के लिए योजना",
        "1 एकड़ या एकाधिक छोटे तालाबों की योजना"
      ] : [
        "Correct design of shape, depth and slope",
        "Average 5-6 feet working water depth",
        "Inlet and outlet arrangement",
        "Bund strength and water level management",
        "Maximum use of local soil",
        "Design for machine cleaning and harvesting",
        "Planning for future biofloc/RAS",
        "Planning for 1 acre or multiple small ponds"
      ],
      videoUrl: "https://www.youtube.com/watch?v=tf8p1nDU44s"
    },
    {
      number: 5,
      title: language === 'hi' ? "तालाब के प्रकार" : "Types of Ponds",
      description: language === 'hi'
        ? "नर्सरी, रियरिंग और ग्रो-आउट तालाब की विशेषताएं।"
        : "Characteristics of Nursery, Rearing and Grow-out ponds.",
      keyPoints: language === 'hi' ? [
        "नर्सरी तालाब: 2.5-3 फीट गहरा, 500-10,000 sq.ft",
        "स्पॉन (3-5mm) से फिंगरलिंग (3-5cm) तक",
        "रियरिंग तालाब: 10,000 sq.ft, 20-50g से 150-200g तक",
        "ग्रो-आउट तालाब: 20,000-40,000+ sq.ft (0.5-1 acre)",
        "मार्केट साइज: कतला/रोहू 800g-1.5kg, पंगास 700-800g",
        "जीवन चक्र: अंडा → लार्वा → स्पॉन → फ्राई → फिंगरलिंग → ग्रोअर → वयस्क",
        "फार्म लेआउट: सामने ग्रो-आउट, पीछे नर्सरी",
        "लेबर क्वार्टर प्रवेश द्वार पर सुरक्षा के लिए"
      ] : [
        "Nursery Pond: 2.5-3 feet deep, 500-10,000 sq.ft",
        "Spawn (3-5mm) to Fingerling (3-5cm)",
        "Rearing Pond: 10,000 sq.ft, 20-50g to 150-200g",
        "Grow-out Pond: 20,000-40,000+ sq.ft (0.5-1 acre)",
        "Market Size: Catla/Rohu 800g-1.5kg, Pangasius 700-800g",
        "Life Cycle: Egg → Larva → Spawn → Fry → Fingerling → Grower → Adult",
        "Farm Layout: Grow-out in front, nursery at back",
        "Labour quarter at entrance for security"
      ],
      videoUrl: "https://www.youtube.com/watch?v=NArtpTuDDtQ"
    },
    {
      number: 6,
      title: language === 'hi' ? "प्रजाति चयन रणनीति" : "Species Selection Strategy",
      description: language === 'hi'
        ? "तालाब के आकार और बाजार की मांग के आधार पर मछली चयन।"
        : "Fish selection based on pond size and market demand.",
      keyPoints: language === 'hi' ? [
        "दो मुख्य आधार: तालाब का क्षेत्र और बाजार की मांग",
        "छोटे तालाब (<0.5 acre): उच्च स्टॉकिंग मछली (टिलापिया, पंगास)",
        "बड़े तालाब (1+ acre): IMC समूह (रोहू, कतला, मृगल)",
        "बाजार में रोज बिकने वाली प्रजाति चुनें",
        "उच्च मूल्य मछली: कम मात्रा में शुरू करें",
        "नए किसान: नियमित चलने वाली प्रजाति से शुरुआत",
        "स्थिर होने के बाद प्रयोग करें",
        "स्थानीय खरीदार और थोक विक्रेता की प्राथमिकता जानें"
      ] : [
        "Two main bases: Pond area and market demand",
        "Small ponds (<0.5 acre): High stocking fish (Tilapia, Pangasius)",
        "Large ponds (1+ acre): IMC group (Rohu, Catla, Mrigal)",
        "Choose species that sell daily in market",
        "High value fish: Start with small quantity",
        "New farmers: Start with regularly selling species",
        "Experiment after stabilization",
        "Know local buyer and wholesaler preferences"
      ],
      videoUrl: "https://www.youtube.com/watch?v=Ygd3_nP-gNM"
    },
    {
      number: 7,
      title: language === 'hi' ? "बीज गुणवत्ता पहचान" : "Seed Quality Identification",
      description: language === 'hi'
        ? "स्वस्थ मछली के बच्चे की पहचान और कंडीशनिंग।"
        : "Identification of healthy fish seed and conditioning.",
      keyPoints: language === 'hi' ? [
        "पंजीकृत हैचरी से खरीदें, खुद जाकर चेक करें",
        "रंग: प्राकृतिक होना चाहिए, सफेद/फीका नहीं",
        "त्वचा: कट, घाव, सफेद धब्बे नहीं होने चाहिए",
        "पंख: पूरे होने चाहिए, फटे/कटे नहीं",
        "गतिविधि परीक्षण: हाथ पर रखें, सक्रिय होना चाहिए",
        "आकार एकरूपता: सभी लगभग एक साइज",
        "कंडीशनिंग: हापा/टैंक में कुछ घंटे रखें",
        "पेट खाली होने दें, तनाव कम करें"
      ] : [
        "Buy from registered hatchery, check yourself",
        "Color: Should be natural, not white/faded",
        "Skin: No cuts, wounds, white patches",
        "Fins: Should be complete, not torn/cut",
        "Activity test: Place on hand, should be active",
        "Size uniformity: All approximately same size",
        "Conditioning: Keep in hapa/tank for few hours",
        "Let stomach empty, reduce stress"
      ],
      videoUrl: "https://www.youtube.com/watch?v=GW_czoBHS8k"
    },
    {
      number: 8,
      title: language === 'hi' ? "बीज खरीद प्रक्रिया" : "Seed Purchasing Process",
      description: language === 'hi'
        ? "लाइन सिस्टम, गिनती और परिवहन की सही विधि।"
        : "Correct method of line system, counting and transport.",
      keyPoints: language === 'hi' ? [
        "लाइन सिस्टम: 1000 line = 1kg में 1000 मछली (1g each)",
        "500 line = 1kg में 500 मछली (2g each)",
        "गिनती में धोखा: ऊपर से छोटी, नीचे से बड़ी मछली",
        "नीचे से बीज निकलवाकर गिनें",
        "बार-बार रैंडम चेक करें",
        "पैकिंग: पॉलीबैग में केवल ऑक्सीजन भरें",
        "छोटे IMC/कैटफिश (<1g) के लिए पॉलीबैग",
        "बड़े साइज के लिए टैंक/तिरपाल ट्रांसपोर्ट"
      ] : [
        "Line System: 1000 line = 1000 fish in 1kg (1g each)",
        "500 line = 500 fish in 1kg (2g each)",
        "Counting fraud: Small from top, big from bottom",
        "Get seed from bottom and count",
        "Random check repeatedly",
        "Packing: Fill only oxygen in polybag",
        "Polybag for small IMC/catfish (<1g)",
        "Tank/tarpaulin transport for large size"
      ],
      videoUrl: "https://www.youtube.com/watch?v=szc7UzdlqQI"
    },
    {
      number: 9,
      title: language === 'hi' ? "तालाब जल तैयारी" : "Pond Water Preparation",
      description: language === 'hi'
        ? "प्री-स्टॉकिंग प्रबंधन और वैज्ञानिक तरीके से पानी तैयार करना।"
        : "Pre-stocking management and scientific water preparation.",
      keyPoints: language === 'hi' ? [
        "पुराने तालाब: पानी निकालें, धूप में सुखाएं",
        "ऊपर की 3-6 इंच मिट्टी हटाएं",
        "चूना (डोलोमाइट): 40kg/acre, pH संतुलन",
        "1/3 पानी भरें, फिर खाद डालें (केवल IMC के लिए)",
        "पूरा पानी भरें, प्रोबायोटिक्स डालें",
        "1 दिन बाद pH चेक करें",
        "लाइनर तालाब: सफाई + प्रोबायोटिक्स",
        "पंगास/सिंघी/पाबदा के लिए खाद नहीं"
      ] : [
        "Old pond: Drain water, sun-dry",
        "Remove top 3-6 inch soil",
        "Lime (Dolomite): 40kg/acre, pH balance",
        "Fill 1/3 water, then add manure (only for IMC)",
        "Fill full water, add probiotics",
        "Check pH after 1 day",
        "Liner pond: Cleaning + probiotics",
        "No manure for Pangasius/Singhi/Pabda"
      ],
      videoUrl: "https://www.youtube.com/watch?v=sy5vU1KjDU0"
    },
    {
      number: 10,
      title: language === 'hi' ? "प्रोबायोटिक्स का उपयोग" : "Probiotics Usage",
      description: language === 'hi'
        ? "अच्छे बैक्टीरिया का महत्व और उपयोग विधि।"
        : "Importance of good bacteria and usage method.",
      keyPoints: language === 'hi' ? [
        "गुड बैक्टीरिया: पानी और मछली दोनों के लिए फायदेमंद",
        "बैड बैक्टीरिया से प्रतिस्पर्धा: स्थान, ऑक्सीजन, पोषण",
        "तल पर गंदगी को तोड़ते हैं, पानी साफ रखते हैं",
        "डोज: 1kg/acre, हर 15-20 दिन में",
        "कीमत: ₹200-300/kg (दवा से सस्ता)",
        "पाउडर फॉर्म: पानी के पैरामीटर के लिए",
        "लिक्विड फॉर्म: तल की गंदगी के लिए",
        "एक्टिवेशन: गुड़/चीनी के साथ 1-2 घंटे"
      ] : [
        "Good Bacteria: Beneficial for both water and fish",
        "Competition with bad bacteria: Space, oxygen, nutrition",
        "Break down dirt at bottom, keep water clean",
        "Dose: 1kg/acre, every 15-20 days",
        "Price: ₹200-300/kg (cheaper than medicine)",
        "Powder form: For water parameters",
        "Liquid form: For bottom dirt",
        "Activation: With jaggery/sugar for 1-2 hours"
      ],
      videoUrl: "https://www.youtube.com/watch?v=wsgDC2oRls8"
    },
    {
      number: 11,
      title: language === 'hi' ? "बायोसिक्योरिटी उपाय" : "Biosecurity Measures",
      description: language === 'hi'
        ? "चार प्रकार के खतरों से मछली की सुरक्षा।"
        : "Protection of fish from four types of threats.",
      keyPoints: language === 'hi' ? [
        "चिड़िया से बचाव: बर्ड नेट/फेंसिंग (₹8-10k/acre)",
        "दिन में किंगफिशर 1500+ मछली खा सकती है",
        "सांप/मेंढक/केकड़ा: क्रैब फेंसिंग (3 फीट नेट)",
        "माइक्रो-ऑर्गेनिज्म: पोटैशियम परमैंगनेट घोल",
        "सभी उपकरण डिप करें, क्रॉस-कंटैमिनेशन रोकें",
        "चोर से बचाव: फेंसिंग + CCTV + गार्ड",
        "मालिक को भी रात में चेक करना चाहिए",
        "बिना वजह मृत्यु और चोरी रोकें"
      ] : [
        "Bird protection: Bird net/fencing (₹8-10k/acre)",
        "Kingfisher can eat 1500+ fish in a day",
        "Snake/frog/crab: Crab fencing (3 feet net)",
        "Micro-organisms: Potassium permanganate solution",
        "Dip all equipment, prevent cross-contamination",
        "Theft protection: Fencing + CCTV + guard",
        "Owner should also check at night",
        "Prevent unnecessary death and theft"
      ],
      videoUrl: "https://www.youtube.com/watch?v=UfSzhhf4fEU"
    },
    {
      number: 12,
      title: language === 'hi' ? "बीज स्टॉकिंग प्रक्रिया" : "Seed Stocking Process",
      description: language === 'hi'
        ? "तापमान कंडीशनिंग और सुरक्षित स्टॉकिंग विधि।"
        : "Temperature conditioning and safe stocking method.",
      keyPoints: language === 'hi' ? [
        "पैकेट को 15-20 मिनट तालाब पर तैराएं",
        "तापमान मैच होने दें, झटका न लगे",
        "ट्रांसपोर्ट का पानी तालाब में न डालें",
        "गमछे से मछली निकालें, पानी अलग करें",
        "टैंक/ड्रम: आधा पुराना पानी निकालें",
        "फार्म का नया पानी मिलाएं (एक्लिमेटाइजेशन)",
        "प्लास्टिक डलिया से धीरे-धीरे छोड़ें",
        "अमोनिया/गैस से बचने के लिए पानी अलग करें"
      ] : [
        "Float packet on pond for 15-20 minutes",
        "Let temperature match, avoid shock",
        "Don't pour transport water in pond",
        "Remove fish with cloth, separate water",
        "Tank/drum: Remove half old water",
        "Mix farm's new water (acclimatization)",
        "Release slowly with plastic basket",
        "Separate water to avoid ammonia/gas"
      ],
      videoUrl: "https://www.youtube.com/watch?v=YIXAhWrV4b4"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 mt-20">
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/training/all-tranings')}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{currentContent.backButton}</span>
            </button>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Languages className="w-5 h-5" />
              <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {currentContent.title}
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            "{currentContent.subtitle}"
          </p>
        </div>
      </div>

      {/* Trainer Introduction */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentContent.trainerTitle}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentContent.trainerDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Indian Fisheries Scenario */}
        <SectionHeader 
          title={language === 'hi' ? "भारतीय मत्स्य पालन परिदृश्य" : "Indian Fisheries Scenario"}
          icon={Globe}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <InfoCard
            icon={Globe}
            title={language === 'hi' ? "वैश्विक रैंकिंग" : "Global Ranking"}
            description={language === 'hi' ? "एक्वाकल्चर में दुनिया में दूसरे स्थान पर" : "2nd in world aquaculture"}
            color="blue"
          />
          <InfoCard
            icon={Users}
            title={language === 'hi' ? "रोजगार" : "Employment"}
            description={language === 'hi' ? "लगभग 2 करोड़ लोग सीधे निर्भर" : "About 2 crore people directly dependent"}
            color="green"
          />
          <InfoCard
            icon={TrendingUp}
            title={language === 'hi' ? "योगदान" : "Contribution"}
            description={language === 'hi' ? "वैश्विक उत्पादन का 6.3%" : "6.3% of global production"}
            color="purple"
          />
          <InfoCard
            icon={Building}
            title={language === 'hi' ? "GDP योगदान" : "GDP Contribution"}
            description={language === 'hi' ? "कुल GDP का 1.07%" : "1.07% of total GDP"}
            color="orange"
          />
        </div>

        {/* Market Size */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {language === 'hi' ? "भारतीय मछली पालन बाजार" : "Indian Fish Farming Market"}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                {language === 'hi' ? "बाजार का आकार" : "Market Size"}
              </h3>
              <p className="text-gray-700 text-lg mb-4">
                {language === 'hi' 
                  ? "2020 में लगभग ₹1232 अरब का बाजार, जो लगातार बढ़ रहा है।"
                  : "Market of approximately ₹1232 billion in 2020, continuously growing."}
              </p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-bold text-gray-800 mb-2">
                  {language === 'hi' ? "प्रमुख राज्य:" : "Major States:"}
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>{language === 'hi' ? "आंध्र प्रदेश: राष्ट्रीय उत्पादन का 35%" : "Andhra Pradesh: 35% of national production"}</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>{language === 'hi' ? "पश्चिम बंगाल: राष्ट्रीय उत्पादन का 15%" : "West Bengal: 15% of national production"}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                {language === 'hi' ? "अवसर" : "Opportunities"}
              </h3>
              <p className="text-gray-700 text-lg mb-4">
                {language === 'hi'
                  ? "उत्तर प्रदेश, बिहार, छत्तीसगढ़, ओडिशा जैसे राज्यों में मांग आपूर्ति से अधिक है, जिससे नए मछुआरों के लिए उत्कृष्ट अवसर उपलब्ध हैं।"
                  : "States like UP, Bihar, Chhattisgarh, Odisha have demand exceeding supply, providing excellent opportunities for new fish farmers."}
              </p>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2">
                  {language === 'hi' ? "मांग-आपूर्ति अंतर:" : "Demand-Supply Gap:"}
                </h4>
                <p className="text-gray-600">
                  {language === 'hi'
                    ? "आंध्र प्रदेश बिहार, यूपी जैसे राज्यों को फ्रॉजन मछली भेजता है क्योंकि स्थानीय उत्पादन मांग को पूरा नहीं कर पाता।"
                    : "Andhra Pradesh sends frozen fish to states like Bihar, UP as local production cannot meet demand."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fresh vs Frozen Fish */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {language === 'hi' ? "ताजी बनाम जमी हुई मछली" : "Fresh vs Frozen Fish"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <Fish className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {language === 'hi' ? "ताजी मछली" : "Fresh Fish"}
              </h3>
              <p className="text-gray-600">
                {language === 'hi'
                  ? "उपभोक्ता ताजी और जीवित मछली को प्राथमिकता देते हैं। स्थानीय बाजार में सीधे बेचने से अधिक दर और बेहतर प्रतिष्ठा मिलती है।"
                  : "Consumers prefer fresh and live fish. Direct selling in local market gives better rates and reputation."}
              </p>
            </div>
            <div className="text-center p-6 bg-red-50 rounded-xl">
              <Zap className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {language === 'hi' ? "जमी हुई मछली" : "Frozen Fish"}
              </h3>
              <p className="text-gray-600">
                {language === 'hi'
                  ? "लंबी दूरी के परिवहन में प्रिज़र्वेटिव्स (जैसे फॉर्मलिन) का उपयोग, जो स्वास्थ्य के लिए जोखिम भरा हो सकता है और कई बार प्रतिबंधित है।"
                  : "Use of preservatives (like formalin) in long-distance transport, which can be health risk and often banned."}
              </p>
            </div>
          </div>
        </div>

        {/* Fish Species Classification */}
        <SectionHeader 
          title={language === 'hi' ? "मछली प्रजातियों का वर्गीकरण" : "Fish Species Classification"}
          subtitle={language === 'hi' 
            ? "भारत में पाली जाने वाली मछलियों के तीन मुख्य समूह"
            : "Three main groups of fish farmed in India"}
          icon={Fish}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              {language === 'hi' ? "1. कार्प समूह (IMC)" : "1. Carp Group (IMC)"}
            </h3>
            <div className="space-y-4">
              <SpeciesCard
                name={language === 'hi' ? "कतला (Catla)" : "Catla"}
                layer={language === 'hi' ? "सतह परत" : "Surface layer"}
                growth={language === 'hi' ? "बहुत तेज" : "Very fast"}
                features={language === 'hi' ? [
                  "मुंह ऊपर की ओर",
                  "ऑक्सीजन अधिक मिलती है",
                  "प्राकृतिक भोजन प्रचुर"
                ] : [
                  "Mouth upward",
                  "More oxygen available",
                  "Abundant natural food"
                ]}
                color="from-blue-400 to-blue-600"
              />
              <SpeciesCard
                name={language === 'hi' ? "रोहू (Rohu)" : "Rohu"}
                layer={language === 'hi' ? "मध्य परत" : "Middle layer"}
                growth={language === 'hi' ? "मध्यम" : "Medium"}
                features={language === 'hi' ? [
                  "सामान्य शरीर आकार",
                  "कॉलम में रहती है",
                  "संतुलित वृद्धि"
                ] : [
                  "Normal body shape",
                  "Lives in column",
                  "Balanced growth"
                ]}
                color="from-green-400 to-green-600"
              />
              <SpeciesCard
                name={language === 'hi' ? "मृगल (Mrigal)" : "Mrigal"}
                layer={language === 'hi' ? "तल परत" : "Bottom layer"}
                growth={language === 'hi' ? "धीमी" : "Slow"}
                features={language === 'hi' ? [
                  "मुंह नीचे की ओर",
                  "तल का कचरा खाती है",
                  "मिट्टी से भोजन फिल्टर करती है"
                ] : [
                  "Mouth downward",
                  "Eats bottom waste",
                  "Filters food from soil"
                ]}
                color="from-orange-400 to-orange-600"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
              {language === 'hi' ? "2. उच्च स्टॉकिंग मछली" : "2. High Stocking Fish"}
            </h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl p-6 text-white">
                <h4 className="text-xl font-bold mb-3">
                  {language === 'hi' ? "मोनोसेक्स टिलापिया" : "Monosex Tilapia"}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "केवल नर रखें" : "Keep only males"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "उच्च घनत्व संभव" : "High density possible"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "मिश्रित लिंग से बचें" : "Avoid mixed sex"}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl p-6 text-white">
                <h4 className="text-xl font-bold mb-3">
                  {language === 'hi' ? "पंगास (Pangasius)" : "Pangasius"}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "उच्च उत्पादन" : "High production"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "तेज वृद्धि" : "Fast growth"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "प्रजाति जांच जरूरी" : "Species check necessary"}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl p-6 text-white">
                <h4 className="text-xl font-bold mb-3">
                  {language === 'hi' ? "रूपचंदा" : "Rupchanda"}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "छोटे तालाब में उपयुक्त" : "Suitable for small ponds"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "अच्छा बाजार मूल्य" : "Good market value"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">
              {language === 'hi' ? "3. उच्च मूल्य मछली" : "3. High Value Fish"}
            </h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white">
                <h4 className="text-xl font-bold mb-3">
                  {language === 'hi' ? "सिंघी / मागुर" : "Singhi / Magur"}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "₹400-800/kg" : "₹400-800/kg"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "100-500g में बिक्री" : "Sell at 100-500g"}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl p-6 text-white">
                <h4 className="text-xl font-bold mb-3">
                  {language === 'hi' ? "पाबदा" : "Pabda"}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "₹300-600/kg" : "₹300-600/kg"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "बीज महंगा" : "Expensive seed"}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl p-6 text-white">
                <h4 className="text-xl font-bold mb-3">
                  {language === 'hi' ? "कोई / मुर्रेल" : "Koi / Murrel"}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "₹200-1000/kg" : "₹200-1000/kg"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{language === 'hi' ? "सीमित बीज उपलब्धता" : "Limited seed availability"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Training Episodes */}
        <SectionHeader 
          title={language === 'hi' ? "प्रशिक्षण एपिसोड" : "Training Episodes"}
          subtitle={language === 'hi' 
            ? "व्यावहारिक मछली पालन का संपूर्ण ज्ञान - शुरुआत से लेकर हार्वेस्टिंग तक"
            : "Complete practical fish farming knowledge - from start to harvesting"}
          icon={GraduationCap}
        />

        <div className="space-y-8 mb-16">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.number} {...episode} />
          ))}
        </div>

        {/* 1 Acre Comparison */}
        <div className="bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {language === 'hi' ? "1 एकड़: खेती बनाम मछली पालन" : "1 Acre: Farming vs Fish Farming"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-20 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'hi' ? "पारंपरिक खेती" : "Traditional Farming"}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  {language === 'hi' ? "कम लाभ" : "Low profit"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  {language === 'hi' ? "मौसम निर्भर" : "Weather dependent"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  {language === 'hi' ? "अधिक श्रम" : "More labor"}
                </li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'hi' ? "मछली पालन" : "Fish Farming"}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  {language === 'hi' ? "अधिक लाभकारी" : "More profitable"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  {language === 'hi' ? "वैज्ञानिक प्रबंधन" : "Scientific management"}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  {language === 'hi' ? "कम जोखिम" : "Less risk"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Health Benefits */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {language === 'hi' ? "पोषण और स्वास्थ्य लाभ" : "Nutrition and Health Benefits"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              icon={Leaf}
              title={language === 'hi' ? "उच्च गुणवत्ता वाला प्रोटीन" : "High Quality Protein"}
              description={language === 'hi' ? "20 अमीनो एसिड में से 10 आवश्यक अमीनो एसिड" : "10 essential amino acids out of 20"}
              color="green"
            />
            <InfoCard
              icon={Award}
              title={language === 'hi' ? "मस्तिष्क और शरीर के लिए लाभदायक" : "Beneficial for Brain and Body"}
              description={language === 'hi' ? "शारीरिक और मानसिक विकास के लिए आवश्यक" : "Essential for physical and mental development"}
              color="blue"
            />
            <InfoCard
              icon={TrendingUp}
              title={language === 'hi' ? "किफायती पोषण" : "Affordable Nutrition"}
              description={language === 'hi' ? "₹150-200 में 1 किग्रा मछली में 300 ग्राम प्रोटीन" : "300g protein in 1kg fish for ₹150-200"}
              color="purple"
            />
          </div>
        </div>

        {/* Future Scope */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {language === 'hi' ? "भविष्य की स्थिरता" : "Future Stability"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">
                {language === 'hi' ? "स्थिर व्यवसाय" : "Stable Business"}
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'hi'
                  ? "जब तक इंसान जीवित है, तब तक मछली की मांग समाप्त नहीं होगी।"
                  : "As long as humans exist, demand for fish will never end."}
              </p>
              <p className="text-gray-700">
                {language === 'hi'
                  ? "कोविड के दौरान पोल्ट्री व्यवसाय प्रभावित हुआ, लेकिन मछली पालन पर कम प्रभाव पड़ा क्योंकि मछली को तालाब में रखकर बेचा जा सकता है।"
                  : "During COVID, poultry business was affected, but fish farming had less impact as fish can be kept in pond and sold."}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">
                {language === 'hi' ? "रोजगार उत्पादन" : "Employment Generation"}
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  {language === 'hi' ? "फार्म श्रमिक" : "Farm workers"}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  {language === 'hi' ? "फार्म तकनीशियन (BSc/MSc फिशरी)" : "Farm technicians (BSc/MSc Fishery)"}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  {language === 'hi' ? "खुदरा विक्रेता" : "Retailers"}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  {language === 'hi' ? "ग्रामीण क्षेत्रों में आय सृजन" : "Income generation in rural areas"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'hi' ? "प्रशिक्षण कार्यक्रम में शामिल हों" : "Join Training Program"}
          </h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            {language === 'hi'
              ? "केवल YouTube देखकर शुरू न करें। हमारे 4 दिवसीय व्यावहारिक प्रशिक्षण कार्यक्रम में शामिल होकर स्थल चयन, स्टॉकिंग, फीडिंग, जल पैरामीटर और फसल योजना जैसे विषयों को व्यावहारिक रूप से सीखें।"
              : "Don't start just by watching YouTube. Join our 4-day practical training program to learn site selection, stocking, feeding, water parameters and harvest planning practically."}
          </p>
          <button 
            onClick={() => navigate('/training/apply')}
            className="bg-white text-green-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            {currentContent.registerButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FishFarming;