package com.onepiece.libdemo.entity;

import java.util.Map;

/**
 * @date
 * @description
 */
public class Result {

    private boolean result;
    private Map data;
    private String message;

    public boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    public Map getData() {
        return data;
    }

    public void setData(Map data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
