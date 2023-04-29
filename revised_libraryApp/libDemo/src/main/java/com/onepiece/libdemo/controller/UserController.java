package com.onepiece.libdemo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.onepiece.libdemo.entity.Result;
import com.onepiece.libdemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "*", allowCredentials = "true")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public Result registration(@RequestBody String params){
        JSONObject jsonObject = JSON.parseObject(params);
        String userId = jsonObject.getString("userId");
        String userName = jsonObject.getString("userName");
        String password = jsonObject.getString("password");
        String role = jsonObject.getString("role");
        return userService.registration(userId, userName, password, role);
    }

    @PostMapping("/login")
    public Result login(@RequestBody String params){
        JSONObject jsonObject = JSON.parseObject(params);
        String userId = jsonObject.getString("userId");
        String password = jsonObject.getString("password");
        return userService.login(userId, password);
    }

}
