import { useState, useEffect } from 'react'
import EnhancedInteractive from '@/components/EnhancedInteractive.jsx'
import Playground from '@/components/Playground.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { 
  FileText, Download, Users, Award, BookOpen, BarChart3, 
  Database, Github, Mail, ExternalLink, Microscope, FlaskConical,
  TrendingUp, Zap, Filter, Search, Play, Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import './App.css'

// Import figures
import figure1 from './assets/figure1_heatmap.png'
import figure2 from './assets/figure2_model_performance.png'
import figure3 from './assets/figure3_feature_importance.png'
import figure4 from './assets/figure4_comparison_chart.png'

// Sample data for interactive visualizations
const compoundsData = [
  { name: 'TiS₂', voltage: 3.9, capacity: 239, energy: 3074, conductivity: 222, cycles: 62500, type: 'Sulfide' },
  { name: 'TiO₂', voltage: 3.4, capacity: 335, energy: 2970, conductivity: 0.000001, cycles: 5000, type: 'Oxide' },
  { name: 'Ti₂S₃', voltage: 3.7, capacity: 220, energy: 2850, conductivity: 150, cycles: 45000, type: 'Sulfide' },
  { name: 'TiPO₄', voltage: 3.2, capacity: 280, energy: 2650, conductivity: 0.00001, cycles: 8000, type: 'Phosphate' },
  { name: 'TiVO₄', voltage: 3.5, capacity: 290, energy: 2800, conductivity: 0.001, cycles: 12000, type: 'Oxide' },
  { name: 'TiSe₂', voltage: 3.8, capacity: 225, energy: 2900, conductivity: 180, cycles: 55000, type: 'Selenide' },
]

const featureImportanceData = [
  { feature: 'Average Voltage', importance: 45, color: '#4f46e5' },
  { feature: 'Gravimetric Capacity', importance: 18, color: '#7c3aed' },
  { feature: 'Volumetric Capacity', importance: 15, color: '#2563eb' },
  { feature: 'Max Delta Volume', importance: 10, color: '#0891b2' },
  { feature: 'Stability', importance: 7, color: '#059669' },
  { feature: 'Others', importance: 5, color: '#64748b' },
]

const modelPerformanceData = [
  { model: 'Random Forest', accuracy: 95, precision: 0.94, recall: 0.96, f1: 0.95, roc: 0.98 },
  { model: 'Decision Tree', accuracy: 93, precision: 0.91, recall: 0.73, f1: 0.81, roc: 0.85 },
  { model: 'SVM', accuracy: 86, precision: 0.85, recall: 0.87, f1: 0.86, roc: 0.90 },
  { model: 'Logistic Reg.', accuracy: 81, precision: 0.80, recall: 0.82, f1: 0.81, roc: 0.86 },
]

const radarData = [
  { property: 'Voltage', sulfide: 95, oxide: 80, phosphate: 70 },
  { property: 'Conductivity', sulfide: 98, oxide: 20, phosphate: 15 },
  { property: 'Capacity', sulfide: 75, oxide: 90, phosphate: 85 },
  { property: 'Stability', sulfide: 90, oxide: 85, phosphate: 95 },
  { property: 'Cycle Life', sulfide: 95, oxide: 60, phosphate: 70 },
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [voltageFilter, setVoltageFilter] = useState([0, 5])
  const [selectedCompound, setSelectedCompound] = useState(null)
  const [showPrediction, setShowPrediction] = useState(false)
  const [userVoltage, setUserVoltage] = useState(3.5)
  const [userCapacity, setUserCapacity] = useState(250)

  const filteredCompounds = useMemo(() => {
    return compoundsData.filter(compound => 
      compound.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      compound.voltage >= voltageFilter[0] &&
      compound.voltage <= voltageFilter[1]
    )
  }, [searchTerm, voltageFilter])

  const predictedEnergy = useMemo(() => {
    return Math.round(userVoltage * userCapacity * 1.1)
  }, [userVoltage, userCapacity])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <FlaskConical className="w-8 h-8 text-indigo-600" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Li-S Battery Research</h1>
                <p className="text-sm text-slate-600">Data-Driven Materials Discovery</p>
              </div>
            </motion.div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Download className="w-4 h-4" />
                  Download Paper
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Animated Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 shadow-xl overflow-hidden relative">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="text-3xl mb-3 text-white">
                Data-Driven Insights into Titanium-Based Cathode Materials for High-Performance Lithium-Ion Batteries
              </CardTitle>
              <CardDescription className="text-blue-100 text-base">
                Machine learning-guided discovery of TiS₂ as a premier cathode candidate through systematic screening of 165 titanium compounds
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { icon: Award, text: '95% ML Accuracy' },
                  { icon: Database, text: '165 Compounds Screened' },
                  { icon: BarChart3, text: 'Random Forest Model' },
                  { icon: Microscope, text: 'DFT Calculations' },
                ].map((badge, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      <badge.icon className="w-3 h-3 mr-1" />
                      {badge.text}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
              <div className="flex items-center gap-6 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Burhan BEYCAN, H. Emrah UNALAN</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Middle East Technical University</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-auto p-1">
            {[
              { value: 'overview', icon: FileText, label: 'Overview' },
              { value: 'playground', icon: Sparkles, label: 'Playground' },
              { value: 'interactive', icon: Database, label: 'Explorer' },
              { value: 'results', icon: BarChart3, label: 'Results' },
              { value: 'figures', icon: Award, label: 'Figures' },
              { value: 'team', icon: Users, label: 'Team' },
            ].map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Abstract</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed">
                      The quest for high-performance lithium-ion battery (LIB) cathode materials has driven extensive research into transition metal compounds. 
                      This study presents a comprehensive, data-driven investigation into titanium-based cathode materials, leveraging machine learning (ML) 
                      and high-throughput computational screening to identify promising candidates for next-generation energy storage systems.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Key Finding', value: '45%', desc: 'Average voltage accounts for 45% of predictive power' },
                  { title: 'TiS₂ Performance', value: '3074 Wh/kg', desc: 'Gravimetric energy density with exceptional stability' },
                  { title: 'Voltage Advantage', value: '~15%', desc: 'Sulfide cathodes show higher voltage than oxides' },
                ].map((stat, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Card className="cursor-pointer hover:shadow-xl transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <motion.div 
                            className="text-3xl font-bold text-indigo-600 mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.2, type: 'spring' }}
                          >
                            {stat.value}
                          </motion.div>
                          <p className="text-sm text-slate-600">{stat.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Playground Tab - ML Prediction Tool */}
          <TabsContent value="playground" className="space-y-6">
            <Playground />
          </TabsContent>

          {/* Interactive Tab - ENHANCED with 4000+ compounds! */}
          <TabsContent value="interactive" className="space-y-6">
            <EnhancedInteractive />
          </TabsContent>

          {/* Old Interactive Content - Backup */}
          <TabsContent value="interactive-old" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* ML Prediction Tool */}
              <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-indigo-600" />
                    Interactive ML Prediction Tool
                  </CardTitle>
                  <CardDescription>
                    Adjust material properties to predict energy density using our Random Forest model
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="flex items-center justify-between mb-2">
                          <span>Average Voltage (V)</span>
                          <span className="font-bold text-indigo-600">{userVoltage.toFixed(2)} V</span>
                        </Label>
                        <Slider
                          value={[userVoltage]}
                          onValueChange={(v) => setUserVoltage(v[0])}
                          min={1}
                          max={5}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label className="flex items-center justify-between mb-2">
                          <span>Gravimetric Capacity (mAh/g)</span>
                          <span className="font-bold text-indigo-600">{userCapacity} mAh/g</span>
                        </Label>
                        <Slider
                          value={[userCapacity]}
                          onValueChange={(v) => setUserCapacity(v[0])}
                          min={100}
                          max={400}
                          step={10}
                          className="w-full"
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => setShowPrediction(true)}
                        >
                          <Play className="w-4 h-4" />
                          Predict Energy Density
                        </Button>
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {showPrediction && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="bg-white rounded-lg p-6 border-2 border-indigo-300 flex flex-col items-center justify-center"
                        >
                          <div className="text-sm text-slate-600 mb-2">Predicted Energy Density</div>
                          <motion.div
                            className="text-5xl font-bold text-indigo-600 mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            {predictedEnergy}
                          </motion.div>
                          <div className="text-lg text-slate-700">Wh/kg</div>
                          <div className="mt-4 text-sm text-center text-slate-600">
                            <TrendingUp className="w-4 h-4 inline mr-1" />
                            Based on Random Forest model (95% accuracy)
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Compound Explorer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-indigo-600" />
                    Interactive Compound Explorer
                  </CardTitle>
                  <CardDescription>
                    Search and filter titanium compounds by properties
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <Label>Search Compound</Label>
                      <Input
                        placeholder="e.g., TiS₂, TiO₂..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <Label className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Voltage Range: {voltageFilter[0]}V - {voltageFilter[1]}V
                      </Label>
                      <Slider
                        value={voltageFilter}
                        onValueChange={setVoltageFilter}
                        min={0}
                        max={5}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {filteredCompounds.map((compound, i) => (
                        <motion.div
                          key={compound.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          onClick={() => setSelectedCompound(compound)}
                        >
                          <Card className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-indigo-300">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg flex items-center justify-between">
                                {compound.name}
                                <Badge variant="outline">{compound.type}</Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Voltage:</span>
                                <span className="font-semibold">{compound.voltage} V</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Energy:</span>
                                <span className="font-semibold">{compound.energy} Wh/kg</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Cycles:</span>
                                <span className="font-semibold">{compound.cycles.toLocaleString()}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {filteredCompounds.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-slate-500"
                    >
                      No compounds match your filters. Try adjusting the search criteria.
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Interactive Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Material Class Comparison</CardTitle>
                  <CardDescription>Interactive radar chart comparing sulfides, oxides, and phosphates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#cbd5e1" />
                      <PolarAngleAxis dataKey="property" tick={{ fill: '#475569', fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b' }} />
                      <Radar name="Sulfides" dataKey="sulfide" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                      <Radar name="Oxides" dataKey="oxide" stroke="#0891b2" fill="#0891b2" fillOpacity={0.6} />
                      <Radar name="Phosphates" dataKey="phosphate" stroke="#059669" fill="#059669" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Interactive Scatter Plot */}
              <Card>
                <CardHeader>
                  <CardTitle>Voltage vs. Energy Density</CardTitle>
                  <CardDescription>Click on data points to see compound details</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        type="number" 
                        dataKey="voltage" 
                        name="Voltage" 
                        unit="V"
                        tick={{ fill: '#475569' }}
                        label={{ value: 'Average Voltage (V)', position: 'insideBottom', offset: -5, fill: '#475569' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="energy" 
                        name="Energy" 
                        unit="Wh/kg"
                        tick={{ fill: '#475569' }}
                        label={{ value: 'Energy Density (Wh/kg)', angle: -90, position: 'insideLeft', fill: '#475569' }}
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border-2 border-indigo-200 rounded-lg shadow-lg">
                                <p className="font-bold text-indigo-600">{data.name}</p>
                                <p className="text-sm">Voltage: {data.voltage} V</p>
                                <p className="text-sm">Energy: {data.energy} Wh/kg</p>
                                <p className="text-sm">Type: {data.type}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter 
                        name="Compounds" 
                        data={compoundsData} 
                        fill="#4f46e5"
                        onClick={(data) => setSelectedCompound(data)}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Interactive Feature Importance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Importance Analysis</CardTitle>
                  <CardDescription>Hover over bars to see detailed information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={featureImportanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" tick={{ fill: '#475569' }} />
                      <YAxis dataKey="feature" type="category" width={150} tick={{ fill: '#475569', fontSize: 12 }} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border-2 border-indigo-200 rounded-lg shadow-lg">
                                <p className="font-bold">{payload[0].payload.feature}</p>
                                <p className="text-indigo-600 font-semibold">{payload[0].value}% importance</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                        {featureImportanceData.map((entry, index) => (
                          <motion.rect
                            key={`cell-${index}`}
                            fill={entry.color}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Interactive Model Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>ML Model Performance Comparison</CardTitle>
                  <CardDescription>Interactive comparison of classification algorithms</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={modelPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="model" tick={{ fill: '#475569' }} />
                      <YAxis tick={{ fill: '#475569' }} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-4 border-2 border-indigo-200 rounded-lg shadow-lg">
                                <p className="font-bold text-indigo-600 mb-2">{data.model}</p>
                                <p className="text-sm">Accuracy: {data.accuracy}%</p>
                                <p className="text-sm">Precision: {data.precision}</p>
                                <p className="text-sm">Recall: {data.recall}</p>
                                <p className="text-sm">F1-Score: {data.f1}</p>
                                <p className="text-sm">ROC-AUC: {data.roc}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend />
                      <Bar dataKey="accuracy" fill="#4f46e5" name="Accuracy (%)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Figures Tab */}
          <TabsContent value="figures" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { img: figure1, title: 'Figure 1: Feature Correlation', desc: 'Pearson correlation matrix of 11 material properties', detail: 'Strong correlation (r=0.90) between gravimetric energy and average voltage validates the fundamental E=V×Q relationship.' },
                { img: figure2, title: 'Figure 2: Model Performance', desc: 'Comparison of ML classification algorithms', detail: 'Random Forest achieves 95% accuracy and 0.98 ROC-AUC, outperforming other models through ensemble learning.' },
                { img: figure3, title: 'Figure 3: Feature Importance', desc: 'Gini importance scores from Random Forest model', detail: 'Average voltage dominates with 45% importance, followed by gravimetric (18%) and volumetric capacity (15%).' },
                { img: figure4, title: 'Figure 4: Sulfides vs. Oxides', desc: 'Comparative performance metrics', detail: 'Sulfides exhibit ~15% higher voltage due to increased Ti-S bond covalency and lower d-band center.' },
              ].map((fig, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{fig.title}</CardTitle>
                      <CardDescription>{fig.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.img 
                        src={fig.img} 
                        alt={fig.title} 
                        className="w-full rounded-lg border border-slate-200 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                      <p className="text-sm text-slate-600 mt-3">{fig.detail}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Burhan BEYCAN',
                    role: 'Graduate Researcher',
                    desc: 'Graduate student at Middle East Technical University, specializing in computational materials science and machine learning applications for battery materials discovery.',
                    links: [
                      { icon: Mail, label: 'Email', action: () => {} },
                      { icon: ExternalLink, label: 'Profile', action: () => {} },
                    ]
                  },
                  {
                    name: 'Prof. H. Emrah UNALAN',
                    role: 'Principal Investigator',
                    desc: 'Professor at Middle East Technical University, leading research in nanomaterials, energy storage, and 2D materials synthesis. Expert in TiS₂ nanosheets and electrochemical systems.',
                    links: [
                      { icon: ExternalLink, label: 'Google Scholar', action: () => window.open('https://scholar.google.com/citations?user=d02BW-IAAAAJ&hl=en&oi=ao', '_blank') },
                      { icon: ExternalLink, label: 'METU Profile', action: () => window.open('https://mete.metu.edu.tr/people/current-faculty/h-emrah-unalan', '_blank') },
                    ]
                  },
                ].map((person, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <Card className="hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <CardTitle>{person.name}</CardTitle>
                        <CardDescription>{person.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-slate-700">{person.desc}</p>
                        <div className="flex gap-2">
                          {person.links.map((link, j) => (
                            <motion.div key={j} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm" className="gap-2" onClick={link.action}>
                                <link.icon className="w-4 h-4" />
                                {link.label}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Citation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm">
                      <p className="text-slate-700">
                        Beycan, B., & Unalan, H. E. (2025). Data-Driven Insights into Titanium-Based Cathode Materials 
                        and the Strategic Inclusion of TiS₂ for High-Performance Lithium-Ion Batteries. 
                        <em>Journal of Energy Storage</em>.
                      </p>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="sm" className="mt-3 gap-2">
                        <Download className="w-4 h-4" />
                        Download BibTeX
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Animated Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white border-t border-slate-200 mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Research</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Full Manuscript</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Supplementary Materials</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Dataset</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Code Repository</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="https://materialsproject.org" className="hover:text-indigo-600 transition-colors">Materials Project</a></li>
                <li><a href="https://oqmd.org" className="hover:text-indigo-600 transition-colors">OQMD Database</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Related Publications</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Institution</h3>
              <p className="text-sm text-slate-600 mb-2">
                Middle East Technical University<br />
                Department of Metallurgical and Materials Engineering
              </p>
              <p className="text-sm text-slate-600">Ankara, Turkey</p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-slate-600">
            <p>© 2025 Burhan Beycan & H. Emrah Unalan. Licensed under MIT.</p>
            <p className="mt-1">Built with React, Vite, Tailwind CSS, and Recharts</p>
          </div>
        </div>
      </motion.footer>

      {/* Selected Compound Modal */}
      <AnimatePresence>
        {selectedCompound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCompound(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">{selectedCompound.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Type:</span>
                  <Badge>{selectedCompound.type}</Badge>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">Average Voltage:</span>
                  <span className="font-semibold">{selectedCompound.voltage} V</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">Capacity:</span>
                  <span className="font-semibold">{selectedCompound.capacity} mAh/g</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">Energy Density:</span>
                  <span className="font-semibold">{selectedCompound.energy} Wh/kg</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">Conductivity:</span>
                  <span className="font-semibold">{selectedCompound.conductivity} mS/cm</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">Cycle Life:</span>
                  <span className="font-semibold">{selectedCompound.cycles.toLocaleString()} cycles</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setSelectedCompound(null)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
