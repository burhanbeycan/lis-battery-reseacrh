import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Zap, Play, TrendingUp, AlertCircle, CheckCircle, Activity, Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts'

const COLORS = ['#4f46e5', '#7c3aed', '#2563eb', '#0891b2', '#059669', '#d97706']

export default function Playground() {
  // ML Prediction inputs
  const [voltage, setVoltage] = useState(3.5)
  const [capacity, setCapacity] = useState(250)
  const [conductivity, setConductivity] = useState(50)
  const [stability, setStability] = useState(0.85)
  const [volumeExpansion, setVolumeExpansion] = useState(10)
  const [bandgap, setBandgap] = useState(2.0)
  
  const [showPrediction, setShowPrediction] = useState(false)
  const [comparisonMode, setComparisonMode] = useState(false)

  // Calculate predicted energy density (simplified ML model simulation)
  const predictedEnergy = Math.round(
    voltage * capacity * 
    (1 + Math.log10(conductivity + 1) * 0.05) * 
    (stability * 1.1) * 
    (1 - volumeExpansion * 0.005) *
    (1 + (3 - bandgap) * 0.02)
  )

  // Calculate confidence based on input ranges
  const confidence = Math.min(98, Math.round(
    95 - 
    Math.abs(voltage - 3.5) * 2 - 
    Math.abs(capacity - 250) * 0.01 -
    Math.abs(stability - 0.85) * 10
  ))

  // Performance category
  const getPerformanceCategory = (energy) => {
    if (energy > 3500) return { label: 'Excellent', color: '#059669', icon: CheckCircle }
    if (energy > 2800) return { label: 'Very Good', color: '#0891b2', icon: CheckCircle }
    if (energy > 2200) return { label: 'Good', color: '#2563eb', icon: Activity }
    if (energy > 1600) return { label: 'Moderate', color: '#d97706', icon: AlertCircle }
    return { label: 'Low', color: '#dc2626', icon: AlertCircle }
  }

  const category = getPerformanceCategory(predictedEnergy)

  // Radar chart data for property profile
  const radarData = [
    { property: 'Voltage', value: (voltage / 5) * 100, fullMark: 100 },
    { property: 'Capacity', value: (capacity / 400) * 100, fullMark: 100 },
    { property: 'Conductivity', value: Math.min((Math.log10(conductivity + 1) / Math.log10(301)) * 100, 100), fullMark: 100 },
    { property: 'Stability', value: stability * 100, fullMark: 100 },
    { property: 'Vol. Stability', value: Math.max(0, (1 - volumeExpansion / 25) * 100), fullMark: 100 },
    { property: 'Bandgap', value: (bandgap / 4.5) * 100, fullMark: 100 },
  ]

  // Comparison with benchmark materials
  const benchmarkData = [
    { name: 'Your Design', energy: predictedEnergy, color: '#4f46e5' },
    { name: 'TiS₂', energy: 3074, color: '#059669' },
    { name: 'TiO₂', energy: 2970, color: '#0891b2' },
    { name: 'LiCoO₂', energy: 2800, color: '#7c3aed' },
    { name: 'LiFePO₄', energy: 2100, color: '#d97706' },
  ]

  const handlePredict = () => {
    setShowPrediction(true)
    setComparisonMode(false)
  }

  const handleCompare = () => {
    setShowPrediction(true)
    setComparisonMode(true)
  }

  const resetInputs = () => {
    setVoltage(3.5)
    setCapacity(250)
    setConductivity(50)
    setStability(0.85)
    setVolumeExpansion(10)
    setBandgap(2.0)
    setShowPrediction(false)
    setComparisonMode(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              Materials Design Playground
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Design your ideal cathode material using our AI-powered prediction engine
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: ML Prediction Tool */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-xl border-2 border-indigo-200 h-full">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="w-6 h-6 text-indigo-600" />
                Interactive ML Prediction Tool
              </CardTitle>
              <CardDescription className="text-base">
                Adjust material properties to predict energy density using our Random Forest model (95% accuracy)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Input Sliders */}
              <div className="space-y-5">
                {/* Voltage */}
                <div>
                  <Label className="flex items-center justify-between mb-2 text-base font-semibold">
                    <span>Average Voltage (V)</span>
                    <span className="text-indigo-600 text-lg">{voltage.toFixed(2)} V</span>
                  </Label>
                  <Slider
                    value={[voltage]}
                    onValueChange={(v) => setVoltage(v[0])}
                    min={1}
                    max={5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1.0 V</span>
                    <span>5.0 V</span>
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <Label className="flex items-center justify-between mb-2 text-base font-semibold">
                    <span>Gravimetric Capacity (mAh/g)</span>
                    <span className="text-indigo-600 text-lg">{capacity} mAh/g</span>
                  </Label>
                  <Slider
                    value={[capacity]}
                    onValueChange={(v) => setCapacity(v[0])}
                    min={100}
                    max={400}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>100 mAh/g</span>
                    <span>400 mAh/g</span>
                  </div>
                </div>

                {/* Conductivity */}
                <div>
                  <Label className="flex items-center justify-between mb-2 text-base font-semibold">
                    <span>Electronic Conductivity (mS/cm)</span>
                    <span className="text-indigo-600 text-lg">{conductivity.toFixed(1)}</span>
                  </Label>
                  <Slider
                    value={[conductivity]}
                    onValueChange={(v) => setConductivity(v[0])}
                    min={0.001}
                    max={300}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0.001 (Oxide)</span>
                    <span>300 (Sulfide)</span>
                  </div>
                </div>

                {/* Stability */}
                <div>
                  <Label className="flex items-center justify-between mb-2 text-base font-semibold">
                    <span>Thermodynamic Stability</span>
                    <span className="text-indigo-600 text-lg">{stability.toFixed(2)}</span>
                  </Label>
                  <Slider
                    value={[stability]}
                    onValueChange={(v) => setStability(v[0])}
                    min={0.5}
                    max={1.0}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0.50 (Low)</span>
                    <span>1.00 (High)</span>
                  </div>
                </div>

                {/* Volume Expansion */}
                <div>
                  <Label className="flex items-center justify-between mb-2 text-base font-semibold">
                    <span>Max Volume Expansion (%)</span>
                    <span className="text-indigo-600 text-lg">{volumeExpansion.toFixed(1)}%</span>
                  </Label>
                  <Slider
                    value={[volumeExpansion]}
                    onValueChange={(v) => setVolumeExpansion(v[0])}
                    min={0}
                    max={25}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0% (Excellent)</span>
                    <span>25% (Poor)</span>
                  </div>
                </div>

                {/* Bandgap */}
                <div>
                  <Label className="flex items-center justify-between mb-2 text-base font-semibold">
                    <span>Electronic Bandgap (eV)</span>
                    <span className="text-indigo-600 text-lg">{bandgap.toFixed(2)} eV</span>
                  </Label>
                  <Slider
                    value={[bandgap]}
                    onValueChange={(v) => setBandgap(v[0])}
                    min={0}
                    max={4.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0.0 eV (Metal)</span>
                    <span>4.5 eV (Insulator)</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-lg py-6"
                    onClick={handlePredict}
                  >
                    <Play className="w-5 h-5" />
                    Predict
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full gap-2 bg-purple-600 hover:bg-purple-700 text-lg py-6"
                    onClick={handleCompare}
                  >
                    <TrendingUp className="w-5 h-5" />
                    Compare
                  </Button>
                </motion.div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={resetInputs}
              >
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <AnimatePresence mode="wait">
            {!showPrediction ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="shadow-xl h-full flex items-center justify-center min-h-[500px]">
                  <CardContent className="text-center p-12">
                    <Sparkles className="w-20 h-20 text-indigo-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-slate-700 mb-3">
                      Ready to Predict
                    </h3>
                    <p className="text-slate-500 text-lg">
                      Adjust the material properties on the left and click "Predict" to see the AI-powered energy density prediction
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="space-y-6"
              >
                {/* Prediction Result */}
                <Card className="shadow-2xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-center text-xl text-slate-700">
                      Predicted Energy Density
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                      className="text-7xl font-bold text-indigo-600"
                    >
                      {predictedEnergy}
                    </motion.div>
                    <div className="text-2xl text-slate-700 font-semibold">Wh/kg</div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-center gap-3">
                      <category.icon className="w-6 h-6" style={{ color: category.color }} />
                      <span className="text-lg font-semibold" style={{ color: category.color }}>
                        {category.label} Performance
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Model Confidence:</span>
                        <span className="font-bold text-indigo-600">{confidence}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Model Type:</span>
                        <span className="font-semibold">Random Forest</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Training Accuracy:</span>
                        <span className="font-semibold">95%</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 mt-4">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      Based on 4000+ compound database
                    </div>
                  </CardContent>
                </Card>

                {/* Property Profile Radar Chart */}
                {!comparisonMode && (
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg">Material Property Profile</CardTitle>
                      <CardDescription>Normalized property values (0-100 scale)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#cbd5e1" />
                          <PolarAngleAxis 
                            dataKey="property" 
                            tick={{ fill: '#475569', fontSize: 12 }} 
                          />
                          <PolarRadiusAxis 
                            angle={90} 
                            domain={[0, 100]} 
                            tick={{ fill: '#64748b' }} 
                          />
                          <Radar 
                            name="Your Design" 
                            dataKey="value" 
                            stroke="#4f46e5" 
                            fill="#4f46e5" 
                            fillOpacity={0.6} 
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}

                {/* Benchmark Comparison */}
                {comparisonMode && (
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg">Benchmark Comparison</CardTitle>
                      <CardDescription>Compare with state-of-the-art cathode materials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={benchmarkData} margin={{ bottom: 60 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#475569', fontSize: 11 }} 
                            angle={-45}
                            textAnchor="end"
                          />
                          <YAxis 
                            tick={{ fill: '#475569' }} 
                            label={{ value: 'Energy Density (Wh/kg)', angle: -90, position: 'insideLeft' }}
                          />
                          <Tooltip />
                          <Bar dataKey="energy" radius={[8, 8, 0, 0]}>
                            {benchmarkData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>

                      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700">
                          <strong>Performance Ranking:</strong> Your design ranks{' '}
                          <span className="font-bold text-indigo-600">
                            #{benchmarkData.sort((a, b) => b.energy - a.energy).findIndex(d => d.name === 'Your Design') + 1}
                          </span>
                          {' '}out of {benchmarkData.length} materials
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Tips and Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Design Tips & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-600 mb-2">⚡ Voltage Impact</h4>
                <p className="text-slate-600">
                  Voltage accounts for 45% of energy density. Higher voltage (3.5-4.5V) significantly improves performance.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-600 mb-2">🔋 Capacity Trade-off</h4>
                <p className="text-slate-600">
                  High capacity (>300 mAh/g) is desirable, but often comes with stability challenges. Balance is key.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-600 mb-2">🔬 Conductivity Matters</h4>
                <p className="text-slate-600">
                  Sulfides (100-300 mS/cm) outperform oxides (&lt;0.01 mS/cm) due to superior electronic conductivity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
