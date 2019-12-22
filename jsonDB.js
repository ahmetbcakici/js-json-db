const fs = require('fs');
const path = require('path');

module.exports = class jsonDB {
        constructor() {
            if (!fs.existsSync("./jDB"))
                fs.mkdirSync("./jDB");
        }

        generatejDB(db_name) {
            fs.writeFile(`./jDB/${db_name}.json`, JSON.stringify({}), (err) => {
                if (err) throw err;
            });
        }

        usejDB(db_name) {
            this.db_name = db_name;
            this.db = require(`${path.dirname(require.main.filename)}/jDB/${db_name}.json`);
        }

        newTABLE(table, array) {
            this.db = {...this.db,
                [table]: [{
                    [array[0]]: null,
                    [array[1]]: null,
                    [array[2]]: null,
                    [array[3]]: null,
                    [array[4]]: null,
                    [array[5]]: null,
                    [array[6]]: null,
                    [array[7]]: null,
                    [array[8]]: null,
                    [array[9]]: null
                }]
            }
            this.saveChanges();
        }

        dropTABLE(table) {
            delete this.db[table];
            this.saveChanges();
        }

        insert(table, array) {
            let keynames = [];
            let counter = 0;
            this.db[table].slice(0, 1).map(docs => {
                Object.keys(docs).map(data => {
                    keynames[counter] = data;
                    counter++;
                })
            })

            try {
                this.db[table].push({
                    [keynames[0]]: array[0],
                    [keynames[1]]: array[1],
                    [keynames[2]]: array[2],
                    [keynames[3]]: array[3],
                    [keynames[4]]: array[4],
                    [keynames[5]]: array[5],
                    [keynames[6]]: array[6],
                    [keynames[7]]: array[7],
                    [keynames[8]]: array[8],
                    [keynames[9]]: array[9],
                })
                this.saveChanges();
            } catch (e) { console.log(`${table} table not found`); }
        }

        find(table, filter, callback) {
            try {
                if (typeof filter == "function") {
                    filter(this.db[table].slice(1)); //callback
                } else {
                    this.db[table].map(data => {
                        if (data[Object.keys(filter)[0]] == filter[Object.keys(filter)[0]] && data[Object.keys(filter)[1]] == filter[Object.keys(filter)[1]] && data[Object.keys(filter)[2]] == filter[Object.keys(filter)[2]] && data[Object.keys(filter)[3]] == filter[Object.keys(filter)[3]] && data[Object.keys(filter)[4]] == filter[Object.keys(filter)[4]] && data[Object.keys(filter)[5]] == filter[Object.keys(filter)[5]] && data[Object.keys(filter)[6]] == filter[Object.keys(filter)[6]] && data[Object.keys(filter)[7]] == filter[Object.keys(filter)[7]] && data[Object.keys(filter)[8]] == filter[Object.keys(filter)[8]] && data[Object.keys(filter)[9]] == filter[Object.keys(filter)[9]]) {
                            if (typeof callback == "function")
                                callback(data);
                        }
                    })
                }
            } catch (e) { console.log(`${table} table not found`); }
        }

        findOne(table, filter, callback) {
            try {
                if (typeof filter == "function") {
                    filter(this.db[table].slice(1, 2));
                } else {
                    this.db[table].some(data => {
                        if (data[Object.keys(filter)[0]] == filter[Object.keys(filter)[0]] && data[Object.keys(filter)[1]] == filter[Object.keys(filter)[1]] && data[Object.keys(filter)[2]] == filter[Object.keys(filter)[2]] && data[Object.keys(filter)[3]] == filter[Object.keys(filter)[3]] && data[Object.keys(filter)[4]] == filter[Object.keys(filter)[4]] && data[Object.keys(filter)[5]] == filter[Object.keys(filter)[5]] && data[Object.keys(filter)[6]] == filter[Object.keys(filter)[6]] && data[Object.keys(filter)[7]] == filter[Object.keys(filter)[7]] && data[Object.keys(filter)[8]] == filter[Object.keys(filter)[8]] && data[Object.keys(filter)[9]] == filter[Object.keys(filter)[9]]) {
                            if (typeof callback == "function")
                                callback(data);
                            return true;
                        }
                    })
                }
            } catch (e) { console.log(`${table} table not found`); }
        }

        update(table, set, filter) {
            try {
                if (filter) {
                    this.db[table].map(data => {
                        if (data[Object.keys(filter)[0]] == filter[Object.keys(filter)[0]] && data[Object.keys(filter)[1]] == filter[Object.keys(filter)[1]] && data[Object.keys(filter)[2]] == filter[Object.keys(filter)[2]] && data[Object.keys(filter)[3]] == filter[Object.keys(filter)[3]] && data[Object.keys(filter)[4]] == filter[Object.keys(filter)[4]] && data[Object.keys(filter)[5]] == filter[Object.keys(filter)[5]] && data[Object.keys(filter)[6]] == filter[Object.keys(filter)[6]] && data[Object.keys(filter)[7]] == filter[Object.keys(filter)[7]] && data[Object.keys(filter)[8]] == filter[Object.keys(filter)[8]] && data[Object.keys(filter)[9]] == filter[Object.keys(filter)[9]])
                            data[Object.keys(set)[0]] = set[Object.keys(set)[0]];
                    })
                } else {
                    this.db[table].map(data => {
                        data[Object.keys(set)[0]] = set[Object.keys(set)[0]];
                    })
                }
                this.saveChanges();
            } catch (e) { console.log(`${table} table not found`); }
        }

        delete(table, filter) {
            try {
                let counter = 1;

                if (filter) {
                    counter = 0;
                    this.db[table].map(data => {
                        if (data[Object.keys(filter)[0]] == filter[Object.keys(filter)[0]])
                            delete this.db[table][counter];
                        counter++;
                    })
                } else {
                    this.db[table].map(data => {
                        delete this.db[table][counter];
                        counter++;
                    })
                }

                let temp_len = this.db[table].length;
                for (let i = 0; i < temp_len; i++) {
                    for (let i = 0; i < this.db[table].length; i++) {
                        if (!this.db[table][i]) {
                            this.db[table].splice(this.db[table].indexOf(i), 1);
                        }
                    }
                }
                this.saveChanges();
            } catch (e) { console.log(`${table} table not found`); }
        }

        saveChanges() {
            fs.writeFile(`./jDB/${this.db_name}.json`, JSON.stringify(this.db), function(err) {
                if (err) throw err;
            });
        }
    }