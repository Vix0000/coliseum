import { ServiceDetail } from '../types';
import { IMAGES } from './images';

export const SERVICES: ServiceDetail[] = [
  {
    id: 'stamped-concrete',
    slug: 'stamped-concrete',
    title: 'Stamped Concrete',
    tagline: 'The timeless texture of natural stone with the monolithic permanence of reinforced concrete.',
    shortDescription: 'Decorative stamped concrete patios, driveways, walkways, and pool surrounds with rich natural textures, custom integral colours, and antiquing releases.',
    fullDescription: 'Stamped concrete delivers the sophisticated beauty of slate, flagstone, cobblestone, or fieldstone without the individual paver shifting, weed growth, or uneven settling common to unmortared stones in Ottawa’s severe winter climate. Coliseum creates deeply textured, monolithic surfaces poured with 32+ MPa air-entrained concrete, reinforced with steel rebar, and protected with breathable high-solids sealers engineered specifically for freeze-thaw endurance.',
    heroImage: IMAGES.projectEntryAfter,
    features: [
      {
        title: 'Deep Architectural Textures',
        description: 'Authentic stone stamps including Ashlar Slate, European Fan, Random Flagstone, Cobblestone, and Seamless Roman Slate.'
      },
      {
        title: 'Dual-Tone Coloring Process',
        description: 'Integral color mixed throughout the entire slab depth, accented with secondary antique release powders for realistic natural stone dimension.'
      },
      {
        title: 'Freeze-Thaw Air Entrainment',
        description: 'Engineered mix designs featuring 6–8% micro-air voids allowing expanding trapped moisture to freeze safely without spalling the surface.'
      },
      {
        title: 'Zero Weed Infiltration',
        description: 'Monolithic continuous concrete plane eliminates weed seeds, ant burrows, and shifting joints between individual stones.'
      }
    ],
    specifications: [
      { label: 'Standard Concrete Mix', value: '32–35 MPa C-2 Class with 6-8% Air Entrainment' },
      { label: 'Sub-Base Depth', value: '8" to 12" Compacted Granular A Aggregate' },
      { label: 'Reinforcement', value: '10M Steel Rebar Grid on 16" Centers + Synthetic Microfibers' },
      { label: 'Surface Protection', value: 'Two Coats of Solvent-Based Acrylic Sealer with Micro-Grip' }
    ],
    applications: [
      'Backyard entertainment patios & outdoor dining pavilions',
      'Front walkways, entryways & sidewalk extensions',
      'Driveway accents, ribbons & stamped apron transitions',
      'In-ground pool surrounds & coping integration',
      'Fire pit terraces & outdoor kitchen flooring'
    ],
    faqs: [
      {
        question: 'Does stamped concrete hold up to Ottawa winters and freeze-thaw cycles?',
        answer: 'Yes, when engineered correctly. We pour air-entrained 32+ MPa exterior concrete over a deep, laser-graded 8-12" compacted aggregate base with positive slope away from structures. The air bubbles provide microscopic relief chambers where water can freeze and expand without rupturing the concrete surface.'
      },
      {
        question: 'Is stamped concrete slippery when wet or around pools?',
        answer: 'We incorporate a specialized micronized polymeric anti-slip additive directly into the protective sealer coat. This creates subtle microscopic traction that feels smooth to bare feet while providing sure grip in wet pool deck or rain conditions.'
      },
      {
        question: 'How often does stamped concrete need to be resealed?',
        answer: 'In the Ottawa climate, we typically recommend a simple reseal every 2 to 3 years depending on sun exposure and traffic. Resealing revitalizes the deep color contrast and renews UV and moisture protection.'
      },
      {
        question: 'Can you match or complement our existing brick and siding?',
        answer: 'Absolutely. We offer a comprehensive palette of integral color bases (warm grays, deep charcoals, earthy tans, rich limestones) paired with contrasting antique release powders to blend harmoniously with your home facade.'
      }
    ]
  },
  {
    id: 'concrete-driveways',
    slug: 'concrete-driveways',
    title: 'Concrete Driveways',
    tagline: 'Heavy-duty residential driveways engineered for Ottawa vehicle loads, snow plows, and winter salts.',
    shortDescription: 'Engineered monolithic concrete driveways with clean architectural broom finish, stamped borders, or full decorative finishes built on deep compacted aggregate.',
    fullDescription: 'Your driveway is the largest visual hardscape on your property and bears the heaviest structural demands. Unlike asphalt, which softens in July heat, develops tire ruts, and requires frequent toxic oil-based sealants, a Coliseum poured concrete driveway provides decades of clean, structural performance. Built with 5 to 6-inch thickness, steel reinforcement grids, and engineered control joints, our driveways maintain their level grade even over difficult Ottawa clay subsoils.',
    heroImage: IMAGES.concreteDriveway,
    features: [
      {
        title: 'High-Load 5"–6" Slab Depth',
        description: 'Engineered with thickened 6-inch edges and heavy-gauge rebar at the street apron where heavy municipal vehicles and delivery trucks enter.'
      },
      {
        title: 'Architectural Broom & Stamped Borders',
        description: 'Clean directional broom finish in the main field for superior winter tire traction, framed with handsome 12"–18" stamped slate perimeter borders.'
      },
      {
        title: 'Precision Expansion & Control Joints',
        description: 'Diamond saw-cut joints placed systematically at one-quarter slab depth to guide natural concrete thermal contraction cleanly without wild cracks.'
      },
      {
        title: 'Road Salt & Chemical Resistance',
        description: 'Penetrating silane-siloxane moisture barrier preventing brine and vehicle-transported road deicing salts from corroding interior steel.'
      }
    ],
    specifications: [
      { label: 'Thickness', value: '5" Slab Depth (6" Thickened Street Apron & Curbs)' },
      { label: 'Compressive Strength', value: '35 MPa High-Performance Air-Entrained Mix' },
      { label: 'Subgrade Preparation', value: '10"–14" Compacted Granular A with Non-Woven Geotextile' },
      { label: 'Curb Transition', value: 'Monolithic Poured Apron with Saw-Cut Foundation Isolation' }
    ],
    applications: [
      'Single, double & triple residential driveways',
      'Driveway extensions & RV / boat parking pads',
      'Modern architectural broom finish with stamped ribbons',
      'Full decorative stamped concrete driveways',
      'Drop curbs & city sidewalk transition repairs'
    ],
    faqs: [
      {
        question: 'How does concrete compare to asphalt in cost and lifespan for Ottawa homes?',
        answer: 'While concrete has a higher initial investment than asphalt, its lifespan is typically 30 to 40+ years compared to 12-15 years for asphalt. Concrete does not soften in summer sun, does not rut under heavy vehicles, requires no smelly blacktop coatings every two years, and substantially increases home curb value.'
      },
      {
        question: 'When can I drive my vehicles on a newly poured concrete driveway?',
        answer: 'You can walk on the surface after 24 to 48 hours. Light passenger vehicles can safely drive on the new slab after 7 to 10 days (once the concrete achieves ~70% of design strength). Heavy trucks or commercial delivery vehicles should wait 21 to 28 days for full cure.'
      },
      {
        question: 'Can snow plows and snowblowers damage a concrete driveway?',
        answer: 'Our concrete is finished with hardened aggregate surfaces and saw-cut joints that do not catch plow blades like uneven asphalt or lifting pavers. We recommend plastic or rubber-edged snowblower skids and avoiding metal spade chisels on any decorative hardscape.'
      }
    ]
  },
  {
    id: 'concrete-patios',
    slug: 'concrete-patios',
    title: 'Concrete Patios & Outdoor Living',
    tagline: 'Custom outdoor living spaces tailored to your backyard layout, family lifestyle, and Ottawa seasons.',
    shortDescription: 'Custom poured concrete and stamped patio terraces designed for dining, outdoor kitchens, fire pits, and pool surrounds with zero weed maintenance.',
    fullDescription: 'A backyard patio should be an effortless extension of your interior living space. Coliseum designs and pours custom backyard concrete terraces that embrace your home’s architecture, natural yard grade, and sunlight patterns. Whether you envision a sleek contemporary brushed concrete terrace or an expansive multi-level stamped stone patio with built-in sitting benches and fire pits, we deliver permanent, stable outdoor comfort.',
    heroImage: IMAGES.stampedPatio,
    features: [
      {
        title: 'Custom Curvilinear & Geometric Layouts',
        description: 'Flexible architectural formwork allows flowing organic curves, crisp modern right angles, or multi-level stepped terrace zones.'
      },
      {
        title: 'Integrated Conduit & Drainage',
        description: 'Hidden underground conduits installed prior to pour for low-voltage landscape lighting, gas fire pits, and perimeter storm drainage.'
      },
      {
        title: 'Comfortable Barefoot Surfaces',
        description: 'Non-abrasive tactile textures that stay comfortable under summer sun while providing reliable traction for children and pets.'
      },
      {
        title: 'Zero Mud, Zero Settling',
        description: 'Rigid monolithic platform eliminates the soggy spring mud and sunken unlevel table legs common to uncompacted dirt or soft soil.'
      }
    ],
    specifications: [
      { label: 'Standard Slab Thickness', value: '4"–5" Monolithic Slab with Thickened Perimeter Beams' },
      { label: 'Concrete Strength', value: '32 MPa with Synthetic Structural Micro-Fiber' },
      { label: 'Base Layer', value: '8"–10" Crushed Stone on Geotextile Membrane' },
      { label: 'Slope Gradient', value: 'Minimum 1.5% Positive Fall away from House Foundation' }
    ],
    applications: [
      'Al fresco dining terraces & barbecue kitchen pads',
      'Sunken fire pit lounges & conversation seating',
      'In-ground and above-ground pool deck surrounds',
      'Hot tub & spa structural support slabs (reinforced 6"–8")',
      'Covered porch pads & pergola structural bases'
    ],
    faqs: [
      {
        question: 'Can concrete hold the weight of a filled 8-person hot tub or swim spa?',
        answer: 'Yes. We engineer dedicated spa pads with 6-inch thickness, double 10M rebar grid reinforcement, and thickened perimeter footings sized for a filled 8-person spa — often 6,000–8,000+ lbs including water and occupants.'
      },
      {
        question: 'How do you prevent water from flowing back toward the house foundation?',
        answer: 'We establish precise elevation benchmarks using optical laser levels. Every patio is poured with a mandatory minimum 1.5% to 2% positive slope away from the foundation, guiding rainwater and melting snow naturally into lawn swales or drainage lines.'
      }
    ]
  },
  {
    id: 'concrete-stairs',
    slug: 'concrete-stairs',
    title: 'Concrete Stairs & Porches',
    tagline: 'Permanent monolithic entrance steps and front porches built to frost-depth specifications.',
    shortDescription: 'Solid poured concrete stairs, entrance landings, and front porches anchored to frost footings, eliminating winter shifting, cracked parging, and loose bricks.',
    fullDescription: 'Front entrance stairs are subject to Ottawa’s most unforgiving winter forces: constant freeze-thaw cycles, direct salt exposure, and ground heave. Mortared brick and hollow block steps frequently crack and pull away from the home within 5–7 years. Coliseum pours solid monolithic concrete stair structures pinned directly into the foundation wall with structural rebar and supported on frost-depth piers (typically 1.2 m / about 4 ft deep).',
    heroImage: IMAGES.projectEntryAfter,
    features: [
      {
        title: 'Frost-Depth Pier Anchoring',
        description: 'Engineered footings poured below Ottawa’s typical 1.2 m (about 4 ft) frost depth, reducing seasonal ground heave that can lift or tilt the steps.'
      },
      {
        title: 'Building Code Geometric Precision',
        description: 'Strict adherence to Ontario Building Code riser heights (125–200 mm, about 5" to 8") and uniform run depths for effortless, trip-free ascent.'
      },
      {
        title: 'Foundation Doweling',
        description: 'Epoxy-anchored 15M steel rebar dowels tying the stair structure rigidly into your home’s concrete basement foundation.'
      },
      {
        title: 'Architectural Edge Profiles',
        description: 'Custom bullnose, cantilevered, or chamfered tread profiles with stamped stone risers and smooth non-slip broom treads.'
      }
    ],
    specifications: [
      { label: 'Stair Structure', value: 'Solid Poured Monolithic Reinforced Concrete (No Hollow Blocks)' },
      { label: 'Frost Piers', value: '10"–12" Sonotube Concrete Piers to ~1.2 m (48") Depth' },
      { label: 'Tread Finish', value: 'Fine Non-Slip Broom or Light Sponge Float Finish' },
      { label: 'Riser Finish', value: 'Custom Stamped Stone Face or Smooth Architectural Parge' }
    ],
    applications: [
      'Front entryway steps & covered porch landing rebuilds',
      'Backyard elevation transitions & patio access steps',
      'Curved sweeping grand entrance staircases',
      'Side door entry landings & grade access steps',
      'Structural basement walkout stairs with retaining walls'
    ],
    faqs: [
      {
        question: 'Why do our old brick and mortar steps keep cracking every spring?',
        answer: 'Brick steps are built with dozens of mortar seams. In Ottawa, water penetrates these seams, freezes, and expands by ~9% in volume, popping the mortar and loosening the bricks. Our solid monolithic concrete pours have no mortar joints to fail.'
      },
      {
        question: 'Can you pour new concrete steps over existing crumbling concrete?',
        answer: 'We strongly advise against "capping" unstable crumbling concrete. We completely demolish and haul away the failed structure, inspect and compact the base, drill structural anchor dowels, and pour a fresh monolithic unit that will last decades.'
      }
    ]
  },
  {
    id: 'garage-floors',
    slug: 'garage-floors',
    title: 'Garage Floors & Slabs',
    tagline: 'High-density power-troweled slabs engineered for heavy vehicles, workshops, and road salt resistance.',
    shortDescription: 'Precision laser-screeded residential garage floor replacements, detached workshop slabs, shed pads, and structural equipment pads.',
    fullDescription: 'Ottawa garages endure harsh conditions: vehicles dripping corrosive slush, road deicing salts, snowmelt runoff, and heavy wheel point loads. Over time, unreinforced builder-grade garage floors pit, scale, crack, and settle. Coliseum replaces compromised slabs with 5–6" high-strength reinforced concrete, laser-pitched for efficient water drainage toward overhead doors, and power-troweled to an ultra-dense, durable finish.',
    heroImage: IMAGES.concreteSlab,
    features: [
      {
        title: 'Laser-Pitched Drainage Slope',
        description: 'Precise 1" to 1.5" slope from rear wall to garage door opening ensures winter snowmelt drains freely out of the garage.'
      },
      {
        title: 'Power Trowel Surface Densification',
        description: 'Multi-pass mechanized power troweling forces fines to the top, creating a super-dense, smooth, abrasion-resistant surface layer.'
      },
      {
        title: 'Heavy Structural Steel & Fiber Reinforcement',
        description: 'Dual reinforcement system combining 10M steel rebar grid with million-count structural synthetic poly-fibers dispersed throughout.'
      },
      {
        title: 'Sub-Slab Vapor Retarder',
        description: '10 mil heavy polyethylene vapor barrier preventing subgrade groundwater vapor from passing through the concrete.'
      }
    ],
    specifications: [
      { label: 'Compressive Strength', value: '32 MPa Exterior Grade with Low Water-Cement Ratio' },
      { label: 'Slab Thickness', value: '5"–6" with 8" Thickened Perimeter Haunches' },
      { label: 'Vapor Retarder', value: '10 mil Non-Degrading Polyethylene Membrane' },
      { label: 'Joint Sealing', value: 'Saw-Cut Control Joints with Polyurea Industrial Joint Filler' }
    ],
    applications: [
      'Single, double & triple residential attached garage floor replacements',
      'Detached garage & workshop structural floating slabs',
      'Backyard storage shed & pool equipment pads',
      'Commercial light-duty bays & utility rooms'
    ],
    faqs: [
      {
        question: 'Why is our existing garage floor pitting and flaking near where the car tires park?',
        answer: 'This is caused by road salt and freeze-thaw spalling. In winter, salty snow from wheel wells melts onto the unsealed concrete. The salt lowers the freezing temperature, increasing the frequency of freeze-thaw cycles and eating into weak cement paste. Our dense mix designs and penetrating sealers prevent salt absorption.'
      },
      {
        question: 'Can you install epoxy coatings or densifiers on the new floor?',
        answer: 'We can apply penetrating lithium densifiers that react with free lime in the concrete to harden and dustproof the surface. Epoxy or other film coatings are a separate finish — ask at the quote visit if you want a coating specified.'
      }
    ]
  },
  {
    id: 'interlock',
    slug: 'interlock',
    title: 'Interlock Craftsmanship',
    tagline: 'Premium architectural pavers, driveway extensions, retaining garden walls, and custom stone walkways.',
    shortDescription: 'High-format stone pavers, interlock driveways, driveway extensions, front walkways, and garden steps installed over open-graded aggregate bases.',
    fullDescription: 'Interlock stone offers unmatched modular flexibility, rich natural colors, and individual paver character. However, an interlock installation is only as good as what lies beneath the surface. Coliseum builds interlock projects on an open-graded aggregate base system (HPB) with heavy non-woven geotextile separation, spiked commercial edge restraints, and rain-safe polymeric sand jointing—ensuring the surface remains flat and weed-free through decades of Ottawa winters.',
    heroImage: IMAGES.interlockPatio,
    features: [
      {
        title: 'Engineered Open-Graded Base (HPB)',
        description: 'Free-draining washed aggregate base prevents water retention under pavers, virtually eliminating frost heave during Ottawa freeze-thaw cycles.'
      },
      {
        title: 'Heavy Structural Geotextile Membrane',
        description: 'Prevents base gravel from sinking into Ottawa’s notorious soft Leda clay subsoil, maintaining base integrity over time.'
      },
      {
        title: 'Spiked Commercial Edge Restraints',
        description: 'Heavy PVC edging fastened with 10-inch steel spikes every 12 inches prevents perimeter pavers from creeping or spreading outward.'
      },
      {
        title: 'High-Polymer Elastomeric Joint Sand',
        description: 'Advanced jointing compound sets flexible and firm, locking out ants, weed seeds, and water washout.'
      }
    ],
    specifications: [
      { label: 'Paver Types', value: 'High-Format Slabs, Permeable Pavers & Modular Stone' },
      { label: 'Base Depth', value: '8"–10" for Walkways/Patios, 12"–16" for Driveways' },
      { label: 'Base Aggregate', value: 'High-Performance Bedding (HPB) / Granular A Compacted' },
      { label: 'Joint Compound', value: 'Advanced Rain-Fast Polymeric Sand' }
    ],
    applications: [
      'Complete interlock driveways & matching driveway extensions',
      'Front entrance stone walkways & garden path connections',
      'Backyard interlock patios & barbecue terraces',
      'Low retaining garden walls, seat walls & step risers',
      'Interlock re-leveling, lift-and-relay restoration & polymeric re-sanding'
    ],
    faqs: [
      {
        question: 'Why do some Ottawa interlock driveways get wavy and uneven after a few winters?',
        answer: 'Unstable interlock is caused by poor excavation depth, inadequate compaction, using dirty unwashed sand that holds water, or omitting geotextile fabric over soft clay subsoil. When trapped water freezes, it expands upward, pushing individual pavers out of alignment. Our engineered open-graded aggregate bases drain water immediately away from the stone underside.'
      },
      {
        question: 'Can you add an interlock extension alongside my existing asphalt or concrete driveway?',
        answer: 'Yes! Driveway widening is one of our most popular services. We excavate, install a full-depth structural base alongside the existing driveway, and lay matching or complementary interlock ribbons with spiked edging for extra parking width.'
      }
    ]
  }
];
