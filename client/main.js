import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Tasks = new Mongo.Collection('tasks');
Meteor.subscribe('tasks');
Template.tasks.helpers({
  tasks: function(){
    return Tasks.find({}, {sort: {createdAt: -1}});
  }
});
Template.tasks.events({
  "submit .add-task":function(event){
    var name = event.target.name.value;
    Meteor.call('addTask',name);
    event.target.name.value='';
    return false;
  },
  "click .delete-task":function(event){
    if(confirm('Delete Task?')){
      Meteor.call('deleteTask',this._id);
    }
    return false;
  }
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
