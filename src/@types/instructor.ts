export interface InstructorCertificate {
    id: string
    title: string
    issuedBy: string
    date: string
    imageUrl: string|null
}

export interface Instructor {
    name: string;
    title?: string; // e.g., "Senior Web Developer"
    bio?: string;
    profile?: string | null; // profile image
    email?: string | null;
    phone?: string | null;
    linkedin?: string;
    twitter?: string;
    website?: string;
    facebook?: string | null

    // Teaching stats
    students?: number;
    courses?: number;
    experience?: number; // in years
    rating?: number;
    certificates?: InstructorCertificate
}
