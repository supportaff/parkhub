// =============================================================================
// PARKHUB - UTILITY FUNCTIONS
// =============================================================================

import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function calculateCommission(amount: number, rate: number = 0.15): number {
  return Math.round(amount * rate);
}

export function calculateOwnerPayout(amount: number, rate: number = 0.15): number {
  return Math.round(amount * (1 - rate));
}

export function calculateBookingAmount(
  price: number,
  duration: number,
  pricingType: 'HOURLY' | 'DAILY' | 'MONTHLY'
): number {
  return price * duration;
}

export function getVehicleTypeLabel(type: string): string {
  const map: Record<string, string> = {
    '2WHEELER': '2 Wheeler',
    '3WHEELER': '3 Wheeler',
    '4WHEELER': '4 Wheeler',
  };
  return map[type] || type;
}

export function getVehicleTypeIcon(type: string): string {
  const map: Record<string, string> = {
    '2WHEELER': '🏍️',
    '3WHEELER': '🛺',
    '4WHEELER': '🚗',
  };
  return map[type] || '🚗';
}

export function getAmenityLabel(amenity: string): string {
  const map: Record<string, string> = {
    CCTV: 'CCTV',
    SECURITY_GUARD: 'Security Guard',
    COVERED: 'Covered Parking',
    GATED: 'Gated Entry',
    LIGHTING: 'Well Lit',
    EV_CHARGING: 'EV Charging',
    ACCESS_24_7: '24/7 Access',
    WASHROOM: 'Washroom',
  };
  return map[amenity] || amenity;
}

export function getAmenityIcon(amenity: string): string {
  const map: Record<string, string> = {
    CCTV: '📹',
    SECURITY_GUARD: '💂',
    COVERED: '🏠',
    GATED: '🚪',
    LIGHTING: '💡',
    EV_CHARGING: '⚡',
    ACCESS_24_7: '🕐',
    WASHROOM: '🚻',
  };
  return map[amenity] || '✅';
}

export function getBookingStatusColor(status: string): string {
  const map: Record<string, string> = {
    ACTIVE: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    NO_SHOW: 'bg-yellow-100 text-yellow-700',
  };
  return map[status] || 'bg-slate-100 text-slate-700';
}

export function getPaymentStatusColor(status: string): string {
  const map: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    COMPLETED: 'bg-green-100 text-green-700',
    FAILED: 'bg-red-100 text-red-700',
    REFUNDED: 'bg-purple-100 text-purple-700',
  };
  return map[status] || 'bg-slate-100 text-slate-700';
}

export function getListingStatusColor(status: string): string {
  const map: Record<string, string> = {
    DRAFT: 'bg-slate-100 text-slate-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  };
  return map[status] || 'bg-slate-100 text-slate-700';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function generateBookingId(): string {
  return `BK${Date.now().toString(36).toUpperCase()}`;
}

export function validateIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

export function validateVehicleNumber(number: string): boolean {
  // Indian vehicle number format: AB12CD3456 or AB12C1234
  return /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(number.toUpperCase().replace(/\s/g, ''));
}

export function maskPhone(phone: string): string {
  if (phone.length < 4) return phone;
  return `${phone.substring(0, 2)}****${phone.substring(phone.length - 2)}`;
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

export function generateStarRating(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '⭐'.repeat(full) + (half ? '½' : '');
}
