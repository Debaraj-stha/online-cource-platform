import type { Course } from "../@types/course";

export const initialCourse: Course = {
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    price: 0,
    _id:"",
    priceUnit:"USD",

    // optional values with defaults
    instructor: null,
    discount: null,
    isFree: false,
    discountReason: "",

    rating: null,
    totalEnrolled: null,
    views: 0,
    likes: 0,
    reviewsCount: 0,

    category: "other",
    level: null,
    language: "english",

    duration: "",
    lessonCount: 0,
    prerequisites: [],
    whatYouWillLearn: [],
    resources: [],
    certificateAvailable: false,

    createdAt: "",
    updatedAt: "",
    isPublished: false,
    publishedAt: "",
    module: [],
    tags: [],

    faq: [],
    preview: "",
    targetedAudiences: [],
    certificate: null,
};
