import axios from 'axios';
import { StudentInfo } from '@/interface';

const baseUrl = 'http://localhost:7002/student';
// const baseUrl = 'http://212.64.78.155:7002/student';

export const getHistory = () => {
  return axios({
    url: baseUrl + '/history',
    method: 'get',
  });
};

export const getStudentInfo = () => {
  return axios({
    url: baseUrl + `/info`,
    method: 'get',
  });
};

export const getStudentByNum = (phoneNum: string) => {
  return axios({
    url: baseUrl + `/info/${phoneNum}`,
    method: 'get',
  });
};

export const updateHistory = (stuList: StudentInfo[]) => {
  return axios({
    url: baseUrl + '/history',
    method: 'post',
    data: stuList,
  });
};

export const clearHistory = () => {
  return axios({
    url: baseUrl + '/history',
    method: 'delete',
  });
};

export const uploadFile = (file: any) => {
  return axios({
    url: baseUrl + '/info',
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data: file,
  });
};

export const readFile = (endNum: string, param: any) => {
  return axios({
    url: baseUrl + `/info/${endNum}`,
    method: 'post',
    data: param,
  });
};

export const addTemporary = (stu: StudentInfo) => {
  return axios({
    url: baseUrl + '/temporary',
    method: 'post',
    data: stu,
  });
};
