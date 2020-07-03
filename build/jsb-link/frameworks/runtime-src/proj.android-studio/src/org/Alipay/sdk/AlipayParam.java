package org.Alipay.sdk;

import java.util.Map;

public class AlipayParam {
    private static AlipayParam instance = null;

    public static AlipayParam getInstance() {
        if (instance == null) {
            instance = new AlipayParam();
        }
        return instance;
    }

    //用于支付宝支付业务的入参 app_id
    private String APPID = null;
    //RSA私钥
    private String RSA_PRIVATE = null;
    //RSA2私钥
    private String RSA2_PRIVATE = null;
    //订单信息
    private String orderInfo = null;


    public String getOrderInfo() {
        String testOrderInfo = this.getTestOrderInfo();
        return this.orderInfo != null ? this.orderInfo : testOrderInfo;
    }

    public void setOrderInfo(String orderInfo) {
        this.orderInfo = orderInfo;
    }

    public String getAPPID() {
        return this.APPID != null ? this.APPID : "2016102700771999";
    }

    public void setAPPID(String APPID) {
        this.APPID = APPID;
    }

    public String getRsaPrivate() {
        return this.RSA_PRIVATE != null ? this.RSA_PRIVATE : "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALtk1bfMHCkSbI1JHXFClBeucs5/i7c7QXIYW2vLOjfcrvsxQ4V9cGFdSGIvifTSOhSg1T8FuOQWl+nPvy1mYD3ns4a3qqn1dBv8laLn3dvNpJ2cRjTtcIpvrU4loaqqTNA9amGBjtRoqxPwZR5tM+UWT6kfLYgt8RH8WkfYgHl/AgMBAAECgYAUB6IkZCe6aCK8M013VrN3mIji85Uef7HuHRZgfjd50xfM96YM9ax2a78Z55TqWzIkFFDWzKjHkHaqYi9ADgpJRKNOs3lflyjh8naEAvxqOdA3DTKbtNF50Y5LKuUbDe+HUILyY/7Xom4ODkmlLDJq6SeqLqC5NiUUqPRx/cR3+QJBAO8PWfw0h816i6aVYnj5QjLXFGwVLwxtbh5oeF3W7R1Omzc7KFkCP/rmXOMUS8KfqMKseOQWNlivJuMdTn6uiX0CQQDIrD0mK8xBUe0vWwyqqmAlqLQBGNVeIv3NCzaVBUBYT1QfbYAFmnGqCwKwNYsUbeVKlvhOR+TuysBNfoBzfp+rAkBEVhEVBTckx7kP33gMuMPxoIXX955BYS6vRpHR0VRqokPAYArCluAPKra2uuCFO/qT25WbLbZPV5I4LfJ4SBBJAkAgJQb+kFF9vSPjTBBxXi1cmvOKoXG8TJqfN8achGTUQJDXH/E79It0k6LwmwMWWKw8EIbh8z5Gyg+X2kW1OnlVAkBpR8gTNNFUOQCuSAys4q0Ykn3yI2/Ac1fAjdDIrZfQ1+zL+e0Cu/7rWkK5RLJrWXYqMO4Q4G7v938zmSpBtC2N";
    }

    public void setRsaPrivate(String RSA_PRIVATE) {
        this.RSA_PRIVATE = RSA_PRIVATE;
    }

    public String getRsa2Private() {
        return this.RSA2_PRIVATE != null ? this.RSA2_PRIVATE : "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCxMEOJdieIk3tEVqeZhOvi+/QojRljojsA3iDgUTAbSBbLvgP7GKuZgbVW5Ufs3PsAmMy6Sp3XsTeFp/DNN75QLLXvvmUtQcWAW/Y+WZOxGKy1VYQ/jrSm9DuebDKARdMvXx7GCaYDZbyyHRCiOY+Y7Kue+V1KaZYORhX+V60CCeGaYuMJHx0J2jkTpn4vo4xD7PzcgeLkCvdSXDPfFIKMBF2CabXXG/Go6658lqfn7y52CcMWCSwSuIz766R2IIT9qR8huy3NuUX9YloD36DI1nVsjteJaw7qPT78XCxrmu6iL8wCoPpfBbGZTURttFjspzUhvhlxgONs5xY4Ob+rAgMBAAECggEBAICSV/9wGCG3erPM+VKhrBUJ5FJkiG7OsmffxxVedDzno3r2B6d1cFc0UqSaPQW4F/6H4c6wBDcWJga7JTWUZGmC+AXeL0aWujx4/oahs1THZdMzGYKRB685++Tp9/8yK5rtN8RWDfvbIABSrNY6VGOQILx7j+FGGpeC7cSgVC7sTFYSu5bpMe6R6R2FRnA+/czpWCGenshI3nQCxgiYukFbXm/HxEvRDFpjRAwUAvw9mXm2rzMawG3cWTUsx1DJlbyBuCOHkWNOw1kV3tkUykm5PBz3hyQHey0eQ9IYGQ6GHqz9wwq41JtbUBtv8WBWtj63imOb026eNF4WxunGG0ECgYEA6LDL6RRHG+ZjG9AH+cvF7SZ6Y7OVbesFxQbbm8FUtoHB1uxBxZv+T021yS/kddiHokHLJSR0dbLNfMx3tzdzQ0RQsy6PREqiyKH83/Y9essfbtby7GlNumK/e8m2tRUngAPZBxxj8VWkGGQ2RBmnTPaS6RmQ8o26yBCPITY0OGECgYEAwvAmy/8JEBFJdJKVd9gm86jKw8d3gP0Xhx6KT4rxs1HdR2Lxs6v1F5RSyQOiaVr/iMMzeWBfpv3Qs30QJq+0LqEQhQdw5hmJr/97VUUTzCGaKWLPMXh7hQdurzJ5epi6eUFUkTT2r3KfwDiYFOVrZUh1zZWOJZyM1w0bXQD2A4sCgYEAxuWQdvvpSHTm1Hg+yQugdHTGewCfQyR4exDAmONpmNNTMHYkRlhvybPAJmd0njLmxQ/+KBKAJbcfpIRV9FtGgAIeBPtQZOxzNpIYSAwAQzzq8mBzpxbf5OjRimtCbIjXibpAQa7H0xsEOAE4zX8sHUJLE0rSNjJlrOtSnO3rNyECgYAsxA2ExzqDkBS4Snk8nkzDo718nC/bVUOz6dWFUrkSnvgbzqMGybRtB8jDFKyVWSpZc8o8U19j7+GfdlbhK3RLSP2MLxtEHBU8b4UZHdXgCM9oNaKzD6H9+Kj4XrT67FvWQKR0/B6yR7Zb5CM4mT7CcZNr9K5CAONu9zmTcAcO5QKBgQDWxIJ6V5JuU6EcWFhSt04QumsqsJk4ZLeM2nNkpiLTVMjdlBXob9tfSX+4mGqcVg/aIfzlCZIoEdfOKcDFhZC4rh1fHd+sux5Ylr09nDabhaQyqaRynRtYf8Nbt1t156OpiYsaJzcABzUNpHvX0g1r9k9kVr7M620LAjOIRGyu3g==";
    }


    public void setRsa2Private(String RSA2_PRIVATE) {
        this.RSA2_PRIVATE = RSA2_PRIVATE;
    }

    //测试使用 encode
    private String getTestOrderInfo() {
        boolean rsa2 = (this.getRsa2Private().length() > 0);
        Map<String, String> params = OrderInfoUtil2_0.buildOrderParamMap(this.getAPPID(), rsa2);
        String orderParam = OrderInfoUtil2_0.buildOrderParam(params);
        String privateKey = rsa2 ? this.getRsa2Private() : this.getRsaPrivate();
        String sign = OrderInfoUtil2_0.getSign(params, privateKey, rsa2);
        final String orderInfo = orderParam + "&" + sign;
        return orderInfo;
    }
}
