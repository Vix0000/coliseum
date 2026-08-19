import { withBase } from '../lib/basePath';

export const IMAGES = {
  stampedPatio: withBase('/images/stamped-patio.jpg'),
  concreteDriveway: withBase('/images/concrete-driveway.jpg'),
  patioPool: withBase('/images/patio-pool.jpg'),
  concreteStairs: withBase('/images/concrete-stairs.jpg'),
  concreteSlab: withBase('/images/concrete-slab.jpg'),
  interlockInstall: withBase('/images/interlock-install.jpg'),
  interlockPatio: withBase('/images/interlock-patio.jpg'),
  projectEntryBefore: withBase('/images/project-entry-before.jpg'),
  projectEntryAfter: withBase('/images/project-entry-after.jpg'),
  planBlueprints: withBase('/images/plan-blueprints.jpg'),
  excavate: withBase('/images/excavate.jpg'),
  rebarSlab: withBase('/images/rebar-slab.jpg'),
  pourConcrete: withBase('/images/pour-concrete.jpg'),
  finishedDriveway: withBase('/images/finished-driveway.jpg'),
} as const;
