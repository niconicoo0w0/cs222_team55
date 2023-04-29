## 1. 注册

实际：http://127.0.0.1:8081/user/registration?userId=1004&password=123456&userName=luffy&role=student  get

地址和参数：

| 地址     | http://127.0.0.1:8081/user/registration         |
| -------- | ----------------------------------------------- |
| 方式     | POST                                            |
| 参数：   |                                                 |
| userId   | 1004  String                                    |
| password | 123456  String                                  |
| userName | luffy      String                               |
| role     | student   或  admin   写死2个，用复选框  String |



## 2. 登录

实际：http://127.0.0.1:8081/user/login?userId=1000&password=123456

地址和参数：

| 地址     | http://127.0.0.1:8081/user/login |
| -------- | -------------------------------- |
| 方式     | POST                             |
| 参数：   |                                  |
| userId   | 1004  String                     |
| password | 123456  String                   |



## 3. 新增书籍  

实际：http://127.0.0.1:8081/book/add?bookId=3&title=harry potter Ⅱ&author=JK ROLIN&stock=10&publicationYear=2018

地址和参数：

| 地址            | http://127.0.0.1:8081/book/add |
| --------------- | ------------------------------ |
| 方式            | POST                           |
| 参数：          |                                |
| bookId          | 3  String                      |
| title           | RINGS String                   |
| author          | JK ROLIN  string               |
| stock           | 10 string                      |
| publicationYear | 2018  String                   |

<font color=red> 补充： 删除、新增功能只开放给用户role=admin的账户。 </font>

## 4. 删除书籍  

实际：http://127.0.0.1:8081/book/remove?bookId=2

地址和参数：

| 地址   | http://127.0.0.1:8081/book/remove |
| ------ | --------------------------------- |
| 方式   | POST                              |
| 参数： |                                   |
| bookId | 2  String                         |



## 5. 搜索书籍

实际：http://127.0.0.1:8081/book/search?keyword=harry

地址和参数：

| 地址    | http://127.0.0.1:8081/book/search |
| ------- | --------------------------------- |
| 方式    | GET                               |
| 参数：  |                                   |
| keyword | harry  String                     |



## 6. 借书

实际： http://127.0.0.1:8081/book/borrow?bookId=2&userId=1001

地址和参数：

| 地址   | http://127.0.0.1:8081/book/borrow |
| ------ | --------------------------------- |
| 方式   | POST                              |
| 参数： |                                   |
| bookId | 3  String                         |
| userId | 1001 String                       |



## 7. 续借书籍

实际：http://127.0.0.1:8081/book/renew?userId=1001&bookId=2

地址和参数：

| 地址   | http://127.0.0.1:8081/book/renew |
| ------ | -------------------------------- |
| 方式   | POST                             |
| 参数： |                                  |
| bookId | 3  String                        |
| userId | 1001 String                      |



## 8.还书

实际：http://127.0.0.1:8081/book/return?userId=1001&bookId=2

地址和参数：

| 地址   | http://127.0.0.1:8081/book/return |
| ------ | --------------------------------- |
| 方式   | POST                              |
| 参数： |                                   |
| bookId | 3  String                         |
| userId | 1001 String                       |



## 9. 点评

实际：http://127.0.0.1:8081/book/review?bookId=2&content=hello

地址和参数：

| 地址    | http://127.0.0.1:8081/book/review |
| ------- | --------------------------------- |
| 方式    | POST                              |
| 参数：  |                                   |
| bookId  | 3  String                         |
| content | goodbook  String                  |



## 10. 当前已借书籍列表

实际：http://127.0.0.1:8081/book/record?userId=1001

地址和参数：

| 地址   | http://127.0.0.1:8081/book/record |
| ------ | --------------------------------- |
| 方式   | GET                               |
| 参数： |                                   |
| userId | 3  String                         |

