package org.Alipay.sdk;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.alipay.sdk.app.PayTask;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.TsConst;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

public class AlipaySdk {
    private static AlipaySdk instance = null;

  /*  private AlipaySdk() {
    }*/

    public static AlipaySdk getInstance() {
        if (instance == null) {
            instance = new AlipaySdk();
        }
        return instance;
    }

    /**
     * 用于支付宝支付业务的入参 app_id。
     */
    public static final String APPID = "2016102700771999";

    /**
     * 用于支付宝账户登录授权业务的入参 pid。
     */
    public static final String PID = "";

    /**
     * 用于支付宝账户登录授权业务的入参 target_id。
     */
    public static final String TARGET_ID = "";

    /**
     * pkcs8 格式的商户私钥。
     * <p>
     * 如下私钥，RSA2_PRIVATE 或者 RSA_PRIVATE 只需要填入一个，如果两个都设置了，本 Demo 将优先
     * 使用 RSA2_PRIVATE。RSA2_PRIVATE 可以保证商户交易在更加安全的环境下进行，建议商户使用
     * RSA2_PRIVATE。
     * <p>
     * 建议使用支付宝提供的公私钥生成工具生成和获取 RSA2_PRIVATE。
     * 工具地址：https://doc.open.alipay.com/docs/doc.htm?treeId=291&articleId=106097&docType=1
     */
    public static final String RSA2_PRIVATE = "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCxMEOJdieIk3tEVqeZhOvi+/QojRljojsA3iDgUTAbSBbLvgP7GKuZgbVW5Ufs3PsAmMy6Sp3XsTeFp/DNN75QLLXvvmUtQcWAW/Y+WZOxGKy1VYQ/jrSm9DuebDKARdMvXx7GCaYDZbyyHRCiOY+Y7Kue+V1KaZYORhX+V60CCeGaYuMJHx0J2jkTpn4vo4xD7PzcgeLkCvdSXDPfFIKMBF2CabXXG/Go6658lqfn7y52CcMWCSwSuIz766R2IIT9qR8huy3NuUX9YloD36DI1nVsjteJaw7qPT78XCxrmu6iL8wCoPpfBbGZTURttFjspzUhvhlxgONs5xY4Ob+rAgMBAAECggEBAICSV/9wGCG3erPM+VKhrBUJ5FJkiG7OsmffxxVedDzno3r2B6d1cFc0UqSaPQW4F/6H4c6wBDcWJga7JTWUZGmC+AXeL0aWujx4/oahs1THZdMzGYKRB685++Tp9/8yK5rtN8RWDfvbIABSrNY6VGOQILx7j+FGGpeC7cSgVC7sTFYSu5bpMe6R6R2FRnA+/czpWCGenshI3nQCxgiYukFbXm/HxEvRDFpjRAwUAvw9mXm2rzMawG3cWTUsx1DJlbyBuCOHkWNOw1kV3tkUykm5PBz3hyQHey0eQ9IYGQ6GHqz9wwq41JtbUBtv8WBWtj63imOb026eNF4WxunGG0ECgYEA6LDL6RRHG+ZjG9AH+cvF7SZ6Y7OVbesFxQbbm8FUtoHB1uxBxZv+T021yS/kddiHokHLJSR0dbLNfMx3tzdzQ0RQsy6PREqiyKH83/Y9essfbtby7GlNumK/e8m2tRUngAPZBxxj8VWkGGQ2RBmnTPaS6RmQ8o26yBCPITY0OGECgYEAwvAmy/8JEBFJdJKVd9gm86jKw8d3gP0Xhx6KT4rxs1HdR2Lxs6v1F5RSyQOiaVr/iMMzeWBfpv3Qs30QJq+0LqEQhQdw5hmJr/97VUUTzCGaKWLPMXh7hQdurzJ5epi6eUFUkTT2r3KfwDiYFOVrZUh1zZWOJZyM1w0bXQD2A4sCgYEAxuWQdvvpSHTm1Hg+yQugdHTGewCfQyR4exDAmONpmNNTMHYkRlhvybPAJmd0njLmxQ/+KBKAJbcfpIRV9FtGgAIeBPtQZOxzNpIYSAwAQzzq8mBzpxbf5OjRimtCbIjXibpAQa7H0xsEOAE4zX8sHUJLE0rSNjJlrOtSnO3rNyECgYAsxA2ExzqDkBS4Snk8nkzDo718nC/bVUOz6dWFUrkSnvgbzqMGybRtB8jDFKyVWSpZc8o8U19j7+GfdlbhK3RLSP2MLxtEHBU8b4UZHdXgCM9oNaKzD6H9+Kj4XrT67FvWQKR0/B6yR7Zb5CM4mT7CcZNr9K5CAONu9zmTcAcO5QKBgQDWxIJ6V5JuU6EcWFhSt04QumsqsJk4ZLeM2nNkpiLTVMjdlBXob9tfSX+4mGqcVg/aIfzlCZIoEdfOKcDFhZC4rh1fHd+sux5Ylr09nDabhaQyqaRynRtYf8Nbt1t156OpiYsaJzcABzUNpHvX0g1r9k9kVr7M620LAjOIRGyu3g==";
    public static final String RSA_PRIVATE = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALtk1bfMHCkSbI1JHXFClBeucs5/i7c7QXIYW2vLOjfcrvsxQ4V9cGFdSGIvifTSOhSg1T8FuOQWl+nPvy1mYD3ns4a3qqn1dBv8laLn3dvNpJ2cRjTtcIpvrU4loaqqTNA9amGBjtRoqxPwZR5tM+UWT6kfLYgt8RH8WkfYgHl/AgMBAAECgYAUB6IkZCe6aCK8M013VrN3mIji85Uef7HuHRZgfjd50xfM96YM9ax2a78Z55TqWzIkFFDWzKjHkHaqYi9ADgpJRKNOs3lflyjh8naEAvxqOdA3DTKbtNF50Y5LKuUbDe+HUILyY/7Xom4ODkmlLDJq6SeqLqC5NiUUqPRx/cR3+QJBAO8PWfw0h816i6aVYnj5QjLXFGwVLwxtbh5oeF3W7R1Omzc7KFkCP/rmXOMUS8KfqMKseOQWNlivJuMdTn6uiX0CQQDIrD0mK8xBUe0vWwyqqmAlqLQBGNVeIv3NCzaVBUBYT1QfbYAFmnGqCwKwNYsUbeVKlvhOR+TuysBNfoBzfp+rAkBEVhEVBTckx7kP33gMuMPxoIXX955BYS6vRpHR0VRqokPAYArCluAPKra2uuCFO/qT25WbLbZPV5I4LfJ4SBBJAkAgJQb+kFF9vSPjTBBxXi1cmvOKoXG8TJqfN8achGTUQJDXH/E79It0k6LwmwMWWKw8EIbh8z5Gyg+X2kW1OnlVAkBpR8gTNNFUOQCuSAys4q0Ykn3yI2/Ac1fAjdDIrZfQ1+zL+e0Cu/7rWkK5RLJrWXYqMO4Q4G7v938zmSpBtC2N";


    private static final int SDK_PAY_FLAG = 1;
    private static final int SDK_AUTH_FLAG = 2;

//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//    }

    @SuppressLint("HandlerLeak")
    private Handler mHandler = new Handler() {
        @SuppressWarnings("unused")
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case SDK_PAY_FLAG: {
                    @SuppressWarnings("unchecked")
                    PayResult payResult = new PayResult((Map<String, String>) msg.obj);
                    /**
                     * 对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
                     */
                    String resultInfo = payResult.getResult();// 同步返回需要验证的信息
                    String resultStatus = payResult.getResultStatus();
                    String result = payResult.getResult();
                    // 判断resultStatus 为9000则代表支付成功
                    if (TextUtils.equals(resultStatus, "9000")) {
                        //支付成功
                        AppActivity.JavaBridge(TsConst.LF_PAY, "支付成功");
                    } else {
                        //支付失败
                        AppActivity.JavaBridge(TsConst.LF_PAY_FAILD, "支付失败");
                    }
                    break;
                }
                case SDK_AUTH_FLAG: {//支付宝账户授权业务
                    @SuppressWarnings("unchecked")
                    AuthResult authResult = new AuthResult((Map<String, String>) msg.obj, true);
                    String resultStatus = authResult.getResultStatus();

                    // 判断resultStatus 为“9000”且result_code
                    // 为“200”则代表授权成功，具体状态码代表含义可参考授权接口文档
                    if (TextUtils.equals(resultStatus, "9000") && TextUtils.equals(authResult.getResultCode(), "200")) {
                        // 获取alipay_open_id，调支付时作为参数extern_token 的value
                        // 传入，则支付账户为该授权账户
//                        showAlert(AlipaySdk.this, getString(R.string.auth_success) + authResult);
                    } else {
                        // 其他状态值则为授权失败
//                        showAlert(AlipaySdk.this, getString(R.string.auth_failed) + authResult);
                    }
                    break;
                }
                default:
                    break;
            }
        }

        ;
    };

    //param:  APPID  orderInfo   RSA2_PRIVATE   RSA_PRIVATE

    /**
     * 支付宝支付业务
     */
    public void pay() {//View v
        if (TextUtils.isEmpty(APPID) || (TextUtils.isEmpty(RSA2_PRIVATE) && TextUtils.isEmpty(RSA_PRIVATE))) {
//            showAlert(this, getString(R.string.error_missing_appid_rsa_private));
            System.out.println("pay_over" + 88888);
            return;
        }
        boolean rsa2 = (RSA2_PRIVATE.length() > 0);
        Map<String, String> params = OrderInfoUtil2_0.buildOrderParamMap(APPID, rsa2);
        String orderParam = OrderInfoUtil2_0.buildOrderParam(params);

        String privateKey = rsa2 ? RSA2_PRIVATE : RSA_PRIVATE;
        String sign = OrderInfoUtil2_0.getSign(params, privateKey, rsa2);
        final String orderInfo = orderParam + "&" + sign;

        final Runnable payRunnable = new Runnable() {

            @Override
            public void run() {
                // 构造PayTask 对象
                PayTask aliPay = new PayTask(AppActivity.getInstance());
                // 调用支付接口，获取支付结果
                Map<String, String> result = aliPay.payV2(orderInfo, true);
                Log.i("msp", result.toString());

                Message msg = new Message();
                msg.what = SDK_PAY_FLAG;
                msg.obj = result;
                mHandler.sendMessage(msg);
            }
        };

        // 必须异步调用
        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    /**
     * 获取支付宝 SDK 版本号。
     */
    public void showSdkVersion(View v) {
        PayTask payTask = new PayTask(AppActivity.getInstance());
        String version = payTask.getVersion();
        System.out.println("支付宝 SDK 版本号：" + version);
    }

    private static void showToast(Context ctx, String msg) {
        Toast.makeText(ctx, msg, Toast.LENGTH_LONG).show();
    }


}
