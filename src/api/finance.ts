import axios from 'axios';
import { StudentInfo } from '@/interface';

// const baseUrl = 'http://localhost:5000/student/';
const baseUrl = 'https://mwwow.com:7004/student/';


export const getStudentByNum = (phoneNum: string) => {
  return axios({
    url: baseUrl + `info/${phoneNum}`,
    method: 'get',
  });
};

export const uploadFile = (file: any, endNum: string) => {
  return axios({
    url: baseUrl + `info/${endNum}`,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data: file,
  });
};


export const addTemporary = (stu: StudentInfo) => {
  return axios({
    url: baseUrl + 'temporary',
    method: 'post',
    data: stu,
  });
};
