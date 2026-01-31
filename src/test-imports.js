// Test file to verify all Phase 2 components can be imported
import Button from './components/ui/Button'
import GlassCard from './components/ui/GlassCard'
import Toggle from './components/ui/Toggle'
import Gauge from './components/ui/Gauge'
import TypewriterText from './components/effects/TypewriterText'
import FireParticles from './components/effects/FireParticles'
import * as animations from './utils/animations'

console.log('✅ All Phase 2 components imported successfully!')
console.log('Components:', { Button, GlassCard, Toggle, Gauge, TypewriterText, FireParticles })
console.log('Animations:', animations)

export default function TestImports() {
  return null
}
