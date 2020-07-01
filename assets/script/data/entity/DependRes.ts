import { url } from "inspector";

export default class DependRes{
    url:string;
    type:typeof cc.Asset;
    dir?:boolean=false;
}