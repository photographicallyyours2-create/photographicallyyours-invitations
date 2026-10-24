import React, { useState } from 'react';
import { WeddingData, RsvpFormData } from '../types/wedding';
import { RoyalDivider } from './JaaliDecor';
import { Check, HeartHandshake, AlertCircle, Send, Share2, Phone, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RsvpSectionProps {
  data: WeddingData;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ data }) => {
  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: '',
    email: '',
    phone: '',
    attending: 'attending',
    guestCount: 2,
    attendingEvents: data.events.map((e) => e.id),
    dietaryRequirements: 'Vegetarian',
    dietaryDetails: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<RsvpFormData | null>(null);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      newErrors.phone = 'Please provide a valid WhatsApp phone number.';
    }

    if (formData.attending === 'attending' && formData.attendingEvents.length === 0) {
      newErrors.events = 'Please select at least one celebration event you plan to attend.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Trigger celebratory royal confetti
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#5E1924', '#FAF6F0', '#E8D5CE'],
      });
    } catch {
      // Fallback
    }

    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  const handleEventCheckboxToggle = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.attendingEvents.includes(eventId);
      const updated = exists
        ? prev.attendingEvents.filter((id) => id !== eventId)
        : [...prev.attendingEvents, eventId];
      return { ...prev, attendingEvents: updated };
    });
  };

  const handleWhatsAppShare = () => {
    if (!submittedData) return;
    const attendingText =
      submittedData.attending === 'attending'
        ? `Delighted to attend ${data.brideName} & ${data.groomName}'s Royal Wedding with ${submittedData.guestCount} guests!`
        : `Warm wishes to ${data.brideName} & ${data.groomName}. Sadly unable to attend in person, sending all our blessings!`;

    const text = encodeURIComponent(
      `💍 Wedding RSVP for ${submittedData.fullName}\n${attendingText}\n#${data.hashtag.replace('#', '')}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="rsvp-section" className="py-14 sm:py-20 px-3 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10 sm:mb-12">
        <div className="flex items-center justify-center space-x-2 text-gold-600 mb-2">
          <HeartHandshake className="w-4 h-4" />
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold">
            Response Requested
          </span>
          <HeartHandshake className="w-4 h-4" />
        </div>
        <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-burgundy-900 mt-1 mb-2 sm:mb-3 break-words">
          Kindly Grace Us With Your Presence
        </h2>
        <p className="text-xs sm:text-base text-charcoal-800/70 max-w-md mx-auto font-sans font-light">
          Kindly confirm your attendance by <span className="font-semibold text-burgundy-900">{data.rsvpDeadline}</span> to help us arrange your royal hospitality.
        </p>
        <RoyalDivider />
      </div>

      <div className="bg-cream-50 border border-gold-400/60 rounded-2xl sm:rounded-3xl p-4 sm:p-10 md:p-12 shadow-royal relative">
        {/* Inner gold border */}
        <div className="absolute inset-1.5 sm:inset-3 rounded-xl sm:rounded-[22px] border border-gold-300/30 pointer-events-none" />

        {isSubmitted && submittedData ? (
          /* Confirmation State */
          <div className="text-center py-6 sm:py-8 px-2 sm:px-4 animate-fade-in relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold-100 border-2 border-gold-400 flex items-center justify-center text-burgundy-900 mx-auto mb-4 sm:mb-5 shadow-gold-subtle">
              <Check className="w-7 h-7 sm:w-8 sm:h-8 text-gold-700" />
            </div>

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-700 font-semibold block mb-1">
              Dhanyavaad • With Sincere Gratitude
            </span>

            <h3 className="font-serif-royal text-2xl sm:text-4xl text-burgundy-900 mb-2 sm:mb-3 break-words">
              {submittedData.attending === 'attending'
                ? 'We Look Forward to Welcoming You!'
                : 'Thank You for Your Warm Wishes'}
            </h3>

            <p className="font-sans text-xs sm:text-base text-charcoal-800/80 max-w-lg mx-auto mb-5 sm:mb-6 leading-relaxed">
              {submittedData.attending === 'attending'
                ? `Thank you, ${submittedData.fullName}. Your confirmation for ${submittedData.guestCount} guest(s) has been noted for the ${data.brideName} & ${data.groomName} wedding celebrations.`
                : `Thank you, ${submittedData.fullName}. We will miss your physical presence and carry your loving blessings in our hearts.`}
            </p>

            {/* Prototype notice label */}
            <div className="max-w-md mx-auto p-3 sm:p-3.5 mb-6 sm:mb-8 rounded-xl bg-gold-100/70 border border-gold-300 text-xs text-charcoal-800/80 text-left">
              <span className="font-semibold text-burgundy-900 block mb-0.5">Prototype Demo Notice:</span>
              Validation passed successfully. This response is stored in your current browser session. In the full product, responses sync to a secure wedding database.
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={handleWhatsAppShare}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-medium text-sm hover:opacity-95 shadow-md transition-all min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share RSVP on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSubmittedData(null);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-gold-400/80 text-burgundy-900 text-xs sm:text-sm font-serif hover:bg-cream-100 transition-colors min-h-[44px]"
              >
                Edit or Submit Another RSVP
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10" noValidate>
            {/* Attendance Choice */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gold-800 font-semibold mb-2 sm:mb-3">
                Will you be joining our celebration in {data.venueCity}? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'attending' })}
                  className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center justify-between min-h-[44px] ${
                    formData.attending === 'attending'
                      ? 'border-gold-500 bg-gold-50/80 shadow-gold-subtle text-burgundy-950 ring-1 ring-gold-500'
                      : 'border-gold-200/70 bg-cream-100/50 text-charcoal-800 hover:border-gold-300'
                  }`}
                >
                  <div>
                    <span className="font-serif text-base sm:text-lg font-medium block">Joyfully Accepts</span>
                    <span className="text-[11px] sm:text-xs text-charcoal-800/70">Will celebrate with you in {data.venueCity}</span>
                  </div>
                  {formData.attending === 'attending' && (
                    <div className="w-6 h-6 rounded-full bg-burgundy-900 text-gold-200 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'declined' })}
                  className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center justify-between min-h-[44px] ${
                    formData.attending === 'declined'
                      ? 'border-burgundy-400 bg-burgundy-50/40 shadow-sm text-burgundy-950 ring-1 ring-burgundy-500'
                      : 'border-gold-200/70 bg-cream-100/50 text-charcoal-800 hover:border-gold-300'
                  }`}
                >
                  <div>
                    <span className="font-serif text-base sm:text-lg font-medium block">Regretfully Declines</span>
                    <span className="text-[11px] sm:text-xs text-charcoal-800/70">Sending blessings from afar</span>
                  </div>
                  {formData.attending === 'declined' && (
                    <div className="w-6 h-6 rounded-full bg-burgundy-900 text-gold-200 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Guest Name & Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              <div>
                <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                  Guest Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Maharani Gayatri Devi / Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-cream-100/40 text-charcoal-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors ${
                    errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-gold-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-cream-100/40 text-charcoal-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors ${
                    errors.email ? 'border-red-400 bg-red-50/30' : 'border-gold-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                  WhatsApp Contact Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-cream-100/40 text-charcoal-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors ${
                    errors.phone ? 'border-red-400 bg-red-50/30' : 'border-gold-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {formData.attending === 'attending' && (
                <div>
                  <label htmlFor="guestCount" className="block text-xs uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                    Number of Guests Attending *
                  </label>
                  <select
                    id="guestCount"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gold-300 bg-cream-100/40 text-charcoal-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 min-h-[44px]"
                  >
                    <option value={1}>1 Guest (Just myself)</option>
                    <option value={2}>2 Guests (Me & +1)</option>
                    <option value={3}>3 Guests (Family)</option>
                    <option value={4}>4 Guests (Family)</option>
                    <option value={5}>5 Guests (Family)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Events Selection (only if attending) */}
            {formData.attending === 'attending' && (
              <div className="pt-2">
                <label className="block text-xs uppercase tracking-wider text-gold-800 font-semibold mb-2">
                  Which celebrations will you attend? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {data.events.map((event) => {
                    const isChecked = formData.attendingEvents.includes(event.id);
                    return (
                      <label
                        key={event.id}
                        className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-colors min-h-[44px] ${
                          isChecked
                            ? 'border-gold-400 bg-gold-50/60 text-burgundy-950'
                            : 'border-gold-200 bg-cream-100/30 text-charcoal-800/80'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleEventCheckboxToggle(event.id)}
                          className="mt-0.5 rounded border-gold-400 text-burgundy-900 focus:ring-gold-500 w-4 h-4"
                        />
                        <div className="text-xs">
                          <span className="font-semibold block">{event.title}</span>
                          <span className="text-charcoal-800/60 font-light">{event.date}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.events && (
                  <p className="mt-2 text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.events}</span>
                  </p>
                )}
              </div>
            )}

            {/* Dietary Requirements */}
            {formData.attending === 'attending' && (
              <div>
                <label htmlFor="dietaryRequirements" className="block text-xs uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                  Dietary Preferences & Royal Hospitality
                </label>
                <select
                  id="dietaryRequirements"
                  value={formData.dietaryRequirements}
                  onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-300 bg-cream-100/40 text-charcoal-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 min-h-[44px]"
                >
                  <option value="Vegetarian">Pure Vegetarian (Sattvic & Indian Specialties)</option>
                  <option value="Jain">Pure Jain (No Root Vegetables/Garlic/Onion)</option>
                  <option value="Vegan">Vegan (Plant Based)</option>
                  <option value="Standard">No Specific Restrictions</option>
                  <option value="Allergies">Specific Food Allergies (specify below)</option>
                </select>

                {formData.dietaryRequirements === 'Allergies' && (
                  <input
                    type="text"
                    placeholder="Please specify any allergies (e.g. Nut allergy, Gluten sensitivity)"
                    value={formData.dietaryDetails || ''}
                    onChange={(e) => setFormData({ ...formData, dietaryDetails: e.target.value })}
                    className="mt-2 w-full px-4 py-2.5 rounded-xl border border-gold-300 bg-cream-100/40 text-base sm:text-xs text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                )}
              </div>
            )}

            {/* Heartfelt Note / Wishes */}
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-charcoal-800/80 font-medium mb-1.5">
                Blessings & Warm Wishes for {data.brideName} &amp; {data.groomName} (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                placeholder="Share your prayers, memories or excitement for the royal union..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gold-300 bg-cream-100/40 text-charcoal-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-3 text-center">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 sm:space-x-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-burgundy-gradient text-gold-200 font-serif tracking-wider text-base sm:text-lg shadow-royal hover:shadow-gold-glow transition-all duration-300 border border-gold-400/50 min-h-[48px]"
              >
                <span>Confirm Wedding RSVP</span>
                <Send className="w-4 h-4 text-gold-400" />
              </button>
              <p className="text-[10px] sm:text-[11px] font-sans text-charcoal-800/50 uppercase tracking-widest mt-3">
                Phase 1 Prototype Demo • Client Validation Active
              </p>
            </div>
          </form>
        )}

        {/* Direct Family Contact & WhatsApp RSVP Hub */}
        {data.rsvpContacts && data.rsvpContacts.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gold-300/60 text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold-800 font-semibold block mb-2">
              Direct Family RSVP &amp; Coordination
            </span>
            <p className="text-xs text-charcoal-800/70 mb-4 max-w-md mx-auto">
              For personal confirmations, travel coordination or blessings, connect directly with the host families:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {data.rsvpContacts.map((contact, idx) => {
                const cleanPhone = contact.phone.replace(/[^0-9+]/g, '');
                const waUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
                  contact.whatsappMessage || `Dear ${contact.name}, Congratulations on ${data.brideName} & ${data.groomName}'s wedding!`
                )}`;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-cream-100/80 border border-gold-300/60 flex flex-col justify-between text-left"
                  >
                    <div>
                      <div className="font-serif font-semibold text-burgundy-950 text-sm">
                        {contact.name}
                      </div>
                      {contact.relation && (
                        <div className="text-[10px] text-gold-800 uppercase tracking-wider">
                          {contact.relation}
                        </div>
                      )}
                      <div className="text-xs text-charcoal-800 font-medium mt-1">
                        {contact.phone}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-gold-200/50">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-burgundy-900 text-gold-100 text-[11px] font-sans inline-flex items-center justify-center space-x-1 hover:bg-burgundy-800 transition-colors min-h-[32px]"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2 rounded-lg bg-[#25D366] text-white text-[11px] font-sans inline-flex items-center justify-center space-x-1 hover:opacity-95 transition-opacity min-h-[32px]"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Compliments & Greetings Line */}
        {data.complimentsFrom && (
          <div className="mt-6 text-center text-xs font-serif italic text-burgundy-900/80">
            {data.complimentsFrom}
          </div>
        )}
      </div>
    </section>
  );
};
