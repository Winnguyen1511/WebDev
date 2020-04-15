class Model
{
    constructor(name, surname)
    {
        this.name = name;
        this.surname = surname;
    }
}

class View
{
    constructor(model, controller)
    {
        // var self = this;
        addViews();

        this.controller = controller;
        this.txtName.value = model.name;
        this.txtSurname.value = model.surname;

        addEvents();
    }
    addViews()
    {
        this.txtName = document.getElementById("txtName");
        this.txtSurname = document.getElementById("txtSurname");
        this.btnSave = document.getElementById("btnSave");
        this.btnReset = document.getElementById("btnReset");
    }
    addEvents()
    {
        this.btnSave.addEventListener("click", ()=>{
            self.save();
        });
        this.btnReset.addEventListener("click", ()=>{
            self.reset();
        });
    }

    reset(){
        this.txtName.value = "";
        this.txtSurname.value = "";
        this.divMessages.innerHTML = "";
    }
    
    set message(message){
        this.divMessages.innerHTML = message;
    }

    save()
    {  
        var data = {
            name: this.txtName.value,
            surname: this.txtSurname.value
        };
        
        this.controller.save(data);
    }
}

class Controller
{
    initialize(model, view)
    {
        this.model = model;
        this.view = view;
    }

    save(data)
    {
        if(data.name && data.surname)
        {
            this.model.name = data.name;
            this.model.surname = data.surname;
            this.view.message = "Save!";
        }
        else{
            this.view.message = "Please, enter name and surname!";
        }
    }
}

window.onload = function(){
    var model = new Model("John", "Smith");
    var controller = new Controller();
    var view = new View(model, controller);

    controller.initialize(model, view);
}