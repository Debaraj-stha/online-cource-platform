export interface InstructorCertificate {
    id: string
    title: string
    issuedBy: string
    date: string
    imageUrl: string | null
}

export interface Instructor {
    name: string;
    title?: string; // e.g., "Senior Web Developer"
    bio?: string;
    profilePicture?: string | null; // profile image
    specialization?: string
    // Teaching stats
    students?: number;
    courses?: number;
    experience?: number; // in years
    rating?: number;
    certificates?: InstructorCertificate,
    socialLinks: [{ platform: string }]
}
