// This file is auto-generated by @hey-api/openapi-ts

export type CreateCourseDto = {
    /**
     * 코스 제목
     */
    title: string;
};

export type Account = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    user: User;
};

export type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: string;
    user: User;
};

export type LectureActivity = {
    id: string;
    user: User;
    userId: string;
    lecture: Lecture;
    lectureId: string;
    progress: number;
    isCompleted: boolean;
    lastWatchedAt?: string;
    createdAt: string;
    updatedAt: string;
};

export type Lecture = {
    id: string;
    title: string;
    description?: string;
    order: number;
    duration?: number;
    isPreview: boolean;
    section: Section;
    course: Course;
    videoStorageInfo?: {
        [key: string]: unknown;
    };
    createdAt: string;
    updatedAt: string;
    sectionId: string;
    courseId: string;
    activities: Array<LectureActivity>;
};

export type Section = {
    id: string;
    title: string;
    description?: string;
    order: number;
    course: Course;
    createdAt: string;
    updatedAt: string;
    courseId: string;
    lectures: Array<Lecture>;
};

export type CourseCategory = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    courses: Array<Course>;
};

export type Enrollment = {
    id: string;
    user: User;
    userId: string;
    course: Course;
    courseId: string;
    enrolledAt: string;
    createdAt: string;
    updatedAt: string;
};

export type CourseReview = {
    id: string;
    content: string;
    rating: number;
    user: User;
    course: Course;
    instructorReply?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    courseId: string;
};

export type CourseComment = {
    id: string;
    content: string;
    user: User;
    question: CourseQuestion;
    userId: string;
    courseQuestionId: string;
};

export type CourseQuestion = {
    id: string;
    title: string;
    content: string;
    user: User;
    course: Course;
    createdAt: string;
    updatedAt: string;
    userId: string;
    courseId: string;
    comments: Array<CourseComment>;
};

export type Course = {
    id: string;
    slug: string;
    title: string;
    shortDescription?: string;
    description?: string;
    thumbnailUrl?: string;
    price: number;
    discountPrice: number;
    level: string;
    status: string;
    instructor: User;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    instructorId: string;
    sections: Array<Section>;
    lectures: Array<Lecture>;
    categories: Array<CourseCategory>;
    enrollments: Array<Enrollment>;
    reviews: Array<CourseReview>;
    questions: Array<CourseQuestion>;
};

export type User = {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: string;
    hashedPassword?: string;
    image?: string;
    bio?: string;
    accounts: Array<Account>;
    sessions: Array<Session>;
    courses: Array<Course>;
    courseEnrollments: Array<Enrollment>;
    courseReviews: Array<CourseReview>;
    courseQuestions: Array<CourseQuestion>;
    courseComments: Array<CourseComment>;
    lectureActivities: Array<LectureActivity>;
};

export type UpdateCourseDto = {
    /**
     * 코스 제목
     */
    title?: string;
    /**
     * 코스 짧은 설명
     */
    shortDescription?: string;
    /**
     * 코스 설명
     */
    description?: string;
    /**
     * 코스 썸네일 URL
     */
    thumbnailUrl?: string;
    /**
     * 코스 가격
     */
    price?: number;
    /**
     * 코스 할인 가격
     */
    discountPrice?: number;
    /**
     * 코스 레벨
     */
    level?: string;
    /**
     * 코스 상태
     */
    status?: string;
    /**
     * 코스 카테고리 ID 목록
     */
    categoryIds?: Array<string>;
};

export type AppControllerGetHelloData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/';
};

export type AppControllerGetHelloResponses = {
    200: unknown;
};

export type AppControllerTestUserData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/test';
};

export type AppControllerTestUserResponses = {
    200: unknown;
};

export type CoursesControllerFindAllCoursesData = {
    body?: never;
    path?: never;
    query?: {
        title?: string;
        level?: string;
        caregoryId?: string;
        skip?: number;
        take?: number;
    };
    url: '/courses';
};

export type CoursesControllerFindAllCoursesResponses = {
    /**
     * 코스 목록을 조회합니다.
     */
    200: Array<Course>;
};

export type CoursesControllerFindAllCoursesResponse = CoursesControllerFindAllCoursesResponses[keyof CoursesControllerFindAllCoursesResponses];

export type CoursesControllerCreateCourseData = {
    body: CreateCourseDto;
    path?: never;
    query?: never;
    url: '/courses';
};

export type CoursesControllerCreateCourseResponses = {
    /**
     * 코스를 생성합니다.
     */
    200: Course;
};

export type CoursesControllerCreateCourseResponse = CoursesControllerCreateCourseResponses[keyof CoursesControllerCreateCourseResponses];

export type CoursesControllerDeleteCourseData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/courses/{id}';
};

export type CoursesControllerDeleteCourseResponses = {
    /**
     * 코스 정보를 삭제합니다.
     */
    200: Course;
};

export type CoursesControllerDeleteCourseResponse = CoursesControllerDeleteCourseResponses[keyof CoursesControllerDeleteCourseResponses];

export type CoursesControllerFindOneCourseData = {
    body?: never;
    path: {
        id: string;
    };
    query?: {
        /**
         * include 속성에 원하는 관계를 추가할 수 있습니다.
         */
        include?: string;
    };
    url: '/courses/{id}';
};

export type CoursesControllerFindOneCourseResponses = {
    /**
     * 코스 상세 정보를 조회합니다.
     */
    200: Course;
};

export type CoursesControllerFindOneCourseResponse = CoursesControllerFindOneCourseResponses[keyof CoursesControllerFindOneCourseResponses];

export type CoursesControllerUpdateCourseData = {
    body: UpdateCourseDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/courses/{id}';
};

export type CoursesControllerUpdateCourseResponses = {
    /**
     * 코스 정보를 수정합니다.
     */
    200: Course;
};

export type CoursesControllerUpdateCourseResponse = CoursesControllerUpdateCourseResponses[keyof CoursesControllerUpdateCourseResponses];

export type ClientOptions = {
    baseUrl: string;
};