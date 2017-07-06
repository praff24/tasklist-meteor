import { Meteor } from 'meteor/meteor';

Tasks = new Mongo.Collection('tasks');

Meteor.publish('tasks',function(){
  return Tasks.find({userId: this.userId});
});

var connectionName = "my_connection"; // Name your connection as you wish

    CreateMySQLConnection(connectionName, {
        host     : "localhost", // MySQL host address or IP
        database : "database",   // MySQL database name
        user     : "root",      // MySQL username
        password : "12345678"  // MySQL password
    });

    OpenMySQLConnection(connectionName, function(e) {
        if(e) {
            console.log("Error: " + e.code + " " + e.reason);
            return;
        }
      });

        console.log("Connected. Initializing shadow...");

        CreateMySQLShadow(connectionName, {}, function(e) {
            if(e) {
                console.log("Error: " + e.code + " " + e.reason);
                return;
            }

            console.log("Shadow initialized. Copying data to mongo...");

            MySQLShadowSyncAll(connectionName, {}, function(e) {
                if(e) {
                    console.log("Error: " + e.code + " " + e.reason);
                    return;
                }

                // If you want changes to your collections to be automatically replicated back to MySQL do something like this:
                 MySQLShadowCollection(Tasks, connectionName, {});

                console.log("Success.");
            });
        });

        Meteor.methods({
          addTask: function(name){
            if(!Meteor.userId()){
              throw new Meteor.Error('No access');
            }
            Tasks.insert({
              name:name,
              createdAt: new Date(),
              userId: Meteor.userId()
            });
          },
          deleteTask: function (taskId){
          Tasks.remove(taskId);
          }
        });
