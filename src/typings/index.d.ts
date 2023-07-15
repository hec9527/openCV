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
  intentionSalary: string;
  intentCity: string;
  avatar?: string;
  workStatus: string;
  minSalary: string;
  maxSalary?: string;
}

export interface Education {
  modelType: 'education';
  school: string;
  major: string;
  educationalBackground: string;
  /** 非/全日制 */
  educationalType: string;
  schoolTags: string[];
  startTime: string;
  endTime: string;
  description: string;
}

export interface WorkCareer {
  modelType: 'workCareer';
  companyName: string;
  position: string;
  department: string;
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
  | WorkCareer
  | OtherCareer
  | OtherSkill
  | ProjectCareer
  | (SelfEvaluation & { layout?: string });

export type CVInfo = CVModel[];

export type ModelKey = CVModel['modelType'];
