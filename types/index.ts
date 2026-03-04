// =============================================================================
// PARKHUB - GLOBAL TYPE DEFINITIONS
// =============================================================================

export type UserType = 'LAND_OWNER' | 'VEHICLE_OWNER' | 'ADMIN';
export type VehicleType = '2WHEELER' | '3WHEELER' | '4WHEELER';
export type PricingType = 'HOURLY' | 'DAILY' | 'MONTHLY';
export type BookingStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type ListingStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type KYCStatus = 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type PayoutStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface User {
  _id: string;
  email: string;
  phone: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  userType: UserType;
  profile: {
    fullName: string;
    profileImage?: string;
  };
  address?: Address;
  kyc: {
    status: KYCStatus;
    documentType?: string;
    documentUrl?: string;
    verificationDate?: string;
  };
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
  rating: number;
  totalReviews: number;
  createdAt: string;
  isActive: boolean;
}

export interface Address {
  street: string;
  area?: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ParkingSpace {
  _id: string;
  landOwnerId: string;
  landOwner?: User;
  title: string;
  description: string;
  address: Address;
  photos: string[];
  vehicleTypes: VehicleType[];
  totalSlots: number;
  availability: {
    available2Wheeler: number;
    available3Wheeler: number;
    available4Wheeler: number;
  };
  pricing: {
    hourly?: number;
    daily?: number;
    monthly?: number;
  };
  amenities: Amenity[];
  rules?: string;
  rating: number;
  reviewCount: number;
  status: ListingStatus;
  isActive: boolean;
  createdAt: string;
  distance?: number; // km from search location
}

export type Amenity =
  | 'CCTV'
  | 'SECURITY_GUARD'
  | 'COVERED'
  | 'GATED'
  | 'LIGHTING'
  | 'EV_CHARGING'
  | 'ACCESS_24_7'
  | 'WASHROOM';

export interface Vehicle {
  vehicleNumber: string;
  vehicleType: VehicleType;
  vehicleModel: string;
}

export interface Booking {
  _id: string;
  parkingSpaceId: string;
  parkingSpace?: ParkingSpace;
  vehicleOwnerId: string;
  vehicleOwner?: User;
  landOwnerId: string;
  vehicle: Vehicle;
  checkIn: string;
  checkOut: string;
  pricingType: PricingType;
  duration: number;
  basePrice: number;
  platformCommission: number;
  ownerPayout: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  paymentId?: string;
  notes?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  bookingId: string;
  parkingSpaceId: string;
  reviewedBy: string;
  reviewer?: User;
  rating: number;
  title?: string;
  comment: string;
  photos?: string[];
  createdAt: string;
}

export interface Payout {
  _id: string;
  landOwnerId: string;
  amount: number;
  currency: string;
  payoutStatus: PayoutStatus;
  bookings: string[];
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
  };
  transactionId?: string;
  requestedAt: string;
  completedAt?: string;
}

export interface SearchFilters {
  city?: string;
  lat?: number;
  lng?: number;
  radius?: number; // km
  vehicleType?: VehicleType;
  minPrice?: number;
  maxPrice?: number;
  pricingType?: PricingType;
  amenities?: Amenity[];
}

export interface AdminAnalytics {
  totalBookings: number;
  totalRevenue: number;
  platformCommission: number;
  activeUsers: number;
  landOwners: number;
  vehicleOwners: number;
  pendingKYC: number;
  pendingListings: number;
  bookingsByCity: { city: string; count: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  topParkingSpaces: { space: ParkingSpace; bookings: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
