# About Package

JsonDB is a small and open source project which is usable for JS developers. You can stay your DB in a json file easily with this package.

# Usage

## Installation

`npm i -g js-json-db`

## Require

```coffeescript
const JsonDB = require("js-json-db");
const jDB = new JsonDB();
```

Now you can access package's functions but firstly you should generate a db and this function will be run just one time.

## Database & Table Management

### Generate Database

```coffeescript
const JsonDB = require("js-json-db");
const jDB = new JsonDB();

jDB.generatejDB("sample_db");
```

We have a database anymore! We also should generate tables in this database. But never forget that you should always use jDB.usejDB function while working on your database. This function always should be active.

### Generate Table

```coffeescript
jDB.usejDB("sample_db");
jDB.newTABLE("table_name",["column1","column2"...]);
```

### Drop Table

```coffeescript
jDB.usejDB("sample_db");
jDB.dropTABLE("table_name");
```

You can specify column names in quotes as second parameter.

## Usage Basic Functions

### Insert

```coffeescript
#jDB.generatejDB("sample_db");
jDB.usejDB("sample_db");

jDB.newTABLE("student",["student_no","student_name","student_department"]);
jDB.insert("student",[1,"John","Computer Science Department"]);
```

### Find && FindOne

```coffeescript
jDB.usejDB("sample_db");

jDB.find("student",(data) => {
    console.log(data);
})

#w/Filter :

jDB.find("student",{"student_no":1,"student_name":"John"},(data) => {
    console.log(data);
})

#Also you can findOne too with filter or without filter
#You can use filter more on as below

jDB.findOne("student", { "student_no": 1, "student_name": "John" }, (data) => {
    console.log();
})
```

### Update

```coffeescript
jDB.usejDB("sample_db");
jDB.update("student", { "student_name": "John" });#This line changes every record student_name with John in student table because we did not use filter parameter as thirdy
#w/Filter :
jDB.update("student", { "student_name": "John" },{ "student_no": 1 });#student_name will change as John which student has number 1
```

### Delete

```coffeescript
jDB.usejDB("sample_db");
jDB.delete("student");#Pretty similar with update.This line delete all records in student table
#w/Filter :
jDB.delete("student",{"student_no":1});
```
