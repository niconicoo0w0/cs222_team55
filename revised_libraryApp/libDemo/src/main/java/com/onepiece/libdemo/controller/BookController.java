package com.onepiece.libdemo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.onepiece.libdemo.entity.Result;
import com.onepiece.libdemo.service.BookService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @date
 * @description
 */

@CrossOrigin(originPatterns = "*", allowCredentials = "true")
@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping("/search")
    public List<Document> search(String keyword) {
        return service.search(keyword);
    }

    @PostMapping("/add")
    public Result addBook(@RequestBody String params) {
        JSONObject jsonObject = JSON.parseObject(params);
        String bookId = jsonObject.getString("bookId");
        String title = jsonObject.getString("title");
        String author = jsonObject.getString("author");
        String stock = jsonObject.getString("stock");
        String publicationYear = jsonObject.getString("publicationYear");
        return service.addBook(bookId, title, author, stock, publicationYear);
    }

    @PostMapping("/remove")
    public Result removeBook(@RequestBody String params){
        JSONObject jsonObject = JSON.parseObject(params);
        String bookId = jsonObject.getString("bookId");
        return service.removeBook(bookId);
    }

    @PostMapping("/return")
    public Result returnBook(@RequestBody String params){
        JSONObject jsonObject = JSON.parseObject(params);
        String userId = jsonObject.getString("userId");
        String bookId = jsonObject.getString("bookId");
        return service.returnBook(userId, bookId);
    }

    @PostMapping("/renew")
    public Result renewBook(@RequestBody String params){
        JSONObject jsonObject = JSON.parseObject(params);
        String userId = jsonObject.getString("userId");
        String bookId = jsonObject.getString("bookId");
        return service.renewBook(userId, bookId);
    }

    @PostMapping("/review")
    public Result review(@RequestBody String params){
        JSONObject jsonObject = JSON.parseObject(params);
        String bookId = jsonObject.getString("bookId");
        String content = jsonObject.getString("content");
        return service.review(bookId, content);
    }

    @PostMapping("/borrow")
    public Result borrow(@RequestBody String params){
        JSONObject jsonObject = JSON.parseObject(params);
        String userId = jsonObject.getString("userId");
        String bookId = jsonObject.getString("bookId");
        return service.borrowBook(userId, bookId);
    }

//    @PostMapping("/add")
//    public Result addBook(String bookId, String title, String author, String stock, String publicationYear) {
//        return service.addBook(bookId, title, author, stock, publicationYear);
//    }
//
//    @PostMapping("/remove")
//    public Result removeBook(String bookId){
//        return service.removeBook(bookId);
//    }
//
//    @PostMapping("/return")
//    public Result returnBook(String userId, String bookId){
//        return service.returnBook(userId, bookId);
//    }
//
//    @PostMapping("/renew")
//    public Result renewBook(String userId, String bookId){
//        return service.renewBook(userId, bookId);
//    }
//
//    @PostMapping("/review")
//    public Result review(String bookId, String content){
//        return service.review(bookId, content);
//    }
//
//    @PostMapping("/borrow")
//    public Result borrow(String userId, String bookId){
//        return service.borrowBook(userId, bookId);
//    }

    @GetMapping("/record")
    public List<Document> getRecord(String userId){
        return service.getBorrowRecord(userId);
    }
}
