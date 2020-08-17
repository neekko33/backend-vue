import request from '../utils/request';
import { LoginForm, Passwords, UserData } from '@/interface';

// 用户登陆
export function login(params: LoginForm) {
  return request({
    url: '/login',
    method: 'post',
    data: params,
  });
}

// 获取全部用户信息
export function getUserList() {
  return request({
    url: '/user',
    method: 'get',
  });
}

// 获取指定用户信息
export function getUserById(id: number) {
  return request({
    url: '/user/' + id,
    method: 'get',
  });
}

// 修改用户信息
export function updateUser(id: number, params: UserData) {
  return request({
    url: '/user/' + id,
    method: 'put',
    data: params,
  });
}

// 修改密码
export function updatePassword(id: string, params: Passwords) {
  return request({
    url: '/password/' + id,
    method: 'put',
    data: params,
  });
}

// 删除用户
export function deleteUser(id: string) {
  return request({
    url: '/user/' + id,
    method: 'delete',
  });
}

// 新增用户
export function createUser(params:UserData) {
  return request({
    url: '/user',
    method: 'post',
    data: params
  });
}
