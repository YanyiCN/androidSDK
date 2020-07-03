/****************************************************************************
 Copyright (c) 2015-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
package org.cocos2dx.javascript;

import org.Alipay.sdk.AlipayParam;
import org.Alipay.sdk.AlipaySdk;
import org.cocos2d.demo.R;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;


import android.app.AlertDialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.os.Bundle;

import android.content.Intent;
import android.content.res.Configuration;

import android.os.Looper;
import android.os.Vibrator;
import android.app.Service;
//import android.support.v4.content.ContextCompat;
import android.view.Gravity;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.alipay.sdk.app.EnvUtils;

import java.lang.reflect.Field;

public class AppActivity extends Cocos2dxActivity {
    public static Vibrator myVibrator;
    private static AppActivity app = null;

   /* private AppActivity() {
    }*/

    public static AppActivity getInstance() {
        if (app == null) {
            app = new AppActivity();
        }
        return app;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
//        setContentView(R.layout.pay_main);
        // Workaround in
        // https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            // so just quietly finish and go away, dropping the user back into the activity
            // at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.getInstance().init(this);
        app = this;
        // 获得系统的Vibrator实例
        myVibrator = (Vibrator) getSystemService(Service.VIBRATOR_SERVICE);
    }

    //TS调入
    public static String TsBridge(String param) throws JSONException {
        JSONObject obj = new JSONObject(param);
        //JSONObject args = obj.getJSONObject("args");
        int type = obj.getInt("funType");
   /*     String appId = obj.getString("appId");
        String rsaPrivate = obj.getString("rsaPrivate");
        String rsa2Private = obj.getString("rsa2Private");
        String orderInfo = obj.getString("orderInfo");*/
        switch (type) {
            case TsConst.LF_PAY:
                AlipayParam.getInstance().setAPPID(null);//appId
                AlipayParam.getInstance().setRsaPrivate(null);//rsaPrivate
                AlipayParam.getInstance().setRsa2Private(null);//rsa2Private
                AlipayParam.getInstance().setOrderInfo(null);//orderInfo;
                app.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        AlipaySdk.getInstance().pay();
                    }
                });
                break;
            case TsConst.LF_PRE_PAY:
                System.out.println("pay_pre" + 88888);
                break;
            default:
        }
        return "";
    }

    //java调出
    public static void JavaBridge(final int type, final String args) {
        app.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                JSONObject object = new JSONObject();
                try {
                    object.put("args", args);
                    object.put("code", type == TsConst.LF_PAY ? 1 : 0);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                String value = "JavaBridge(" + type + ",'" + object + "')";
                Cocos2dxJavascriptJavaBridge.evalString(value);
            }
        });
    }

    public static void vibrator(String args) {
        try {
            JSONObject jsonObject = new JSONObject(args);
            int time = jsonObject.getInt("time");
            myVibrator.vibrate(time);// ms

//            app.JavaBridge();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static void showDialog() {
        //运行在UI线程
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                System.out.println("110***showDialog");
//                Toast toast=Toast.makeText(app,"要显示的内容",Toast.LENGTH_SHORT);
//                toast.show();
                AlertDialog.Builder builder = new AlertDialog.Builder(app);
                builder.setIcon(android.R.drawable.ic_dialog_info);//提示图标
                builder.setTitle("温馨提示");
                builder.setMessage("天冷多加衣！");
                AlertDialog dialog = builder.create();
                dialog.show();
            }
        });
    }


    public static void copyText(final String text) {
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {//s
                    JSONObject jsonObject = new JSONObject(text);
                    String str = jsonObject.getString("str");
                    ClipboardManager c = (ClipboardManager) app.getSystemService(Context.CLIPBOARD_SERVICE);
                    c.setPrimaryClip(ClipData.newPlainText("text", str));
                    System.out.println(str + 88888);
                } catch (JSONException e) {
                    System.out.println("catch" + 88888);
                }
            }
        });

    }

    public static String getCopyText() {
        if (Looper.myLooper() == null) {
            Looper.prepare();
        }
        ClipboardManager c = (ClipboardManager) app.getSystemService(Context.CLIPBOARD_SERVICE);
        if (!c.hasPrimaryClip()) {
            return "";
        }
        ClipData clip = c.getPrimaryClip();
        String text = clip.getItemAt(0).getText().toString();
        return text;
    }


    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView, this);

        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.getInstance().onResume();

    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.getInstance().onPause();

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }

        SDKWrapper.getInstance().onDestroy();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.getInstance().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.getInstance().onStop();
    }

    @Override
    public void onBackPressed() {
        SDKWrapper.getInstance().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.getInstance().onStart();
        super.onStart();
    }


}
