import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, AlertCircle, Send, Upload, Sparkles, Trash2, ChevronDown, Check } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { PhotoPreview } from '../types';
import { readPhotoPreviews } from '../utils/photoPreview';
import { usePhoneCall } from '../components/PhoneCallContext';
import { useEmail } from '../components/EmailContext';
import { useCompany } from '../components/ThemeContext';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

const FIELD_CLASS =
  'w-full bg-canvas border-2 border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent';

const SERVICE_OPTIONS = [
  'Stamped Concrete Patio',
  'Concrete Driveway',
  'Concrete Patios & Slabs',
  'Concrete Stairs & Porches',
  'Garage Floors & Slabs',
  'Interlock Driveway / Pavers',
  'Other Hardscape Project',
];

const ServiceSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`${FIELD_CLASS} text-left flex items-center justify-between gap-3 pr-3 focus-visible:outline-none ${
          open ? 'border-accent' : ''
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-accent transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Service interested in"
          className="absolute z-30 top-full left-0 right-0 mt-1.5 bg-elevated border-2 border-white/15 rounded-lg shadow-2xl p-1.5"
        >
          {SERVICE_OPTIONS.map((option) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded text-sm transition-colors flex items-center justify-between gap-2 ${
                  selected
                    ? 'bg-accent/10 text-accent'
                    : 'text-stone-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{option}</span>
                {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const COMPANY_INFO = useCompany();
  const { openPhoneModal } = usePhoneCall();
  const { openEmailModal } = useEmail();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Stamped Concrete Patio',
    location: '',
    message: '',
    preferredContact: 'phone',
  });

  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    readPhotoPreviews(e.target.files, (photo) => {
      setPhotos((prev) => [...prev, photo]);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in your name, phone number, and email.');
      return;
    }

    setErrorMessage('');
    setIsSuccess(true);
  };

  return (
    <div id="contact-page" className="pt-24 pb-20 bg-canvas text-stone-200 min-h-screen">
      <SeoHead
        title={`Contact Coliseum Concrete & Interlock | Ottawa ${COMPANY_INFO.phoneFormatted}`}
        description={`Contact Coliseum Concrete & Interlock in Ottawa. Call ${COMPANY_INFO.phoneFormatted} or email ${COMPANY_INFO.email} for free residential estimates in Ottawa, Kanata, Nepean, and Orleans.`}
        canonicalPath="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.2em] text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Inquiries & Estimates</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mt-2 leading-tight">
            Let’s Discuss Your Project.
          </h1>
          <p className="text-stone-400 text-base sm:text-lg mt-3 leading-relaxed">
            Reach out by phone, email, or fill out our direct inquiry form below. We schedule free on-site consultations across the Ottawa region.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info & NAP Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="bg-surface border-2 border-white/10 rounded-2xl p-6 space-y-3 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono-code uppercase text-stone-400">Direct Telephone</span>
                <button
                  type="button"
                  onClick={openPhoneModal}
                  className="block text-2xl font-display font-bold text-white hover:text-accent transition-colors mt-1 text-left"
                >
                  {COMPANY_INFO.phoneFormatted}
                </button>
                <p className="text-xs text-stone-400 mt-1">
                  Call or text for fast scheduling and questions.
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-surface border-2 border-white/10 rounded-2xl p-6 space-y-3 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono-code uppercase text-stone-400">Direct Email</span>
                <button
                  type="button"
                  onClick={openEmailModal}
                  className="block text-base font-mono-code font-bold text-white hover:text-accent transition-colors mt-1 break-all text-left"
                >
                  {COMPANY_INFO.email}
                </button>
                <p className="text-xs text-stone-400 mt-1">
                  {COMPANY_INFO.quoteResponseTime}
                </p>
              </div>
            </div>

            {/* Location & Hours Card */}
            <div className="bg-surface border-2 border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono-code uppercase text-stone-400 block">Business Address</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">{COMPANY_INFO.fullAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono-code uppercase text-stone-400 block">Operating Hours</span>
                  <span className="text-xs text-stone-300 mt-0.5 block">{COMPANY_INFO.workingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono-code uppercase text-stone-400 block">Licensing</span>
                  <span className="text-xs text-stone-300 mt-0.5 block">{COMPANY_INFO.licensing}</span>
                </div>
              </div>
            </div>

            {/* Ottawa Service Neighborhoods */}
            <div className="p-5 rounded-2xl bg-raised border-2 border-white/10 space-y-3">
              <span className="text-xs font-mono-code uppercase tracking-wider text-accent block">
                Primary Service Radius:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {COMPANY_INFO.serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono-code text-stone-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface border-2 border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
              
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent flex items-center justify-center mx-auto text-accent">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Demo confirmation
                  </h3>
                  <p className="text-stone-300 text-sm max-w-md mx-auto">
                    Thanks, {formData.name}. This preview does not send messages.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={openPhoneModal}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-fg font-bold text-xs uppercase tracking-wider rounded"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {COMPANY_INFO.phoneFormatted}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">
                      Send a Message or Project Inquiry
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Prefer the detailed quote form?{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('/quote')}
                        className="text-accent underline hover:text-accent-hover"
                      >
                        Request a quote
                      </button>
                      {' · '}
                      <button
                        type="button"
                        onClick={() => onNavigate('/privacy')}
                        className="text-accent underline hover:text-accent-hover"
                      >
                        Privacy Policy
                      </button>
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-900/40 border-2 border-red-500 rounded text-xs text-red-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. David Miller"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={FIELD_CLASS}
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
                        className={FIELD_CLASS}
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. david@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={FIELD_CLASS}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                        Service Interested In
                      </label>
                      <ServiceSelect
                        value={formData.serviceType}
                        onChange={(serviceType) => setFormData({ ...formData, serviceType })}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                        Ottawa Area / Postal Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kanata, K2W"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className={FIELD_CLASS}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5">
                        Project Description or Questions
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about what you want to build, approximate dimensions, or timeline..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={FIELD_CLASS}
                      />
                    </div>

                    {/* Optional Photo Attachment */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-mono-code uppercase tracking-wider text-stone-300 block">
                        Attach Site Photos (Optional)
                      </label>
                      <label className="border-2 border-dashed border-white/20 hover:border-accent rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer transition-colors bg-white/5 text-xs text-stone-400">
                        <Upload className="w-4 h-4 text-accent" />
                        <span>Click to attach photos (JPG, PNG up to 10MB)</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {photos.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {photos.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 rounded text-xs text-stone-300">
                              <span className="truncate max-w-[140px]">{p.name}</span>
                              <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                className="text-red-400 hover:text-red-300 active:text-red-200 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-mono-code">
                      Demo form — nothing is sent.
                    </span>
                    <button
                      type="submit"
                      className="px-7 py-3.5 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded transition-all shadow-xl flex items-center gap-2"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
