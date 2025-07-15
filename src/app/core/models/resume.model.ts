export interface Resume {
  basics: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone?: string;
    summary?: string;
    links?: string[];
  };
  experience: {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    summary?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    startDate: Date;
    endDate?: Date;
  }[];
  skills: string[];
}
