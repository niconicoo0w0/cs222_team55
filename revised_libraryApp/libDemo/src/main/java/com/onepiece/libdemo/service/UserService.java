package com.onepiece.libdemo.service;

import com.onepiece.libdemo.entity.Result;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @date
 * @description
 */

@Service
public class UserService {

    @Autowired
    private MongoTemplate mongoTemplate;

    private String COLLECTION_USER = "user";

    public Result registration(String userId, String userName, String password, String role){
        Query query = new Query(Criteria.where("userId").is(userId));
        List<Document> exitingUsers = mongoTemplate.find(query, Document.class, COLLECTION_USER);
        Result result = new Result();
        if (!exitingUsers.isEmpty()){
            result.setResult(false);
            result.setMessage("UserID " + userId + " already exist.");
            return result;
        }
        Document document = new Document();
        document.put("userId", userId);
        document.put("userName", userName);
        document.put("password", password);
        document.put("role", role);
        Document insert = mongoTemplate.insert(document, COLLECTION_USER);
        insert.remove("password");
        result.setResult(true);
        result.setData(insert);
        result.setMessage("register success.");
        return result;
    }

    public Result login(String userId, String password){
        Result result = new Result();
        Query query = new Query(Criteria.where("userId").is(userId).andOperator(Criteria.where("password").is(password)));
        List<Document> user = mongoTemplate.find(query, Document.class, COLLECTION_USER);
        if (user.isEmpty()){
            result.setResult(false);
            result.setMessage("userId or password incorrect.");
            result.setData(new HashMap());
            return result;
        }
        result.setResult(true);
        Document document = user.get(0);
        document.remove("password");
        result.setData(document);
        return result;
    }

}
