import React, { useEffect, useRef, useState } from 'react';
import { 
  Check, ArrowRight, ArrowLeft, Upload, Phone, 
  CheckCircle2, AlertCircle, Trash2 
} from 'lucide-react';
import { QuoteFormData } from '../types';
import { readPhotoPreviews } from '../utils/photoPreview';
import { usePhoneCall } from './PhoneCallContext';
import { useCompany } from './ThemeContext';

interface QuoteWizardProps {
  initialProjectType?: string;
  onNavigate?: (path: string) => void;
}

const PROJECT_TYPE_OPTIONS = [
  { id: 'stamped-patio', label: 'Stamped Concrete Patio', desc: 'Backyard living, dining terraces & fire pits' },
  { id: 'concrete-driveway', label: 'Concrete Driveway', desc: 'Broom finish, stamped borders or full stamp' },
  { id: 'concrete-patio', label: 'Concrete Patio', desc: 'Poured outdoor living & pool deck surrounds' },
  { id: 'concrete-stairs', label: 'Concrete Stairs / Porch', desc: 'Poured monolithic steps with frost footings' },
  { id: 'concrete-walkway', label: 'Concrete Walkway', desc: 'Front sidewalk, side paths & step landings' },
  { id: 'garage-floor', label: 'Garage Floor & Slabs', desc: 'Laser-screeded power-troweled shop pads' },
  { id: 'interlock-driveway', label: 'Interlock Driveway / Extension', desc: 'Paver driveway widening & borders' },
  { id: 'interlock-patio', label: 'Interlock Patio / Walkway', desc: 'High-format pavers & garden stone' },
  { id: 'other', label: 'Other Custom Hardscape', desc: 'Retaining walls, pool coping, repairs' },
];

const TIMELINE_OPTIONS = [
  'Ready to start ASAP / next available opening',
  'Within the next 1 to 2 months',
  'Later this upcoming season (Spring/Summer/Fall)',
  'Planning & budgeting for next year'
];

const AREA_OPTIONS = [
  'Under 300 sq.ft. (Small patio / walkway / steps)',
  '300 – 600 sq.ft. (Standard 2-car driveway or medium patio)',
  '600 – 1,200 sq.ft. (Large patio, full driveway & walkways)',
  '1,200+ sq.ft. (Extensive pool deck & multi-zone hardscape)',
  'Not sure yet (Need an on-site measurement)'
];

const CONTACT_METHODS: { id: QuoteFormData['preferredContact']; label: string; desc: string }[] = [
  { id: 'phone', label: 'Phone Call', desc: 'Direct conversation' },
  { id: 'email', label: 'Email Only', desc: 'Written quote details' },
  { id: 'either', label: 'Either is Fine', desc: 'First available' },
];

export const QuoteWizard: React.FC<QuoteWizardProps> = ({ initialProjectType, onNavigate }) => {
  const COMPANY_INFO = useCompany();
  const { openPhoneModal } = usePhoneCall();
  const wizardRef = useRef<HTMLDivElement>(null);
  const scrollToFormOnStepChange = useRef(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [quoteId, setQuoteId] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState<QuoteFormData>({
    projectTypes: initialProjectType ? [initialProjectType] : [],
    projectScope: 'Replacement / overhaul of existing surface',
    estimatedArea: '300 – 600 sq.ft. (Standard 2-car driveway or medium patio)',
    locationPostal: '',
    projectAddress: '',
    timeline: 'Within the next 1 to 2 months',
    photos: [],
    customerName: '',
    phone: '',
    email: '',
    preferredContact: 'phone',
    notes: '',
  });

  // Handle Photo uploads (client-side preview)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    readPhotoPreviews(e.target.files, (photo) => {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, photo],
      }));
    });
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const toggleProjectType = (typeLabel: string) => {
    setFormData((prev) => {
      const exists = prev.projectTypes.includes(typeLabel);
      if (exists) {
        return {
          ...prev,
          projectTypes: prev.projectTypes.filter((t) => t !== typeLabel),
        };
      } else {
        return {
          ...prev,
          projectTypes: [...prev.projectTypes, typeLabel],
        };
      }
    });
  };

  const validateStep = (stepNumber: number): boolean => {
    setErrorMessage('');
    if (stepNumber === 1) {
      if (formData.projectTypes.length === 0) {
        setErrorMessage('Please select at least one project type to continue.');
        return false;
      }
    }
    if (stepNumber === 3) {
      if (!formData.locationPostal.trim()) {
        setErrorMessage('Please provide an Ottawa neighborhood or postal code.');
        return false;
      }
    }
    if (stepNumber === 5) {
      if (!formData.customerName.trim()) {
        setErrorMessage('Please provide your full name.');
        return false;
      }
      if (!formData.phone.trim() || formData.phone.length < 7) {
        setErrorMessage('Please provide a valid contact phone number.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMessage('Please provide a valid email address.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      scrollToFormOnStepChange.current = true;
      setCurrentStep((prev) => Math.min(6, prev + 1));
    }
  };

  useEffect(() => {
    if (!scrollToFormOnStepChange.current) return;
    scrollToFormOnStepChange.current = false;
    if (!window.matchMedia('(max-width: 1023px)').matches) return;
    wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentStep]);

  const prevStep = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;
    setQuoteId(`DEMO-${Date.now().toString().slice(-6)}`);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-surface border-2 border-white/15 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto text-accent mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono-code uppercase tracking-widest text-accent">
          Demo confirmation
        </span>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
          Quote flow complete.
        </h2>

        <div className="bg-white/5 border-2 border-white/10 rounded-xl p-4 my-6 text-left text-xs sm:text-sm text-stone-300 space-y-2">
          <div className="flex justify-between font-mono-code">
            <span className="text-stone-400">Reference ID:</span>
            <span className="text-accent font-bold">{quoteId || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Client:</span>
            <span className="text-white font-medium">{formData.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Location:</span>
            <span className="text-white font-medium">{formData.locationPostal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Selected Scope:</span>
            <span className="text-white font-medium truncate max-w-xs">{formData.projectTypes.join(', ')}</span>
          </div>
        </div>

        <p className="text-stone-400 text-sm leading-relaxed mb-6">
          This is a demo preview. The form stays in the browser and does not send an inquiry.
        </p>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={openPhoneModal}
            className="w-full sm:w-auto px-6 py-3 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Prefer to talk now? Call {COMPANY_INFO.phone}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="quote-request-wizard"
      ref={wizardRef}
      className="scroll-mt-24 bg-surface border-2 border-white/15 rounded-2xl shadow-2xl overflow-hidden"
    >
      
      {/* Top Header & Step Progress */}
      <div className="bg-elevated border-b border-white/10 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
          Get Your Free Project Quote
        </h2>

        {/* Step Progress Bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 overflow-hidden">
          <div
            className="bg-accent h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] sm:text-xs font-mono-code text-stone-400 mt-2">
          <span>01 Scope</span>
          <span>02 Details</span>
          <span>03 Location</span>
          <span>04 Photos</span>
          <span>05 Contact</span>
          <span>06 Preference</span>
        </div>
      </div>

      {/* Form Content Area */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Project Type */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                What are you looking to build or replace?
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Select one or more hardscape services you would like included in your quote.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {PROJECT_TYPE_OPTIONS.map((opt) => {
                const isSelected = formData.projectTypes.includes(opt.label);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleProjectType(opt.label)}
                    className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-elevated border-accent ring-1 ring-accent shadow-lg'
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          {opt.label}
                        </span>
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-accent text-accent-fg flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Dimensions & Details */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Tell us about the project dimensions & scope.
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Approximate size helps us prepare a more accurate quote.
              </p>
            </div>

            {/* Estimated Square Footage */}
            <div className="space-y-2">
              <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block">
                Estimated Size / Square Footage
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AREA_OPTIONS.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setFormData({ ...formData, estimatedArea: area })}
                    className={`text-left px-4 py-3 rounded-lg border-2 text-xs transition-all ${
                      formData.estimatedArea === area
                        ? 'bg-elevated border-accent text-white font-medium'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Existing Surface Status */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block">
                Current Ground / Surface Condition
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Existing old concrete or asphalt to demolish',
                  'Existing failing interlock or wood deck',
                  'New construction / virgin grass & soil'
                ].map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectScope: scope })}
                    className={`text-left p-3 rounded-lg border-2 text-xs transition-all ${
                      formData.projectScope === scope
                        ? 'bg-elevated border-accent text-white font-medium'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Timeline */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block">
                Target Timeline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TIMELINE_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeline: t })}
                    className={`text-left px-4 py-2.5 rounded-lg border-2 text-xs transition-all ${
                      formData.timeline === t
                        ? 'bg-elevated border-accent text-white font-medium'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Where is your project located in Ottawa?
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                We service all neighborhoods across the Ottawa region and surrounding areas.
              </p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                  Neighborhood or Postal Code <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kanata Lakes, K2K or Barrhaven, K2J"
                  value={formData.locationPostal}
                  onChange={(e) => setFormData({ ...formData, locationPostal: e.target.value })}
                  className="w-full bg-canvas border-2 border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                  Street Address (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 124 Example Street"
                  value={formData.projectAddress}
                  onChange={(e) => setFormData({ ...formData, projectAddress: e.target.value })}
                  className="w-full bg-canvas border-2 border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                  Project Notes or Specific Ideas
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Looking for ashlar slate stamp with charcoal border, need slope away from patio doors."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-canvas border-2 border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Upload Photos */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Upload Area Photos or Inspiration (Optional)
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Photos of the existing yard, driveway, or desired styles help us evaluate access, slope, and base requirements.
              </p>
            </div>

            {/* Drag and drop upload box */}
            <label className="border-2 border-dashed border-white/20 hover:border-accent rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white/5 text-center">
              <Upload className="w-8 h-8 text-accent mb-3" />
              <span className="text-sm font-semibold text-white">
                Click to upload or drag photos here
              </span>
              <span className="text-xs text-stone-400 mt-1">
                Existing yard, driveway, sketch, or inspiration photos (JPG, PNG, WebP up to 10MB)
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Uploaded Thumbnails Grid */}
            {formData.photos.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono-code uppercase text-stone-400">
                  Uploaded Images ({formData.photos.length}):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.photos.map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      className="relative rounded-lg overflow-hidden border border-white/15 bg-black aspect-video group"
                    >
                      <img
                        src={photo.previewUrl}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(pIdx)}
                        className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded hover:bg-red-700 active:bg-red-800 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-black/75 px-1.5 py-0.5 rounded text-[9px] font-mono-code text-stone-300 truncate max-w-[80%]">
                        {photo.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Contact Information */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Where should we send your quote?
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                These details stay in this preview and are not sent.{' '}
                {onNavigate ? (
                  <button
                    type="button"
                    onClick={() => onNavigate('/privacy')}
                    className="text-accent underline hover:text-accent-hover"
                  >
                    Privacy Policy
                  </button>
                ) : (
                  <a href="/privacy" className="text-accent underline hover:text-accent-hover">
                    Privacy Policy
                  </a>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div className="sm:col-span-2">
                <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. John MacDonald"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-canvas border-2 border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                  Phone Number <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. (613) 555-0199"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-canvas border-2 border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-canvas border-2 border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation & Contact Preferences */}
        {currentStep === 6 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Final Step: Review & Preferred Contact Method
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                How would you prefer we follow up with you?
              </p>
            </div>

            {/* Preferred Contact Selector */}
            <div className="grid grid-cols-3 gap-3 max-w-lg">
              {CONTACT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredContact: method.id })}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    formData.preferredContact === method.id
                      ? 'bg-elevated border-accent text-white'
                      : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{method.label}</div>
                  <div className="text-[10px] text-stone-400">{method.desc}</div>
                </button>
              ))}
            </div>

            {/* Summary Review Card */}
            <div className="bg-white/5 border-2 border-white/10 rounded-xl p-4 text-xs text-stone-300 space-y-1.5 max-w-xl">
              <div className="font-mono-code text-accent uppercase font-semibold mb-2">
                Summary of Request:
              </div>
              <div><span className="text-stone-400">Services:</span> {formData.projectTypes.join(', ')}</div>
              <div><span className="text-stone-400">Est. Size:</span> {formData.estimatedArea}</div>
              <div><span className="text-stone-400">Location:</span> {formData.locationPostal}</div>
              <div><span className="text-stone-400">Timeline:</span> {formData.timeline}</div>
              <div><span className="text-stone-400">Contact:</span> {formData.customerName} ({formData.phone}, {formData.email})</div>
              {formData.photos.length > 0 && <div><span className="text-stone-400">Attached Photos:</span> {formData.photos.length} files</div>}
            </div>
          </div>
        )}

        {/* Navigation & Submission Controls */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 rounded bg-white/5 hover:bg-white/10 active:bg-white/15 text-stone-300 text-xs font-mono-code flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-7 py-3 rounded bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3.5 rounded bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl active:scale-95 transition-all"
            >
              <span>Submit Quote Request</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </form>
    </div>
  );
};
