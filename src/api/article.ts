import request from "../utils/request";
import { ArticleData } from "../interface";

export function getArticleList(pageNum: number, pageSize: number) {
  return request({
    url: `/article?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
}

export function getArticleById(id: number) {
  return request({
    url: "/article/" + id,
    method: "get"
  });
}

export function addArticle(params: ArticleData) {
  return request({
    url: "/article",
    method: "post",
    data: params
  });
}

export function updateArticle(id: number, params: ArticleData) {
  return request({
    url: "/article/" + id,
    method: "put",
    data: params
  });
}

export function deleteArticle(id: number) {
  return request({
    url: "/article/" + id,
    method: "delete"
  });
}

export function uploadImage(params: FormData) {
  return request({
    url: "/file",
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    data: params
  });
}
