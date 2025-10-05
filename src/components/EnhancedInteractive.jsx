import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Search, Filter, Download, Database, BarChart3, TrendingUp, Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell, ComposedChart, Area, Line
} from 'recharts'

const COLORS = ['#4f46e5', '#7c3aed', '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626', '#ec4899']

export default function EnhancedInteractive() {
  const [compounds, setCompounds] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [voltageRange, setVoltageRange] = useState([0, 5])
  const [energyRange, setEnergyRange] = useState([0, 5000])
  const [selectedCompound, setSelectedCompound] = useState(null)
  const [xAxis, setXAxis] = useState('voltage')
  const [yAxis, setYAxis] = useState('energy_gravimetric')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Load data
  useEffect(() => {
    fetch('/compounds_data.json')
      .then(res => res.json())
      .then(data => {
        setCompounds(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [])

  // Filter compounds
  const filteredCompounds = useMemo(() => {
    return compounds.filter(compound => {
      const matchesSearch = compound.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           compound.base_formula.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || compound.type === selectedType
      const matchesVoltage = compound.voltage >= voltageRange[0] && compound.voltage <= voltageRange[1]
      const matchesEnergy = compound.energy_gravimetric >= energyRange[0] && compound.energy_gravimetric <= energyRange[1]
      
      return matchesSearch && matchesType && matchesVoltage && matchesEnergy
    })
  }, [compounds, searchTerm, selectedType, voltageRange, energyRange])

  // Pagination
  const paginatedCompounds = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredCompounds.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredCompounds, currentPage])

  const totalPages = Math.ceil(filteredCompounds.length / itemsPerPage)

  // Statistics
  const stats = useMemo(() => {
    if (filteredCompounds.length === 0) return null
    
    return {
      count: filteredCompounds.length,
      avgVoltage: (filteredCompounds.reduce((sum, c) => sum + c.voltage, 0) / filteredCompounds.length).toFixed(2),
      avgEnergy: (filteredCompounds.reduce((sum, c) => sum + c.energy_gravimetric, 0) / filteredCompounds.length).toFixed(0),
      maxCycles: Math.max(...filteredCompounds.map(c => c.cycle_life)),
      avgConductivity: (filteredCompounds.reduce((sum, c) => sum + c.conductivity, 0) / filteredCompounds.length).toFixed(2),
    }
  }, [filteredCompounds])

  // Distribution data
  const distributionData = useMemo(() => {
    const bins = 15
    const voltageHist = Array(bins).fill(0)
    const energyHist = Array(bins).fill(0)
    
    filteredCompounds.forEach(c => {
      const vBin = Math.min(Math.floor((c.voltage / 5) * bins), bins - 1)
      const eBin = Math.min(Math.floor((c.energy_gravimetric / 5000) * bins), bins - 1)
      voltageHist[vBin]++
      energyHist[eBin]++
    })
    
    return {
      voltage: voltageHist.map((count, i) => ({
        range: `${(i * 5 / bins).toFixed(1)}`,
        count
      })),
      energy: energyHist.map((count, i) => ({
        range: `${(i * 5000 / bins).toFixed(0)}`,
        count
      }))
    }
  }, [filteredCompounds])

  // Type distribution
  const typeDistribution = useMemo(() => {
    const dist = {}
    filteredCompounds.forEach(c => {
      dist[c.type] = (dist[c.type] || 0) + 1
    })
    return Object.entries(dist).map(([type, count]) => ({ type, count }))
  }, [filteredCompounds])

  // Property comparison by type
  const typeComparison = useMemo(() => {
    const types = ['Sulfide', 'Oxide', 'Phosphate', 'Selenide', 'Nitride', 'Fluoride', 'Chloride', 'Silicate']
    return types.map(type => {
      const typeCompounds = filteredCompounds.filter(c => c.type === type)
      if (typeCompounds.length === 0) return null
      
      return {
        type,
        avgVoltage: (typeCompounds.reduce((sum, c) => sum + c.voltage, 0) / typeCompounds.length).toFixed(2),
        avgEnergy: (typeCompounds.reduce((sum, c) => sum + c.energy_gravimetric, 0) / typeCompounds.length).toFixed(0),
        avgConductivity: (typeCompounds.reduce((sum, c) => sum + c.conductivity, 0) / typeCompounds.length).toFixed(2),
        count: typeCompounds.length
      }
    }).filter(Boolean)
  }, [filteredCompounds])

  // Export data
  const exportData = () => {
    const csv = [
      Object.keys(filteredCompounds[0]).join(','),
      ...filteredCompounds.map(c => Object.values(c).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `filtered_compounds_${filteredCompounds.length}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-700 font-semibold">Loading 4000+ compounds...</p>
          <p className="text-sm text-slate-500 mt-2">Please wait while we load the database</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Database className="w-7 h-7" />
              Advanced Materials Database Explorer
            </CardTitle>
            <CardDescription className="text-blue-100 text-base">
              Explore {compounds.length}+ titanium compounds with 25+ descriptors | Currently showing: {filteredCompounds.length} compounds
            </CardDescription>
          </CardHeader>
          {stats && (
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: 'Compounds', value: stats.count, icon: Database },
                  { label: 'Avg Voltage', value: `${stats.avgVoltage} V`, icon: Zap },
                  { label: 'Avg Energy', value: `${stats.avgEnergy} Wh/kg`, icon: TrendingUp },
                  { label: 'Max Cycles', value: `${(stats.maxCycles / 1000).toFixed(0)}k`, icon: BarChart3 },
                  { label: 'Avg Conductivity', value: stats.avgConductivity, icon: TrendingUp },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all"
                  >
                    <stat.icon className="w-5 h-5 mb-2 opacity-90" />
                    <div className="text-xs opacity-90 mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-indigo-600" />
              Advanced Filters
            </CardTitle>
            <CardDescription>Filter and search through the compound database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">Search Formula</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="e.g., TiS2, Li0.5TiO2..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-semibold mb-2 block">Compound Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types ({compounds.length})</SelectItem>
                    <SelectItem value="Sulfide">Sulfide</SelectItem>
                    <SelectItem value="Oxide">Oxide</SelectItem>
                    <SelectItem value="Phosphate">Phosphate</SelectItem>
                    <SelectItem value="Selenide">Selenide</SelectItem>
                    <SelectItem value="Nitride">Nitride</SelectItem>
                    <SelectItem value="Fluoride">Fluoride</SelectItem>
                    <SelectItem value="Chloride">Chloride</SelectItem>
                    <SelectItem value="Silicate">Silicate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Voltage: {voltageRange[0].toFixed(1)}V - {voltageRange[1].toFixed(1)}V
                </Label>
                <Slider
                  value={voltageRange}
                  onValueChange={setVoltageRange}
                  min={0}
                  max={5}
                  step={0.1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Energy: {energyRange[0]} - {energyRange[1]} Wh/kg
                </Label>
                <Slider
                  value={energyRange}
                  onValueChange={setEnergyRange}
                  min={0}
                  max={5000}
                  step={100}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedType('all')
                  setVoltageRange([0, 5])
                  setEnergyRange([0, 5000])
                  setCurrentPage(1)
                }}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Reset All Filters
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={exportData}
                disabled={filteredCompounds.length === 0}
                className="gap-2 bg-indigo-600 hover:bg-indigo-700"
              >
                <Download className="w-4 h-4" />
                Export CSV ({filteredCompounds.length} compounds)
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Visualization Tabs */}
      <Tabs defaultValue="scatter" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="scatter" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Scatter Plot
          </TabsTrigger>
          <TabsTrigger value="distribution" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="comparison" className="gap-2">
            <Database className="w-4 h-4" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="table" className="gap-2">
            <Filter className="w-4 h-4" />
            Data Table
          </TabsTrigger>
        </TabsList>

        {/* Scatter Plot */}
        <TabsContent value="scatter" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Interactive Scatter Plot</CardTitle>
              <CardDescription>
                Customize axes and click on points for details | Showing {filteredCompounds.length} compounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">X-Axis Property</Label>
                    <Select value={xAxis} onValueChange={setXAxis}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="voltage">Voltage (V)</SelectItem>
                        <SelectItem value="capacity">Capacity (mAh/g)</SelectItem>
                        <SelectItem value="conductivity">Conductivity (mS/cm)</SelectItem>
                        <SelectItem value="stability">Stability</SelectItem>
                        <SelectItem value="volume_expansion">Volume Expansion (%)</SelectItem>
                        <SelectItem value="bandgap">Bandgap (eV)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Y-Axis Property</Label>
                    <Select value={yAxis} onValueChange={setYAxis}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="energy_gravimetric">Energy Density (Wh/kg)</SelectItem>
                        <SelectItem value="energy_volumetric">Volumetric Energy</SelectItem>
                        <SelectItem value="cycle_life">Cycle Life</SelectItem>
                        <SelectItem value="rate_capability">Rate Capability (%)</SelectItem>
                        <SelectItem value="coulombic_efficiency">Coulombic Efficiency (%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={500}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      type="number" 
                      dataKey={xAxis}
                      name={xAxis}
                      tick={{ fill: '#475569', fontSize: 12 }}
                      label={{ 
                        value: xAxis.replace('_', ' ').toUpperCase(), 
                        position: 'insideBottom', 
                        offset: -10, 
                        fill: '#1e293b',
                        fontSize: 14,
                        fontWeight: 600
                      }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey={yAxis}
                      name={yAxis}
                      tick={{ fill: '#475569', fontSize: 12 }}
                      label={{ 
                        value: yAxis.replace('_', ' ').toUpperCase(), 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#1e293b',
                        fontSize: 14,
                        fontWeight: 600
                      }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-4 border-2 border-indigo-300 rounded-lg shadow-xl">
                              <p className="font-bold text-indigo-600 text-lg mb-2">{data.formula}</p>
                              <div className="space-y-1 text-sm">
                                <p><span className="font-semibold">Type:</span> {data.type}</p>
                                <p><span className="font-semibold">{xAxis}:</span> {data[xAxis]?.toFixed(2)}</p>
                                <p><span className="font-semibold">{yAxis}:</span> {data[yAxis]?.toFixed(2)}</p>
                                <p className="text-xs text-slate-500 mt-2">Click for full details</p>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                    {['Sulfide', 'Oxide', 'Phosphate', 'Selenide', 'Nitride', 'Fluoride', 'Chloride', 'Silicate'].map((type, i) => {
                      const typeData = filteredCompounds.filter(c => c.type === type)
                      if (typeData.length === 0) return null
                      return (
                        <Scatter
                          key={type}
                          name={`${type} (${typeData.length})`}
                          data={typeData}
                          fill={COLORS[i]}
                          onClick={(data) => setSelectedCompound(data)}
                          cursor="pointer"
                        />
                      )
                    })}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution */}
        <TabsContent value="distribution" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Voltage Distribution</CardTitle>
                <CardDescription>Frequency distribution across voltage range</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={distributionData.voltage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="range" 
                      tick={{ fill: '#475569', fontSize: 11 }} 
                      label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis tick={{ fill: '#475569' }} label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Energy Density Distribution</CardTitle>
                <CardDescription>Frequency distribution across energy range</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={distributionData.energy}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="range" 
                      tick={{ fill: '#475569', fontSize: 11 }} 
                      label={{ value: 'Energy (Wh/kg)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis tick={{ fill: '#475569' }} label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Type Distribution</CardTitle>
                <CardDescription>Number of compounds per material type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={typeDistribution} layout="vertical" margin={{ left: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fill: '#475569' }} />
                    <YAxis dataKey="type" type="category" width={100} tick={{ fill: '#475569', fontSize: 13 }} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comparison */}
        <TabsContent value="comparison" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Type-wise Performance Comparison</CardTitle>
              <CardDescription>Average properties across different material types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={typeComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="type" tick={{ fill: '#475569', fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fill: '#475569' }} label={{ value: 'Voltage (V)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#475569' }} label={{ value: 'Energy (Wh/kg)', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="avgVoltage" fill="#4f46e5" name="Avg Voltage (V)" radius={[8, 8, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="avgEnergy" stroke="#dc2626" strokeWidth={3} name="Avg Energy (Wh/kg)" />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-indigo-50">
                        <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Type</th>
                        <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Count</th>
                        <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Avg Voltage (V)</th>
                        <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Avg Energy (Wh/kg)</th>
                        <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Avg Conductivity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {typeComparison.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="border border-slate-300 px-4 py-2">
                            <Badge style={{ backgroundColor: COLORS[i] }}>{row.type}</Badge>
                          </td>
                          <td className="border border-slate-300 px-4 py-2 text-right font-semibold">{row.count}</td>
                          <td className="border border-slate-300 px-4 py-2 text-right">{row.avgVoltage}</td>
                          <td className="border border-slate-300 px-4 py-2 text-right">{row.avgEnergy}</td>
                          <td className="border border-slate-300 px-4 py-2 text-right">{row.avgConductivity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Table */}
        <TabsContent value="table" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Compound Data Table</CardTitle>
              <CardDescription>
                Showing {paginatedCompounds.length} of {filteredCompounds.length} compounds (Page {currentPage} of {totalPages})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-50">
                      <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Formula</th>
                      <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Type</th>
                      <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Voltage (V)</th>
                      <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Energy (Wh/kg)</th>
                      <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Conductivity</th>
                      <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Cycles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {paginatedCompounds.map((compound, i) => (
                        <motion.tr
                          key={compound.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className="hover:bg-indigo-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedCompound(compound)}
                        >
                          <td className="border border-slate-300 px-4 py-3 font-mono text-sm font-semibold text-indigo-600">
                            {compound.formula}
                          </td>
                          <td className="border border-slate-300 px-4 py-3">
                            <Badge variant="outline">{compound.type}</Badge>
                          </td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{compound.voltage.toFixed(2)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{compound.energy_gravimetric.toFixed(0)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{compound.conductivity.toFixed(3)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{compound.cycle_life.toLocaleString()}</td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-slate-600 font-semibold">
                  Page {currentPage} of {totalPages} | Total: {filteredCompounds.length} compounds
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Compound Modal */}
      <AnimatePresence>
        {selectedCompound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCompound(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-indigo-600">{selectedCompound.formula}</h3>
                <Badge className="text-base px-3 py-1">{selectedCompound.type}</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-slate-700 border-b pb-2">Basic Properties</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        ['Space Group', selectedCompound.space_group],
                        ['Crystal System', selectedCompound.crystal_system],
                        ['Li Content', selectedCompound.li_content.toFixed(2)],
                        ['Ti Content', (selectedCompound.ti_content * 100).toFixed(1) + '%']
                      ].map(([label, value], i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">{label}:</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-slate-700 border-b pb-2">Structural</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        ['Volume Expansion', selectedCompound.volume_expansion.toFixed(2) + '%'],
                        ['Density', selectedCompound.density.toFixed(2) + ' g/cm³'],
                        ['Bandgap', selectedCompound.bandgap.toFixed(3) + ' eV'],
                        ['Elastic Modulus', selectedCompound.elastic_modulus.toFixed(1) + ' GPa']
                      ].map(([label, value], i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">{label}:</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-slate-700 border-b pb-2">Electrochemical</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        ['Voltage', selectedCompound.voltage.toFixed(2) + ' V'],
                        ['Capacity', selectedCompound.capacity.toFixed(1) + ' mAh/g'],
                        ['Energy (Grav.)', selectedCompound.energy_gravimetric.toFixed(0) + ' Wh/kg'],
                        ['Energy (Vol.)', selectedCompound.energy_volumetric.toFixed(0) + ' Wh/L'],
                        ['Conductivity', selectedCompound.conductivity.toFixed(3) + ' mS/cm'],
                        ['Overpotential', selectedCompound.overpotential.toFixed(3) + ' V']
                      ].map(([label, value], i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">{label}:</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-slate-700 border-b pb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        ['Cycle Life', selectedCompound.cycle_life.toLocaleString() + ' cycles'],
                        ['Rate Capability', selectedCompound.rate_capability.toFixed(1) + '%'],
                        ['Coulombic Eff.', selectedCompound.coulombic_efficiency.toFixed(2) + '%'],
                        ['Stability', selectedCompound.stability.toFixed(3)]
                      ].map(([label, value], i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">{label}:</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-lg py-6"
                onClick={() => setSelectedCompound(null)}
              >
                Close Details
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
