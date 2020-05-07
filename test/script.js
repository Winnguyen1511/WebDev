var Person = function(firstAndLast) {
  // Complete the method below and implement the others similarly
  let arr = firstAndLast.split(" ");
  this.firstName = arr[0].slice();
  this.lastName = arr[1].slice();

  this.getFullName = function() {
    return this.firstName + " "+this.lastName;
  };
  this.getLastName = function(){
    return this.lastName;
  }
  this.getFirstName = function(){
    return this.firstName;
  }
  this.setFirstName = function(first)
  {
    this.firstName = first;
  }
  this.setLastName = function(last)
  {
    this.lastName = last;
  }
  this.setFullName= function(firstAndLast)
  {
    let arr = firstAndLast.split(" ");
    this.firstName = arr[0].slice();
    this.lastName = arr[1].slice();
  }
  
};

var bob = new Person('Bob Ross');
bob.getFullName();
