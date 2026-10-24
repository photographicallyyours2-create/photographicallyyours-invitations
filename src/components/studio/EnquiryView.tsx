import React, { useState, useEffect } from 'react';
import { templateRegistry } from '../../data/templateRegistry';
import { CustomerEnquiryData } from '../../types/enquiry';
import { RoyalDivider } from '../JaaliDecor';
import { Sparkles, Check, AlertCircle, Send, MessageCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnquiryViewProps {
  initialTemplateId?: string;
  onNavigate: (route: string) => void;
}

export const EnquiryView: React.FC<EnquiryViewProps> = ({ initialTemplateId, onNavigate }) => {
  const [formData, setFormData] = useState<CustomerEnquiryData>({
    brideName: '',
    groomName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    weddingDate: '',
    guestCount: '250 - 500 Guests',
    destinationCity: 'Udaipur, Rajasthan',
    preferredTemplateId: initialTemplateId || 'royal-heirloom',
    servicesNeeded: ['Multi-Day Schedule', 'WhatsApp Optimized Link', 'RSVP & Guest Tracker'],
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<CustomerEnquiryData | null>(null);

  useEffect(() => {
    if (initialTemplateId) {
      setFormData((prev) => ({ ...prev, preferredTemplateId: initialTemplateId }));
    }
  }, [initialTemplateId]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.brideName.trim()) newErrors.brideName = "Please provide the bride's name.";
    if (!formData.groomName.trim()) newErrors.groomName = "Please provide the groom's name.";
    if (!formData.contactName.trim()) newErrors.contactName = 'Please provide the contact person name.';
    if (!formData.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please provide a valid email address.';
    }
    if (!formData.contactPhone.trim() || formData.contactPhone.trim().length < 8) {
      newErrors.contactPhone = 'Please provide a valid WhatsApp contact number.';
    }
    if (!formData.weddingDate.trim()) newErrors.weddingDate = 'Please select or enter your anticipated wedding date.';
    if (!formData.destinationCity.trim()) newErrors.destinationCity = 'Please enter your wedding destination or city.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#5E1924', '#FAF6F0', '#E8D5CE'],
      });
    } catch {
      // Fallback
    }

    setSubmittedData({ ...formData });
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(service);
      const updated = exists
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service];
      return { ...prev, servicesNeeded: updated };
    });
  };

  const selectedTemplate =
    templateRegistry.find((t) => t.id === formData.preferredTemplateId) || templateRegistry[0];

  const handleWhatsAppConsultation = () => {
    if (!submittedData) return;
    const text = encodeURIComponent(
      `Hello The Atelier! We have prepared a bespoke wedding invitation enquiry:\n\n` +
      `💍 Couple: ${submittedData.brideName} & ${submittedData.groomName}\n` +
      `📅 Date: ${submittedData.weddingDate}\n` +
      `📍 City: ${submittedData.destinationCity}\n` +
      `🎨 Preferred Suite: ${selectedTemplate.number} - ${selectedTemplate.name}\n` +
      `👥 Estimated Guests: ${submittedData.guestCount}\n` +
      `👤 Contact: ${submittedData.contactName} (${submittedData.contactPhone})\n\n` +
      `We would love to discuss custom design and WhatsApp invitation onboarding.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('catalogue')}
            className="inline-flex items-center space-x-1.5 text-xs font-serif text-burgundy-900 hover:text-gold-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to The Collection</span>
          </button>

          <span className="text-xs uppercase tracking-widest text-gold-800 font-sans font-semibold">
            Atelier Commission Desk
          </span>
        </div>

        {isSubmitted && submittedData ? (
          /* Confirmation State */
          <div className="bg-cream-50 border border-gold-400 rounded-3xl p-8 sm:p-14 shadow-royal text-center animate-fade-in relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-gold-100 border-2 border-gold-500 flex items-center justify-center text-burgundy-900 mx-auto mb-6 shadow-gold-subtle">
              <Check className="w-8 h-8 text-gold-700" />
            </div>

            <span className="text-xs uppercase tracking-[0.3em] text-gold-800 font-semibold block mb-2 font-serif">
              Shubh Aashirwad • Commission Request Prepared
            </span>

            <h2 className="font-serif-royal text-3xl sm:text-5xl text-burgundy-900 mb-4">
              Thank You, {submittedData.contactName}
            </h2>

            <p className="font-sans text-sm sm:text-base text-charcoal-800/80 max-w-xl mx-auto mb-8 leading-relaxed font-light">
              We have received your enquiry for the royal wedding of <strong className="text-burgundy-900 font-medium">{submittedData.brideName} &amp; {submittedData.groomName}</strong> in <strong className="text-burgundy-900 font-medium">{submittedData.destinationCity}</strong>.
            </p>

            {/* Summary Card */}
            <div className="max-w-xl mx-auto bg-cream-100/70 border border-gold-300/80 rounded-2xl p-6 text-left text-xs mb-8 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gold-200">
                <span className="text-charcoal-800/60 uppercase tracking-wider">Preferred Suite:</span>
                <span className="font-serif text-sm font-semibold text-burgundy-950">
                  {selectedTemplate.number} — {selectedTemplate.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-800/60 uppercase tracking-wider">Anticipated Date:</span>
                <span className="font-medium text-charcoal-800">{submittedData.weddingDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-800/60 uppercase tracking-wider">Guest Count:</span>
                <span className="font-medium text-charcoal-800">{submittedData.guestCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-800/60 uppercase tracking-wider">Destination:</span>
                <span className="font-medium text-charcoal-800">{submittedData.destinationCity}</span>
              </div>
            </div>

            {/* Frontend Demo Notice */}
            <div className="max-w-xl mx-auto p-4 mb-8 rounded-xl bg-amber-50/90 border border-amber-300 text-xs text-amber-950 text-left leading-relaxed">
              <span className="font-semibold block font-serif text-sm text-amber-900 mb-0.5">
                Frontend Verification Notice:
              </span>
              This enquiry form was fully validated and recorded in your local browser session. In the full production release, enquiries connect directly to our studio database and CRM. You can also connect immediately on WhatsApp using the button below.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleWhatsAppConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[#25D366] text-white font-medium text-sm hover:opacity-95 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect via WhatsApp Consultation</span>
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSubmittedData(null);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-gold-400 text-burgundy-900 text-xs font-serif tracking-wider uppercase hover:bg-cream-200 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* The Commission Enquiry Form */
          <div className="bg-cream-50 border border-gold-300/80 rounded-2xl sm:rounded-3xl p-4 sm:p-10 md:p-14 shadow-royal relative overflow-hidden">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-gold-700 font-semibold mb-2">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>Bespoke Digital Commission</span>
                <Sparkles className="w-4 h-4 text-gold-600" />
              </div>
              <h1 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-900 font-light mb-3 break-words">
                Begin Your Wedding Invitation Journey
              </h1>
              <p className="font-sans text-xs sm:text-sm text-charcoal-800/75 max-w-lg mx-auto font-light leading-relaxed">
                Tell us about your wedding vision, destination, and timeline. Our design directors will curate an invitation suite tailored around your story.
              </p>
              <RoyalDivider />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 text-xs" noValidate>
              {/* Couple Names */}
              <div>
                <h3 className="font-serif text-base sm:text-lg font-semibold text-burgundy-950 mb-3 flex items-center space-x-2">
                  <span>1. The Couple</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label htmlFor="brideName" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                      Bride's Full Name *
                    </label>
                    <input
                      id="brideName"
                      type="text"
                      placeholder="e.g. Aadhya Singhania"
                      value={formData.brideName}
                      onChange={(e) => {
                        setFormData({ ...formData, brideName: e.target.value });
                        if (errors.brideName) setErrors({ ...errors, brideName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                        errors.brideName ? 'border-red-400 bg-red-50/20' : 'border-gold-300'
                      }`}
                    />
                    {errors.brideName && (
                      <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.brideName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="groomName" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                      Groom's Full Name *
                    </label>
                    <input
                      id="groomName"
                      type="text"
                      placeholder="e.g. Veerendra Rathore"
                      value={formData.groomName}
                      onChange={(e) => {
                        setFormData({ ...formData, groomName: e.target.value });
                        if (errors.groomName) setErrors({ ...errors, groomName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                        errors.groomName ? 'border-red-400 bg-red-50/20' : 'border-gold-300'
                      }`}
                    />
                    {errors.groomName && (
                      <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.groomName}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Celebration Details */}
              <div className="pt-2">
                <h3 className="font-serif text-base sm:text-lg font-semibold text-burgundy-950 mb-3 flex items-center space-x-2">
                  <span>2. Celebration Details</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                  <div>
                    <label htmlFor="weddingDate" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                      Wedding Dates *
                    </label>
                    <input
                      id="weddingDate"
                      type="text"
                      placeholder="e.g. December 18 – 20, 2026"
                      value={formData.weddingDate}
                      onChange={(e) => {
                        setFormData({ ...formData, weddingDate: e.target.value });
                        if (errors.weddingDate) setErrors({ ...errors, weddingDate: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                        errors.weddingDate ? 'border-red-400 bg-red-50/20' : 'border-gold-300'
                      }`}
                    />
                    {errors.weddingDate && (
                      <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.weddingDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="destinationCity" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                      Destination City / Venue *
                    </label>
                    <input
                      id="destinationCity"
                      type="text"
                      placeholder="e.g. Udaipur, Rajasthan"
                      value={formData.destinationCity}
                      onChange={(e) => {
                        setFormData({ ...formData, destinationCity: e.target.value });
                        if (errors.destinationCity) setErrors({ ...errors, destinationCity: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                        errors.destinationCity ? 'border-red-400 bg-red-50/20' : 'border-gold-300'
                      }`}
                    />
                    {errors.destinationCity && (
                      <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.destinationCity}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="guestCount" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                      Estimated Guest Count
                    </label>
                    <select
                      id="guestCount"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gold-300 bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 min-h-[44px]"
                    >
                      <option value="Under 150 Guests">Intimate (Under 150 Guests)</option>
                      <option value="150 - 300 Guests">Classic (150 - 300 Guests)</option>
                      <option value="300 - 600 Guests">Grand (300 - 600 Guests)</option>
                      <option value="600 - 1200+ Guests">Royal Scale (600 - 1200+ Guests)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Template Suite */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-0">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-burgundy-950">
                    3. Preferred Design Suite
                  </h3>
                  <span className="text-[11px] text-gold-800 font-sans">
                    Selected: {selectedTemplate.number} — {selectedTemplate.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {templateRegistry.map((tpl) => {
                    const isSelected = formData.preferredTemplateId === tpl.id;
                    return (
                      <button
                        type="button"
                        key={tpl.id}
                        onClick={() => setFormData({ ...formData, preferredTemplateId: tpl.id })}
                        className={`p-2.5 rounded-xl border text-left transition-all min-h-[44px] ${
                          isSelected
                            ? 'border-gold-500 bg-gold-100/70 shadow-sm ring-1 ring-gold-500'
                            : 'border-gold-200 bg-white hover:border-gold-300'
                        }`}
                      >
                        <span className="font-serif font-bold text-xs text-burgundy-900 block truncate">
                          {tpl.number} {tpl.name}
                        </span>
                        <div className="flex items-center space-x-1 mt-1.5">
                          {tpl.palette.slice(0, 3).map((c) => (
                            <span
                              key={c.name}
                              className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Person */}
              <div className="pt-2">
                <h3 className="font-serif text-base sm:text-lg font-semibold text-burgundy-950 mb-3 flex items-center space-x-2">
                  <span>4. Your Contact Details</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                  <div>
                    <label htmlFor="contactName" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      placeholder="e.g. Aadhya Singhania"
                      value={formData.contactName}
                      onChange={(e) => {
                        setFormData({ ...formData, contactName: e.target.value });
                        if (errors.contactName) setErrors({ ...errors, contactName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                        errors.contactName ? 'border-red-400 bg-red-50/20' : 'border-gold-300'
                      }`}
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.contactName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.contactPhone}
                      onChange={(e) => {
                        setFormData({ ...formData, contactPhone: e.target.value });
                        if (errors.contactPhone) setErrors({ ...errors, contactPhone: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                        errors.contactPhone ? 'border-red-400 bg-red-50/20' : 'border-gold-300'
                      }`}
                    />
                    {errors.contactPhone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.contactPhone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.contactEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, contactEmail: e.target.value });
                        if (errors.contactEmail) setErrors({ ...errors, contactEmail: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                        errors.contactEmail ? 'border-red-400 bg-red-50/20' : 'border-gold-300'
                      }`}
                    />
                    {errors.contactEmail && (
                      <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.contactEmail}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bespoke Requirements Checkboxes */}
              <div className="pt-2">
                <h3 className="font-serif text-base sm:text-lg font-semibold text-burgundy-950 mb-2">
                  5. Desired Studio Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Multi-Day Ritual Timeline & Navigation',
                    'Custom WhatsApp Delivery Preview Cards',
                    'Guest RSVP, Attendance & Dietary Tracking',
                    'Ambient Sitar / Shehnai Audio Raga Soundscape',
                    'Custom Palace Monogram & Family Crest',
                    'Printed Stationery Matching & Physical Wax Seals',
                  ].map((service) => {
                    const isChecked = formData.servicesNeeded.includes(service);
                    return (
                      <label
                        key={service}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center space-x-2.5 transition-colors min-h-[44px] ${
                          isChecked
                            ? 'border-gold-400 bg-gold-50/70 text-burgundy-950'
                            : 'border-gold-200 bg-white text-charcoal-800/80'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleServiceToggle(service)}
                          className="rounded border-gold-400 text-burgundy-900 focus:ring-gold-500 w-4 h-4"
                        />
                        <span className="font-sans text-xs">{service}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="notes" className="block uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                  Additional Vision, Traditions, or Special Requests (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Share any special family traditions, multi-language needs, or aesthetic preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-300 bg-white text-base sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 sm:pt-4 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 sm:space-x-3 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-burgundy-gradient text-gold-200 font-serif tracking-wider text-sm sm:text-base md:text-lg shadow-royal hover:shadow-gold-glow transition-all border border-gold-400/50 min-h-[48px]"
                >
                  <span>Submit Commission Request</span>
                  <Send className="w-4 h-4 text-gold-400" />
                </button>
                <p className="text-[10px] sm:text-[11px] font-sans text-charcoal-800/50 uppercase tracking-widest mt-3">
                  Our atelier concierge responds within 24 hours
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
