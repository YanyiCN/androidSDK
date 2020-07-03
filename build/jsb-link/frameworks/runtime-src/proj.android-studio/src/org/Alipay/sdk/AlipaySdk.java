package org.Alipay.sdk;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.alipay.sdk.app.PayTask;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.TsConst;

import java.util.Map;

public class AlipaySdk {
    private static AlipaySdk instance = null;

    public static AlipaySdk getInstance() {
        if (instance == null) {
            instance = new AlipaySdk();
        }
        return instance;
    }

    private static final int SDK_PAY_FLAG = 1;
    private static final int SDK_AUTH_FLAG = 2;

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
                default:
                    break;
            }
        };
    };

    /**
     * 支付宝支付业务
     */
    public void pay() {
        AlipayParam data = AlipayParam.getInstance();
        if (TextUtils.isEmpty(data.getAPPID()) || (TextUtils.isEmpty(data.getRsa2Private()) && TextUtils.isEmpty(data.getRsaPrivate()))) {
            System.out.println("pay_over" + 88888);
            return;
        }
       /* boolean rsa2 = (data.getRsa2Private().length() > 0);
        Map<String, String> params = OrderInfoUtil2_0.buildOrderParamMap(data.getAPPID(), rsa2);
        String orderParam = OrderInfoUtil2_0.buildOrderParam(params);

        String privateKey = rsa2 ? data.getRsa2Private() : data.getRsaPrivate();
        String sign = OrderInfoUtil2_0.getSign(params, privateKey, rsa2);
        final String orderInfo = orderParam + "&" + sign;*/

        final String orderInfo = data.getOrderInfo();
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
                System.out.println("");
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
