import { ProjectItem } from '../types';
import { IMAGES } from './images';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'project-kanata-ashlar-patio',
    title: 'Ashlar Stamped Walkway & Rebuilt Front Entry Stairs',
    slug: 'kanata-ashlar-slate-patio',
    category: 'stamped-concrete',
    serviceType: 'Stamped Concrete Walkway',
    location: 'Kanata Lakes, Ottawa',
    year: '2024',
    heroImage: IMAGES.projectEntryAfter,
    images: [
      {
        url: IMAGES.projectEntryAfter,
        alt: 'Random-ashlar stamped walkway and stone-faced entry stairs in Kanata',
        caption: 'Random ashlar stamp with rock-faced treads and fieldstone risers matched to the house stone',
        tag: 'Completed Entry'
      },
      {
        url: IMAGES.projectEntryBefore,
        alt: 'Weathered grey concrete steps and landing before rebuild',
        caption: 'Original two-step grey landing with water staining, to be demolished and rebuilt',
        tag: 'Existing Condition'
      }
    ],
    beforeAfter: {
      beforeUrl: IMAGES.projectEntryBefore,
      beforeLabel: 'Original: Weathered Grey Steps & Landing',
      afterUrl: IMAGES.projectEntryAfter,
      afterLabel: 'Completed: Stamped Ashlar Walkway & Stone-Faced Stairs',
      description: 'Rebuilt unsound entry steps and poured a random-ashlar stamped walkway with fieldstone risers, pitched to drain away from the threshold.'
    },
    shortDescription: 'Front-entry rebuild: weathered grey landing replaced with a random-ashlar stamped walkway, rock-faced treads, and fieldstone risers.',
    fullDescription: 'The existing two-step grey landing was unsound and pitched poorly at the threshold. We rebuilt the entry on the same house — same black door, tan siding, and fieldstone wall — with a random-ashlar stamped walkway, rock-faced treads, and fieldstone risers laser-pitched to shed water away from the door.',
    scope: [
      'Demolish unsound two-step landing and regrade the walkway',
      'Rebuild entry stairs to new critical heights at the threshold',
      '3/4" clean stone base with #3 rebar and fiber reinforcement',
      'Random ashlar stamp with deep joints and antique release',
      'Fieldstone veneer on risers matched to the existing house stone',
      'Two coats of sealer pitched to drain away from the door'
    ],
    specs: {
      material: '32 MPa Class C-2 Air-Entrained Concrete (6-8% air)',
      patternOrStyle: 'Random ashlar stamp with rock-faced treads',
      colorOrFinish: 'Slate integral color with autumn-brown / peppercorn stains',
      subBase: '3/4" clean stone base with geotextile separation'
    }
  },
  {
    id: 'project-westboro-driveway-apron',
    title: 'Architectural Broom Concrete Driveway with Stamped Borders',
    slug: 'westboro-broom-stamped-border-driveway',
    category: 'driveways',
    serviceType: 'Concrete Driveway',
    location: 'Westboro, Ottawa',
    year: '2024',
    heroImage: IMAGES.concreteDriveway,
    images: [
      {
        url: IMAGES.concreteDriveway,
        alt: 'Modern residential concrete driveway with stamped border ribbons in Westboro',
        caption: 'Crisp medium-broom finish main driveway field framed with 18-inch Italian slate stamped ribbons',
        tag: 'Street Elevation'
      },
      {
        url: IMAGES.finishedDriveway,
        alt: 'Driveway entrance and curb transition detail',
        caption: 'Reinforced 6-inch concrete curb apron with smooth-trowel chamfered edges',
        tag: 'Curb Transition'
      }
    ],
    shortDescription: 'Two-car residential driveway combining clean architectural broom texture for maximum winter vehicle traction with stamped contrasting perimeter borders.',
    fullDescription: 'Urban infill residence in Westboro requiring a modern, clean driveway approach that complements the contemporary architectural facade. Poured with full-depth 5-inch thickness (6 inches at apron) and heavy gauge reinforcement to resist vehicle point-loads and heavy Ottawa salt intrusion.',
    scope: [
      'Removal and recycling of 1,200 sq.ft. failed asphalt and organic subsoil',
      'Excavation down to stable subgrade and compaction',
      'Installation of engineered geotextile fabric and 12" Granular A base',
      'Formwork with radius flare at street entrance',
      'Precision jointing cuts matched to facade window mullions',
      'Penetrating silane-siloxane sealer for extreme freeze-thaw protection'
    ],
    specs: {
      material: '35 MPa High-Performance Air-Entrained Exterior Concrete',
      patternOrStyle: 'Directional Medium Broom field with Roman Slate Stamp borders',
      colorOrFinish: 'Natural Cement Gray with Dark Charcoal Border Dye',
      subBase: '12" heavy compacted crushed aggregate'
    }
  },
  {
    id: 'project-barrhaven-interlock-patio',
    title: 'High-Format Interlock Patio & Outdoor Kitchen Pavilion',
    slug: 'barrhaven-interlock-patio-kitchen',
    category: 'interlock',
    serviceType: 'Interlock Patio & Walkway',
    location: 'Barrhaven, Ottawa',
    year: '2023',
    heroImage: IMAGES.interlockPatio,
    images: [
      {
        url: IMAGES.interlockPatio,
        alt: 'Finished interlocking paver patio dining terrace in Barrhaven',
        caption: 'Rectangular interlock pavers in mixed charcoal and tan laid in a running-bond field',
        tag: 'Patio Living Room'
      },
      {
        url: IMAGES.interlockInstall,
        alt: 'Crew setting stone units during interlock installation',
        caption: 'Hand-set units over compacted bedding with mallet and trowel',
        tag: 'Installation'
      }
    ],
    shortDescription: 'Modern large-format stone pavers installed on an open-graded aggregate base for rapid water drainage and zero frost heave in Ottawa clay soil.',
    fullDescription: 'Custom backyard hardscape in Barrhaven incorporating dining terrace, lounge area, and barbecue station. Installed over an engineered open-graded aggregate base (HPB) with non-woven geotextile separation, ensuring moisture drains instantly beneath the pavers without freezing and lifting during Ottawa winter cycles.',
    scope: [
      'Complete backyard site clearing and laser excavation',
      'Dual-layer geotextile membrane for Ottawa Leda clay stabilization',
      '10" High-Performance Bedding (HPB) washed aggregate compaction',
      'Precision paver placement with diamond blade perimeter cuts',
      'Heavy-duty snap-edge restraint spiked into subgrade every 12 inches',
      'Rain-safe polymeric sand vibration and protective natural-look seal'
    ],
    specs: {
      material: 'Large-Format Architectural Concrete Pavers',
      patternOrStyle: 'Linear 3-Piece Modular Pattern with Charcoal Soldier Course',
      colorOrFinish: 'Onyx Black & Champlain Grey Tones',
      subBase: '10" compacted Open-Graded Base over heavy structural geotextile'
    }
  },
  {
    id: 'project-orleans-stamped-pool-deck',
    title: 'Backyard Concrete Patio Terrace',
    slug: 'orleans-stamped-concrete-pool-deck',
    category: 'patios',
    serviceType: 'Concrete Patio',
    location: 'Orleans, Ottawa',
    year: '2023',
    heroImage: IMAGES.stampedPatio,
    images: [
      {
        url: IMAGES.stampedPatio,
        alt: 'Backyard concrete patio terrace with outdoor seating in Orleans',
        caption: 'Level patio terrace at the rear elevation with perimeter planting beds and lawn runoff',
        tag: 'Main Terrace'
      }
    ],
    shortDescription: 'Custom backyard concrete patio terrace contoured to the house and lawn, with positive slope away from the foundation.',
    fullDescription: 'Rear-yard patio in Orleans built as a permanent entertaining terrace off the house. Laser-graded for drainage away from the foundation, with a compacted granular base and air-entrained concrete sized for Ottawa freeze-thaw.',
    scope: [
      'Laser grade and excavate for positive slope away from the foundation',
      'Compacted Granular A base over geotextile',
      '4"–5" air-entrained patio slab with perimeter thickening',
      'Control joints aligned to the house fenestration',
      'Breathable sealer with light traction additive'
    ],
    specs: {
      material: '32 MPa Air-Entrained Exterior Concrete',
      patternOrStyle: 'Smooth architectural patio field with tooled edges',
      colorOrFinish: 'Natural cement grey',
      subBase: '8" compacted Granular A with geotextile'
    }
  },
  {
    id: 'project-nepean-concrete-porch-stairs',
    title: 'Rebuilt Front Entry Stairs & Stone-Faced Risers',
    slug: 'nepean-monolithic-front-stairs',
    category: 'stairs-walkways',
    serviceType: 'Concrete Stairs & Porch',
    location: 'Nepean, Ottawa',
    year: '2024',
    heroImage: IMAGES.projectEntryAfter,
    images: [
      {
        url: IMAGES.projectEntryAfter,
        alt: 'Rebuilt front entry stairs with rock-faced treads and fieldstone risers',
        caption: 'Monolithic rebuilt entry stairs with rock-faced treads and fieldstone risers',
        tag: 'Front Entrance'
      },
      {
        url: IMAGES.projectEntryBefore,
        alt: 'Weathered grey concrete steps before the rebuild',
        caption: 'Original unsound two-step landing prior to demolition',
        tag: 'Existing Condition'
      }
    ],
    shortDescription: 'Weathered grey two-step landing rebuilt with rock-faced treads, fieldstone risers, and a pitched threshold landing.',
    fullDescription: 'The original grey landing was stained, poorly pitched, and pulling away at the door. We rebuilt the stairs on the same entry — matching the house fieldstone on the risers — and pitched the landing to drain water off the threshold.',
    scope: [
      'Remove unsound two-step landing and reset critical heights',
      'Dowel reinforcement into the existing stair structure',
      'Rock-faced treads with fieldstone veneer on risers',
      'Laser pitch at the threshold to shed meltwater',
      'Match veneer stone to the existing house masonry'
    ],
    specs: {
      material: '32 MPa Air-Entrained Exterior Concrete',
      patternOrStyle: 'Rock-faced treads with fieldstone risers',
      colorOrFinish: 'Charcoal treads with tan/brown fieldstone',
      subBase: 'Existing stair mass wrapped and coated, new landing pitched to drain'
    }
  },
  {
    id: 'project-stittsville-garage-floor',
    title: 'Heavy-Duty Reinforced Garage Floor Slab',
    slug: 'stittsville-heavy-duty-garage-floor',
    category: 'concrete',
    serviceType: 'Garage Floor & Slab',
    location: 'Stittsville, Ottawa',
    year: '2023',
    heroImage: IMAGES.concreteSlab,
    images: [
      {
        url: IMAGES.concreteSlab,
        alt: 'Crew floating a reinforced exterior slab in wood forms',
        caption: 'Hand-float finishing over rebar in wood forms — the same process used for garage and patio slabs',
        tag: 'Slab Placement'
      }
    ],
    shortDescription: '850 sq.ft. 3-car residential garage slab replacement with laser-leveled slope to garage doors, fiber mesh, and steel rebar grid.',
    fullDescription: 'Engineered for a car enthusiast in Stittsville holding multiple heavy SUVs. The old slab was cracked and spalling from winter deicing salts. We poured a 6-inch high-density slab with micro-fiber reinforcement and applied a deep-penetrating densifier/hardener for maximum chemical and tire mark resistance.',
    scope: [
      'Saw-cutting and breaking out existing 4" unreinforced slab',
      'Re-leveling base with 6" Granular A and mechanical plate compaction',
      '10 mil vapor barrier to prevent groundwater moisture transmission',
      '10M rebar grid tied on 12" centers with fiber mesh in mix',
      'Power trowel finishing to a glass-smooth dense surface',
      'Precision diamond saw-cut control joints caulked with polyurea sealant'
    ],
    specs: {
      material: '32 MPa Concrete with Synthetic Structural Fibers',
      patternOrStyle: 'Dense Power-Troweled Hardened Finish',
      colorOrFinish: 'Natural Concrete with Penetrating Lithium Densifier',
      subBase: '6" compacted crushed stone over 10 mil vapor barrier'
    }
  }
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'stamped-concrete', label: 'Stamped Concrete' },
  { id: 'driveways', label: 'Driveways' },
  { id: 'interlock', label: 'Interlock Craftsmanship' },
  { id: 'patios', label: 'Patios & Terraces' },
  { id: 'stairs-walkways', label: 'Stairs & Walkways' },
  { id: 'concrete', label: 'Concrete & Slabs' },
] as const;
