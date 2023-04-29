package com.onepiece.libdemo.service;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.onepiece.libdemo.entity.Result;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @date
 * @description
 */

@Service
public class BookService {

    @Autowired
    private MongoTemplate mongoTemplate;

    private String COLLECTION_BOOK = "book";
    private String COLLECTION_BORROW_RECORD = "borrowRecord";

    private String USER_ID = "userId";
    private String BOOK_ID = "bookId";

    public List<Document> search(String keyword) {
        String regex = ".*" + keyword.toLowerCase() + ".*";
        Criteria criteria = new Criteria().orOperator(Criteria.where("title").regex(regex, "i"), Criteria.where("author").regex(regex, "i"));
        Query query = new Query(criteria);
        return mongoTemplate.find(query, Document.class, COLLECTION_BOOK);
    }

    public Result addBook(String bookId, String title, String author, String stock, String publicationYear) {
        Query query = new Query(Criteria.where(BOOK_ID).is(bookId));
        List<Document> existingBookId = mongoTemplate.find(query, Document.class, COLLECTION_BOOK);
        Result result = new Result();
        if (!existingBookId.isEmpty()){
            result.setResult(false);
            result.setMessage("bookId " + bookId + " is exist.");
            return result;
        }
        Document document = new Document();
        document.put("title", title);
        document.put(BOOK_ID, bookId);
        document.put("author", author);
        document.put("stock", Integer.parseInt(stock));
        document.put("publicationYear", Integer.parseInt(publicationYear));
        document.put("review", new ArrayList<>());
        mongoTemplate.insert(document, COLLECTION_BOOK);
        result.setResult(true);
        result.setMessage("add book success!");
        return result;
    }

    public Result removeBook(String bookId) {
        Query query = new Query(Criteria.where(BOOK_ID).is(bookId));
        DeleteResult remove = mongoTemplate.remove(query, COLLECTION_BOOK);
        Result result = new Result();
        result.setResult(false);
        result.setMessage("remove failed!");

        if (remove.getDeletedCount() > 0){
            result.setResult(true);
            result.setMessage("remove success!");
        }

        return result;
    }

    /**
     * 还书：删除借出记录， 书本库存+1
     */
    public Result returnBook(String userId, String bookId) {
        Query bookQuery = new Query(Criteria.where(BOOK_ID).is(bookId));
        Update bookUpdate = new Update().inc("stock", 1);
        UpdateResult bookUpdateResult = mongoTemplate.updateFirst(bookQuery, bookUpdate, COLLECTION_BOOK);

        Criteria criteria = new Criteria().andOperator(Criteria.where(USER_ID).is(userId), Criteria.where(BOOK_ID).is(bookId));
        Query recordQuery = new Query(criteria);
        DeleteResult removeResult = mongoTemplate.remove(recordQuery, COLLECTION_BORROW_RECORD);

        Result result = new Result();
        result.setResult(false);
        result.setMessage("return failed! No record or this book doesn't exist.");

        if (bookUpdateResult.getModifiedCount() > 0 && removeResult.getDeletedCount() > 0){
            result.setResult(true);
            result.setMessage("return success!");
        }

        return result;
    }

    public Result renewBook(String userId, String bookId) {
        Criteria criteria = new Criteria().andOperator(Criteria.where(USER_ID).is(userId), Criteria.where(BOOK_ID).is(bookId));
        Query query = new Query(criteria);
        Document document = mongoTemplate.findOne(query, Document.class, COLLECTION_BORROW_RECORD);

        Result result = new Result();
        result.setResult(false);
        result.setMessage("renew failed.");
        if (document == null) {
            result.setResult(false);
            result.setMessage("Record doesn't exist.");
            return result;
        }
        Date endDate = document.getDate("endDate");
        LocalDateTime localDateTime = LocalDateTime.ofInstant(endDate.toInstant(), ZoneOffset.UTC);
        LocalDateTime newTime = localDateTime.plus(30, ChronoUnit.DAYS);
        Date newDate = Date.from(newTime.toInstant(ZoneOffset.UTC));
        Update update = new Update().set("endDate", newDate);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, COLLECTION_BORROW_RECORD);
        if (updateResult.getModifiedCount() > 0) {
            result.setResult(true);
            result.setMessage("renew success!");
        }
        return result;
    }

    public Result review(String bookId, String content) {
        Query query = new Query(Criteria.where(BOOK_ID).is(bookId));
        Update update = new Update().push("review", content);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, COLLECTION_BOOK);
        Result result = new Result();
        result.setResult(false);
        result.setMessage("review failed!");
        if (updateResult.getModifiedCount() > 0) {
            result.setResult(true);
            result.setMessage("review success");
            return result;
        }
        return result;
    }

    public Result borrowBook(String userId, String bookId){
        Result result = new Result();
        Criteria criteria = new Criteria().andOperator(Criteria.where(USER_ID).is(userId), Criteria.where(BOOK_ID).is(bookId));
        Query query = new Query(criteria);
        Document exitingRecord = mongoTemplate.findOne(query, Document.class, COLLECTION_BORROW_RECORD);
        Query bookQuery = new Query(Criteria.where(BOOK_ID).is(bookId));
        Document one = mongoTemplate.findOne(bookQuery, Document.class, COLLECTION_BOOK);
        int stock = 0;
        if (one != null){
            stock = one.getInteger("stock");
        }
        if (exitingRecord != null || stock <=0) {
            result.setResult(false);
            result.setMessage("You've borrowed this book. Or this book is out of stock");
            return result;
        }
        // update book's stock deduct 1
        Update bookUpdate = new Update().inc("stock", -1);
        mongoTemplate.updateFirst(bookQuery, bookUpdate, COLLECTION_BOOK);
        // update borrow record
        Document document = new Document();
        document.put("title", one.get("title"));
        document.put(BOOK_ID, bookId);
        document.put("author", one.get("author"));
        document.put("endDate", Date.from(LocalDateTime.now().plus(30, ChronoUnit.DAYS).toInstant(ZoneOffset.UTC)));
        document.put(USER_ID, userId);
        mongoTemplate.insert(document, COLLECTION_BORROW_RECORD);
        result.setResult(true);
        result.setMessage("Borrowed Success!");
        return result;
    }

    // borrow record
    public List<Document> getBorrowRecord(String userId) {
        Query query = new Query(Criteria.where(USER_ID).is(userId));
        List<Document> documents = mongoTemplate.find(query, Document.class, COLLECTION_BORROW_RECORD);
        for (Document document : documents) {
            Date endDate = document.getDate("endDate");
            String date = LocalDateTime.ofInstant(endDate.toInstant(), ZoneOffset.UTC).toString().substring(0, 10);
            document.put("endDate", date);
        }
        return documents;
    }

}
