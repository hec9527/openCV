export type AnyFunction = (...args: any) => any;
export type AnyObject = { [K in string | number | symbol]: any };

export interface BaseInfo {
  modelType: 'baseInfo';
  name: string;
  birthDayOrAge: string;
  phone: string;
  email: string;
  location: string;
  intentionPosition: string;
  intentCity: string;
  avatar?: string;
  workStatus: string;
  minSalary: string;
  maxSalary?: string;
}

export interface EducationCareer {
  /** 学校名称 */
  school: string;
  major: string;
  educationalBackground: string;
  /** 学院 */
  college?: string;
  /** 非/全日制 */
  educationalType?: string;
  schoolTags?: string[];
  city?: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface Education {
  modelType: 'education';
  career: EducationCareer[];
}

export interface WorkCareer {
  companyName: string;
  position: string;
  department: string;
  city?: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface WorkInfo {
  modelType: 'workInfo';
  career: WorkCareer[];
}

export interface OtherCareer {
  modelType: 'otherCareer';
  organizationOrActiveName: string;
  role: string;
  department?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
}

export interface OtherSkill {
  modelType: 'otherSkill';
  professional: string[];
  universal: string[];
  Certificate: string[];
  language: string[];
  Hobby: string[];
}

export interface ProjectCareer {
  modelType: 'projectCareer';
  projectName: string;
  role: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface SelfEvaluation {
  modelType: 'selfEvaluation';
  description: string;
}

export type CVModel =
  | BaseInfo
  | Education
  | WorkInfo
  | ProjectCareer
  | OtherCareer
  | OtherSkill
  | (SelfEvaluation & { layout?: string });

export type CVInfo = CVModel[];

export type ModelKey = CVModel['modelType'];
