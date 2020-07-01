let PI = 3.14159265358979324
let x_pi = PI * 3000.0 / 180.0
let EARTH_RADIUS = 6378.137

export default class GpsLocUtil{
    // two point's distance
    public static distance(latA, lonA, latB, lonB){
        let earthR = 6371000.
        let x = Math.cos(latA * PI / 180.) * Math.cos(latB * PI / 180.) * Math.cos((lonA - lonB) * PI / 180)
        let y = Math.sin(latA * PI / 180.) * Math.sin(latB * PI / 180.)
        let s = x + y
        if((s > 1) ){ s = 1 }
        if((s < -1)){ s = -1 }
        let alpha = Math.acos(s)
        let distance = alpha * earthR
        return distance
    }

    public static rectangle(lng1, lat1, lng2, lat2){
        return {
            west : Math.min(lng1, lng2),
            north : Math.max(lat1, lat2),
            east : Math.max(lng1, lng2),
            south : Math.min(lat1, lat2)
        }
    }

    public static isInRect(rect, lon, lat){
        return rect.west <= lon && rect.east >= lon && rect.north >= lat && rect.south <= lat
    }

    public static isInChina(lat, lon){
        //China region - raw data
        //http://www.cnblogs.com/Aimeast/archive/2012/08/09/2629614.html
        let region = [
            this.rectangle(79.446200, 49.220400, 96.330000,42.889900),
            this.rectangle(109.687200, 54.141500, 135.000200, 39.374200),
            this.rectangle(73.124600, 42.889900, 124.143255, 29.529700),
            this.rectangle(82.968400, 29.529700, 97.035200, 26.718600),
            this.rectangle(97.025300, 29.529700, 124.367395, 20.414096),
            this.rectangle(107.975793, 20.414096, 111.744104, 17.871542)
        ]

        //China excluded region - raw data
        let exclude = [
            this.rectangle(119.921265, 25.398623, 122.497559, 21.785006),
            this.rectangle(101.865200, 22.284000, 106.665000, 20.098800),
            this.rectangle(106.452500, 21.542200, 108.051000, 20.487800),
            this.rectangle(109.032300, 55.817500, 119.127000, 50.325700),
            this.rectangle(127.456800, 55.817500, 137.022700, 49.557400),
            this.rectangle(131.266200, 44.892200, 137.022700, 42.569200)
        ]
        for (const item of region) {
            if((this.isInRect(item, lon, lat))){
                for (const item2 of exclude) {
                    if((this.isInRect(item2, lon, lat))){
                        return false
                    }
                }
                return true
            }
        }
        return false
    }

    public static transformLat(x, y){
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
        ret = ret + (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
        ret = ret + (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0
        ret = ret + (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0
        return ret
    }
    public static transformLon(x, y){
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
        ret = ret + (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
        ret = ret + (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0
        ret = ret + (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0
        return ret
    }


    public static delta(lat, lon){
        // Krasovsky 1940
        //
        // a = 6378245.0, 1/f = 298.3
        // b = a * (1 - f)
        // ee = (a^2 - b^2) / a^2
        let a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        let ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
        let dLat = this.transformLat(lon - 105.0, lat - 35.0)
        let dLon = this.transformLon(lon - 105.0, lat - 35.0)
        let radLat = lat / 180.0 * PI
        let magic = Math.sin(radLat)
        magic = 1 - ee * magic * magic
        let sqrtMagic = Math.sqrt(magic)
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI)
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI)
        return {lat:dLat, lon:dLon}
    }

    //WGS-84 to GCJ-02
    public static gcj_encrypt(wgsLat, wgsLon){
        if((!this.isInChina(wgsLat, wgsLon))){ return {wei: wgsLat, jin:wgsLon} }

        let d = this.delta(wgsLat, wgsLon)
        return {wei:(Number.parseFloat(wgsLat) + Number.parseFloat(d.lat+"")) + "",jin:(Number.parseFloat(wgsLon) + Number.parseFloat(d.lon)) + ""}
    }





    
    public static rad(d){
        return d * Math.PI / 180.0
    }
    // gps两点间的距离
    public static getDistance(lng1,lat1,lng2,lat2){
        let radLat1 = this.rad(lat1)
        let radLat2 = this.rad(lat2)
        let a = radLat1 - radLat2
        let b = this.rad(lng1) - this.rad(lng2)
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + 
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)))
        s = s * EARTH_RADIUS
        return s*1000 //单位米
    }


    //  计算检测gps距离
    public static getBtwDis(userA,userB,lineName){
        if(!userA.gpsLoc || !userB.gpsLoc
            || userA.gpsLoc=="" || userB.gpsLoc==""){
            return -1
        }
        let lat1 = Number.parseFloat(userA.gpsLoc.split(",")[0])
        let lng1 = Number.parseFloat(userA.gpsLoc.split(",")[1])
        let lat2 = Number.parseFloat(userB.gpsLoc.split(",")[0])
        let lng2 = Number.parseFloat(userB.gpsLoc.split(",")[1])
        let dis = Math.floor(this.getDistance(lat1,lng1,lat2,lng2))

        return dis
    }
}