package com.jy.common.utils;

/**
 * Created by meehu on 2020/1/6.
 */

public class MyAssert {
    public static void assertTrue(Boolean isTrue){
        if (!isTrue){
            throw new RuntimeException("MyAssert error");
        }
    }
}
