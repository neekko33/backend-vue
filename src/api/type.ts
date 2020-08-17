import request from "../utils/request";
import { TypeData } from "@/interface";

export function getTypeList() {
  return request({
    url: "/type",
    method: "get"
  });
}

export function updateType(id: number, params: TypeData) {
  return request({
    url: "/type/" + id,
    method: "put",
    data: params
  });
}

export function addType(params: TypeData) {
  return request({
    url: "/type",
    method: "post",
    data: params
  });
}

export function deleteType(id: number) {
  return request({
    url: "/type/" + id,
    method: "delete"
  });
}
