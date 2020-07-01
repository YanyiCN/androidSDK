import DependRes from "../data/entity/DependRes";
import ViewUtil from "./ViewUtil";
import mlog from "./LogUtil";
import ComUtil from "./ComUtil";
import PromiseUtil from "./PromiseUtil";




export default class ResUtil {
    static loadAuto(resources: string | string[] | { uuid?: string, url?: string, type?: string }, completeCallback?: Function): Promise<any>;
    static loadAuto(resources: string | string[] | { uuid?: string, url?: string, type?: string }, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback?: Function | null): Promise<any>;
    static loadAuto(resources: string | string[] | { uuid?: string, url?: string, type?: string }, param2?, param3?: Function | null): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (param3) {
                cc.loader.load(resources, param2, (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                    param3(err, res)
                })
            } else {
                cc.loader.load(resources, (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                    if (param2) {
                        param2(err, res)
                    }
                })
            }
        });
    }

    static loadDelay(resources: string | string[] | { uuid?: string, url?: string, type?: string }, completeCallback?: Function): Function;
    static loadDelay(resources: string | string[] | { uuid?: string, url?: string, type?: string }, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback?: Function | null): Function;
    static loadDelay(resources: string | string[] | { uuid?: string, url?: string, type?: string }, param2: (completedCount: number, totalCount: number, item: any) => void, param3?: Function | null): Function {
        return PromiseUtil.delayPromise((resolve, reject) => {
            if (param3) {
                cc.loader.load(resources, param2, (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
            } else {
                cc.loader.load(resources, (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
            }
        });
    }




    static loadResAuto(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void) | null): Promise<any>;
    static loadResAuto(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any) => void): Promise<any>;
    static loadResAuto(url: string, type: typeof cc.Asset): Promise<any>;
    static loadResAuto(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void) | null): Promise<any>;
    static loadResAuto(url: string, completeCallback: (error: Error, resource: any) => void): Promise<any>;
    static loadResAuto(url: string): Promise<any>;
    static loadResAuto(url: string, param2?: any, param3?: any, param4?: any): Promise<any> {
        if (param4 !== undefined) {
            // 4参数
            return new Promise<any>((resolve, reject) => {
                let existAss = cc.loader.getRes(url, param2);
                if (existAss) {
                    if (param4) {
                        param4(null, existAss);
                    }
                    resolve(existAss);
                    return;
                }
                cc.loader.loadRes(url, param2, param3, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    if (param4) {
                        param4(error, resource);
                    }
                    resolve(resource);
                });
            });
        } else if (param3 !== undefined) {
            //3参数
            return new Promise<any>((resolve, reject) => {
                if (typeof param2 == typeof cc.Asset) {
                    let existAss = cc.loader.getRes(url, param2);
                    if (existAss) {
                        if (param3) {
                            param3(null, existAss);
                        }
                        resolve(existAss);
                        return;
                    }
                } else {
                    let existAss = cc.loader.getRes(url);
                    if (existAss) {
                        if (param3) {
                            param3(null, existAss);
                        }
                        resolve(existAss);
                        return;
                    }
                }

                cc.loader.loadRes(url, param2, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    if (param3) {
                        param3(error, resource);
                    }
                    resolve(resource);
                });
            });
        } else if (param2 !== undefined) {
            //2参数
            if (typeof param2 == typeof cc.Asset) {
                return new Promise<any>((resolve, reject) => {
                    let existAss = cc.loader.getRes(url, param2);
                    if (existAss) {
                        resolve(existAss);
                        return;
                    }
                    cc.loader.loadRes(url, param2, (error: Error, resource: any) => {
                        if (error != null) {
                            mlog.error("loadError " + url, error);
                        }
                        resolve(resource);
                    });
                });
            } else {
                return new Promise<any>((resolve, reject) => {
                    let existAss = cc.loader.getRes(url);
                    if (existAss) {
                        if (param2 && !(param2 instanceof cc.Asset)) {
                            param2(null, existAss);
                        }
                        resolve(existAss);
                        return;
                    }
                    cc.loader.loadRes(url, (error: Error, resource: any) => {
                        if (error != null) {
                            mlog.error("loadError " + url, error);
                        }
                        if (param2 && !(param2 instanceof cc.Asset)) {
                            param2(error, resource);
                        }
                        resolve(resource);
                    });
                });
            }
        } else {
            //1个参数
            return new Promise<any>((resolve, reject) => {
                let existAss = cc.loader.getRes(url);
                if (existAss) {
                    resolve(existAss);
                    return;
                }
                cc.loader.loadRes(url, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    resolve(resource);
                });
            });
        }
    }

    static loadResDirAuto(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[], urls: string[]) => void) | null): Promise<any>;
    static loadResDirAuto(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any[], urls: string[]) => void): Promise<any>;
    static loadResDirAuto(url: string, type: typeof cc.Asset): Promise<any>;
    static loadResDirAuto(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[], urls: string[]) => void) | null): Promise<any>;
    static loadResDirAuto(url: string, completeCallback: (error: Error, resource: any[], urls: string[]) => void): Promise<any>;
    static loadResDirAuto(url: string): Promise<any>;
    static loadResDirAuto(url: string, param2?: any, param3?: any, param4?: any): Promise<any> {
        if (param4 !== undefined) {
            // 4参数
            return new Promise<any>((resolve, reject) => {
                cc.loader.loadResDir(url, param2, param3, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    if (param4) {
                        param4(error, resource);
                    }
                    resolve(resource);
                });
            });
        } else if (param3 !== undefined) {
            //3参数
            return new Promise<any>((resolve, reject) => {
                cc.loader.loadResDir(url, param2, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    if (param3) {
                        param3(error, resource);
                    }
                    resolve(resource);
                });
            });
        } else if (param2 !== undefined) {
            //2参数
            if (typeof param2 == typeof cc.Asset) {
                return new Promise<any>((resolve, reject) => {
                    cc.loader.loadResDir(url, param2, (error: Error, resource: any) => {
                        if (error != null) {
                            mlog.error("loadError " + url, error);
                        }
                        resolve(resource);
                    });
                });
            } else {
                return new Promise<any>((resolve, reject) => {
                    cc.loader.loadResDir(url, (error: Error, resource: any) => {
                        if (error != null) {
                            mlog.error("loadError " + url, error);
                        }
                        if (param2 && !(param2 instanceof cc.Asset)) {
                            param2(error, resource);
                        }
                        resolve(resource);
                    });
                });
            }
        } else {
            //1个参数
            return new Promise<any>((resolve, reject) => {
                cc.loader.loadResDir(url, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    resolve(resource);
                });
            });
        }
    }



    static loadResDelay(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void) | null): Function;
    static loadResDelay(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any) => void): Function;
    static loadResDelay(url: string, type: typeof cc.Asset): Function;
    static loadResDelay(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void) | null): Function;
    static loadResDelay(url: string, completeCallback: (error: Error, resource: any) => void): Function;
    static loadResDelay(url: string): Function;
    static loadResDelay(url: string, param2?: any, param3?: any, param4?: any): Function {
        if (param4 !== undefined) {
            // 4参数
            return PromiseUtil.delayPromise((resolve, reject) => {
                let existAss = cc.loader.getRes(url, param2);
                if (existAss) {
                    if (param4) {
                        param4(null, existAss);
                    }
                    resolve(existAss);
                    return;
                }
                cc.loader.loadRes(url, param2, param3, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    if (param4) {
                        param4(error, resource);
                    }
                    resolve(resource);
                });
            });
        } else if (param3 !== undefined) {
            //3参数
            return PromiseUtil.delayPromise((resolve, reject) => {
                if (typeof param2 == typeof cc.Asset) {
                    let existAss = cc.loader.getRes(url, param2);
                    if (existAss) {
                        if (param3) {
                            param3(null, existAss);
                        }
                        resolve(existAss);
                        return;
                    }
                } else {
                    let existAss = cc.loader.getRes(url);
                    if (existAss) {
                        if (param3) {
                            param3(null, existAss);
                        }
                        resolve(existAss);
                        return;
                    }
                }

                cc.loader.loadRes(url, param2, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    if (param3) {
                        param3(error, resource);
                    }
                    resolve(resource);
                });
            });
        } else if (param2 !== undefined) {
            //2参数
            if (typeof param2 == typeof cc.Asset) {
                return PromiseUtil.delayPromise((resolve, reject) => {
                    let existAss = cc.loader.getRes(url, param2);
                    if (existAss) {
                        resolve(existAss);
                        return;
                    }
                    cc.loader.loadRes(url, param2, (error: Error, resource: any) => {
                        if (error != null) {
                            mlog.error("loadError " + url, error);
                        }
                        resolve(resource);
                    });
                });
            } else {
                return PromiseUtil.delayPromise((resolve, reject) => {
                    let existAss = cc.loader.getRes(url);
                    if (existAss) {
                        if (param2 && !(param2 instanceof cc.Asset)) {
                            param2(null, existAss);
                        }
                        resolve(existAss);
                        return;
                    }
                    cc.loader.loadRes(url, (error: Error, resource: any) => {
                        if (error != null) {
                            mlog.error("loadError " + url, error);
                        }
                        if (param2 && !(param2 instanceof cc.Asset)) {
                            param2(error, resource);
                        }
                        resolve(resource);
                    });
                });
            }
        } else {
            //1个参数
            return PromiseUtil.delayPromise((resolve, reject) => {
                let existAss = cc.loader.getRes(url);
                if (existAss) {
                    resolve(existAss);
                    return;
                }
                cc.loader.loadRes(url, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    resolve(resource);
                });
            });
        }
    }

    static loadResDirDelay(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[], urls: string[]) => void) | null): Function;
    static loadResDirDelay(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any[], urls: string[]) => void): Function;
    static loadResDirDelay(url: string, type: typeof cc.Asset): Function;
    static loadResDirDelay(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[], urls: string[]) => void) | null): Function;
    static loadResDirDelay(url: string, completeCallback: (error: Error, resource: any[], urls: string[]) => void): Function;
    static loadResDirDelay(url: string): Function;
    static loadResDirDelay(url: string, param2?: any, param3?: any, param4?: any): Function {
        if (param4 !== undefined) {
            // 4参数
            return PromiseUtil.delayPromise((resolve, reject) => {
                cc.loader.loadResDir(url, param2, param3, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    if (param4) {
                        param4(error, resource);
                    }
                    resolve(resource);
                });
            });
        } else if (param3 !== undefined) {
            //3参数
            return PromiseUtil.delayPromise((resolve, reject) => {
                cc.loader.loadResDir(url, param2, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    if (param3) {
                        param3(error, resource);
                    }
                    resolve(resource);
                });
            });
        } else if (param2 !== undefined) {
            //2参数
            if (typeof param2 == typeof cc.Asset) {
                return PromiseUtil.delayPromise((resolve, reject) => {
                    cc.loader.loadResDir(url, param2, (error: Error, resource: any) => {
                        if (error != null) {
                            mlog.error("loadError " + url, error);
                        }
                        resolve(resource);
                    });
                });
            } else {
                return PromiseUtil.delayPromise((resolve, reject) => {
                    cc.loader.loadResDir(url, (error: Error, resource: any) => {
                        if (error != null) {
                            mlog.error("loadError " + url, error);
                        }
                        if (param2 && !(param2 instanceof cc.Asset)) {
                            param2(error, resource);
                        }
                        resolve(resource);
                    });
                });
            }
        } else {
            //1个参数
            return PromiseUtil.delayPromise((resolve, reject) => {
                cc.loader.loadResDir(url, (error: Error, resource: any) => {
                    if (error != null) {
                        mlog.error("loadError " + url, error);
                    }
                    resolve(resource);
                });
            });
        }
    }


    static getAtlasFrame(atlasName: string, frameName: string): cc.SpriteFrame {
        let atlas: cc.SpriteAtlas = cc.loader.getRes(atlasName, cc.SpriteAtlas);
        if (!atlas) {
            mlog.error(`atlas: ${atlasName} is not load ,when need frame:${frameName}`)
            return null;
        }
        return atlas.getSpriteFrame(frameName);
    }
    static getCacheAsset(assetUrl: string, type?: Function): any {
        let asset = cc.loader.getRes(assetUrl, type);
        if (!asset) {
            mlog.error(`asset: ${assetUrl} is not load ,when need assets:${assetUrl}`)
            return null;
        }
        return asset;
    }

    static getCacheImg(assetUrl: string): cc.SpriteFrame {
        let asset = cc.loader.getRes(assetUrl, cc.SpriteFrame);
        if (!asset) {
            mlog.error(`asset: ${assetUrl} is not load ,when need assets:${assetUrl}`)
            return null;
        }
        return asset;
    }

    static getAtlasFrameCom(frameName: string): cc.SpriteFrame {
        let atlasName = "plist/common";
        let atlas: cc.SpriteAtlas = cc.loader.getRes(atlasName, cc.SpriteAtlas);
        if (!atlas) {
            mlog.error(`atlas: ${atlasName} is not load ,when need frame:${frameName}`)
            return null;
        }
        return atlas.getSpriteFrame(frameName);
    }
    static getAtlasFrameOther(frameName: string): cc.SpriteFrame {
        let atlasName = "plist/other";
        let atlas: cc.SpriteAtlas = cc.loader.getRes(atlasName, cc.SpriteAtlas);
        if (!atlas) {
            mlog.error(`atlas: ${atlasName} is not load ,when need frame:${frameName}`)
            return null;
        }
        return atlas.getSpriteFrame(frameName);
    }

    static getCacheFont(fontAtlasUrl: string): cc.Font {
        let atlas: cc.Font = cc.loader.getRes(fontAtlasUrl, cc.Font);
        if (!atlas) {
            mlog.error(`font: ${fontAtlasUrl} is not load ,when need font:${fontAtlasUrl}`)
            return null;
        }
        return atlas;
    }

    static getCacheAudio(audioName: string): cc.AudioClip {
        let ac: cc.AudioClip = cc.loader.getRes(audioName, cc.AudioClip);
        if (!ac) {
            mlog.error(`AudioClip: ${audioName} is not load`)
        }
        return ac
    }

    static createCachePrefabsNode(prefabsUrl): cc.Node {
        let pf: cc.Prefab = cc.loader.getRes(prefabsUrl, cc.Prefab);
        if (!pf) {
            mlog.error(`Prefab: ${prefabsUrl} is not load ,when need Prefab:${prefabsUrl}`)
            return null;
        }

        let pfNode: cc.Node = cc.instantiate(pf);
        return pfNode;
    }

    static async loadListPromiseAllByLimit(
        dependList: DependRes[],
        limit: number = 3,
        onProgress?: (progress: ResProgress) => void): Promise<any> {

        if (dependList == null || dependList.length == 0) {
            return Promise.resolve();
        }

        return new Promise<any>(async (resolve, reject) => {
            // 进度数据
            let progress = {
                total: dependList.length,
                succ: 0,
                fail: 0,
                errMsgs: [],
                errResList: []
            }

            let loadAllFun = async (resList: DependRes[]) => {
                // 所有承诺
                let pmsList = [];
                // 生成每个承诺
                for (const dpd of resList) {
                    let pms = null;
                    if (dpd.dir) {
                        pms = ResUtil.loadResDirDelay(dpd.url, dpd.type, async (err, res) => {
                            if (err) {
                                progress.fail++;
                                progress.errMsgs.push(err);
                                progress.errResList.push(dpd);
                            } else {
                                progress.succ++;
                            }
                            if (onProgress) {
                                onProgress(progress)
                            }
                        });
                    } else {
                        pms = ResUtil.loadResDelay(dpd.url, dpd.type, async (err, res) => {
                            if (err) {
                                progress.fail++;
                                progress.errMsgs.push(err);
                                progress.errResList.push(dpd);
                            } else {
                                progress.succ++;
                            }
                            if (onProgress) {
                                onProgress(progress)
                            }
                        });
                    }

                    if (pms != null) {
                        pmsList.push(pms);
                    }
                }
                // 执行所有承诺
                await PromiseUtil.all(pmsList, limit);
            }
            // 首次加载
            await loadAllFun(dependList);
            // 睡眠等待方法
            let sleepByTime = (timeMilSec = 10) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, timeMilSec);
                });
            }
            let errorTryCount = 0;
            while (true) {
                // 错误重试方法
                if (progress.fail <= 0) {
                    break;
                }
                errorTryCount++;
                // 稍微等下再重试
                mlog.info(`(${progress.fail})个资源下载失败，1.5秒后第[${errorTryCount}]次尝试`)
                await sleepByTime(1500);
                // 重置一部分数据
                let tempErrorList = progress.errResList;
                progress.errMsgs = [];
                progress.errResList = [];
                progress.fail = 0;
                // 重新开始
                await loadAllFun(tempErrorList);
            }

            resolve();
        });
    }


    static async loadingByResList(node: cc.Node, dependList: DependRes[], fun: Function) {
        //创建loading 在node中心
        let loading = ViewUtil.createSpNode("plist/common", "cm_loading");
        cc.tween(loading).repeatForever(
            cc.tween(loading).by(1.2, { angle: -180 })
        ).start();
        node.addChild(loading);

        await this.loadListPromiseAllByLimit(dependList, 2)
        // 移除loading在node中心
        ComUtil.destroy(loading);

        // 调用回调
        fun();
    }

    static async loadingByLoadOne(node: cc.Node, resources: string | string[] | { uuid?: string, url?: string, type?: string }, fun: (err: string, res: any) => void) {
        //创建loading 在node中心
        let loading = ViewUtil.createSpNode("plist/common", "cm_loading");
        cc.tween(loading).repeatForever(
            cc.tween(loading).by(1.2, { angle: -180 })
        ).start();
        node.addChild(loading);

        await this.loadAuto(resources, (err, res) => {
            // 移除loading在node中心
            ComUtil.destroy(loading);
            fun(err, res)
        })
    }

    static loadSpineDataByUrl(spinePath: string, spineNameNoExt: string, loadSuc: (skeletonData: sp.SkeletonData) => void) {
        cc.loader.load(spinePath + spineNameNoExt + ".png", (error, texture) => {
            if (error) {
                mlog.error(`loadSpineDataByUrl img spinePath:[${spinePath}],spineNameNoExt:[${spineNameNoExt}] error.`, error);
                return;
            }
            cc.loader.load({ url: spinePath + "/" + spineNameNoExt + ".atlas", type: 'txt' }, (error, atlasJson) => {
                if (error) {
                    mlog.error(`loadSpineDataByUrl atlas spinePath:[${spinePath}],spineNameNoExt:[${spineNameNoExt}] error.`, error);
                    return;
                }
                cc.loader.load({ url: spinePath + "/" + spineNameNoExt + ".json", type: 'txt' }, (error, spineJson) => {
                    if (error) {
                        mlog.error(`loadSpineDataByUrl json spinePath:[${spinePath}],spineNameNoExt:[${spineNameNoExt}] error.`, error);
                        return;
                    }
                    var asset = new sp.SkeletonData();
                    asset.skeletonJson = spineJson;
                    asset.atlasText = atlasJson;
                    asset.textures = [texture];
                    asset["textureNames"] = [spineNameNoExt + ".png"];

                    if (loadSuc) {
                        loadSuc(asset);
                    }
                });
            });
        });
    }


    static loadSpineDataByUrlAuto(spinePath: string, spineNameNoExt: string): Promise<sp.SkeletonData> {
        return new Promise<sp.SkeletonData>((resolve, reject) => {
            cc.loader.load(spinePath + spineNameNoExt + ".png", (error, texture) => {
                if (error) {
                    mlog.error(`loadSpineDataByUrlAuto img spinePath:[${spinePath}],spineNameNoExt:[${spineNameNoExt}] error.`, error);
                    reject(error);
                    return;
                }
                cc.loader.load({ url: spinePath + "/" + spineNameNoExt + ".atlas", type: 'txt' }, (error, atlasJson) => {
                    if (error) {
                        mlog.error(`loadSpineDataByUrlAuto atlas spinePath:[${spinePath}],spineNameNoExt:[${spineNameNoExt}] error.`, error);
                        reject(error);
                        return;
                    }
                    cc.loader.load({ url: spinePath + "/" + spineNameNoExt + ".json", type: 'txt' }, (error, spineJson) => {
                        if (error) {
                            mlog.error(`loadSpineDataByUrlAuto json spinePath:[${spinePath}],spineNameNoExt:[${spineNameNoExt}] error.`, error);
                            reject(error);
                            return;
                        }
                        var asset = new sp.SkeletonData();
                        asset.skeletonJson = spineJson;
                        asset.atlasText = atlasJson;
                        asset.textures = [texture];
                        asset["textureNames"] = [spineNameNoExt + ".png"];

                        resolve(asset);
                    });
                });
            });


        });

    }


    // static getAtlasFrame(atlasName:string,frameName:string):cc.SpriteFrame{
    //     return cc.loader.getRes(atlasName+"/"+frameName,cc.SpriteFrame)
    // }

}

interface ResProgress {
    total: number;
    succ: number;
    fail: number;
    errMsgs: string[];
    errResList: DependRes[];
}