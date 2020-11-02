export interface LoginForm {
  username: string;
  password: string;
}

export interface TypeData {
  id?: number;
  typeName: string;
}

export interface MessageData {
  id?: number;
  editorName: string;
  content: string;
  createTime: number;
}

export interface ArticleData {
  id?: number;
  title: string;
  addTime: number;
  userId: number;
  typeId: number;
  content: string;
  introduce: string;
}

export interface ArticleListData {
  id: number;
  addTime: number;
  username: string;
  typeName: string;
}

export interface UserData {
  id?: number;
  username?: string;
  nickname: string;
  avatar?: string;
  tags: string;
  address: string;
  introduce: string;
  password?: string;
}

export interface Passwords {
  oldPassword: string;
  newPassword: string;
}

export interface UploadFile {
  raw: File
}

export interface StudentInfo {
  id: number|null;
  signUpTime: string;
  consultant: string;
  consultingAssistant: string;
  enterTime: string;
  enterClass: string;
  hasUpdate: string;
  studentName: string;
  phoneNum: string;
  idCard: string;
  lessonName: string;
  specialComment: string;
  majorCost: string;
  beforeCost: string;
  discount: string;
  cost: string;
  payment: string;
  arrears: string;
  receiptNum: string;
  addCost: string;
  addPayment: string;
  addReceiptNum: string;
  addTime: string;
  addTeacher: string;
}