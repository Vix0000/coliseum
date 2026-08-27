import { ProcessStep } from '../types';
import { IMAGES } from './images';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Plan & Grade',
    subtitle: 'Elevation Engineering & Water Runoff Design',
    timeline: 'Step 1 of 5',
    description: 'Every enduring concrete and hardscape project starts with proper surveying. We analyze your lot topography, calculate water runoff away from foundation walls, and establish laser elevation benchmarks to ensure water never ponds near your home.',
    technicalHighlights: [
      'Digital laser transit surveying for minimum 1.5% positive slope',
      'Underground utility locates (Ontario One Call) before digging',
      'Subsoil assessment (identifying Ottawa clay vs. sandy loam conditions)',
      'Custom formwork blueprint mapping curves, step landings, and joints'
    ],
    image: IMAGES.planBlueprints
  },
  {
    number: '02',
    title: 'Excavate & Base',
    subtitle: 'The Invisible Foundation That Prevents Frost Heave',
    timeline: 'Step 2 of 5',
    description: 'Good concrete isn\'t just what you see on the surface. Ottawa\'s severe freeze-thaw cycles and expansive Leda clay destroy shallow slabs. We excavate 8 to 14 inches deep, line the subgrade with heavy structural geotextile, and compact crushed limestone in 3-inch lifts.',
    technicalHighlights: [
      'Excavation to virgin, undisturbed native subgrade',
      'Non-woven needle-punched geotextile stabilization membrane',
      'Granular A crushed limestone aggregate base compacted with reversible plate compactors',
      'Moisture-controlled density to prevent post-construction settling'
    ],
    image: IMAGES.excavate
  },
  {
    number: '03',
    title: 'Reinforce & Form',
    subtitle: 'Heavy-Gauge Steel Rebar Grid & Precision Formwork',
    timeline: 'Step 3 of 5',
    description: 'We construct rigid architectural forms with clean radii or crisp corners. Inside, we install 10M / 15M steel rebar grid elevated on specialized chairs so the steel sits exactly in the middle third of the slab, providing maximum tensile strength.',
    technicalHighlights: [
      'Heavy 2x lumber and flexible composite forms pinned securely',
      '10M grade-400 steel rebar tied on 12" to 16" square grid centers',
      'Reinforcement supported on concrete chairs (never lying on the ground)',
      'Isolation joints and foundation foam barriers to allow thermal expansion'
    ],
    image: IMAGES.rebarSlab
  },
  {
    number: '04',
    title: 'Pour & Stamp',
    subtitle: 'Air-Entrained Concrete Placement & Texture Imprinting',
    timeline: 'Step 4 of 5',
    description: 'We order 32+ MPa Class C-2 air-entrained concrete mixed with integral mineral colors. After screeding and bull-floating, we apply contrasting antique release agents and hand-stamp each section using interlocking architectural texture mats before the concrete hardens.',
    technicalHighlights: [
      '32–35 MPa certified ready-mix concrete with 6–8% air entrainment',
      'Uniform integral oxide pigment throughout entire concrete depth',
      'Dry-shake color hardeners and hydrophobic antique release powders',
      'Continuous quality inspection of stamp alignment and texture depth'
    ],
    image: IMAGES.pourConcrete
  },
  {
    number: '05',
    title: 'Cut, Seal & Protect',
    subtitle: 'Stress-Relief Control Joints & Breathable Acrylic Sealer',
    timeline: 'Step 5 of 5',
    description: 'Within 24 hours, we diamond saw-cut stress relief joints at calculated intervals to control natural curing contraction. After pressure washing the excess release powder, we apply two coats of high-solids solvent acrylic sealer with anti-slip micro-particles.',
    technicalHighlights: [
      'Early-entry diamond blade saw-cut control joints at 1/4 slab thickness',
      'Pressure washing and acid etching to expose the subtle secondary color tones',
      'Two coats of UV-resistant, breathable high-solids acrylic sealer',
      'Micro-grip polymer traction additive blended into the final seal'
    ],
    image: IMAGES.finishedDriveway
  }
];
