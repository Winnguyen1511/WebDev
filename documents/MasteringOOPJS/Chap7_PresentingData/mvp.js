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
    constructor(presenter)
    {
        addViews();
        this.presenter = presenter;
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
        this.btnSave.addEventListener("click",()=>{
            this.save();
        });
        this.btnReset.addEventListener("click",()=>{
            this.reset();
        });
    }
    save()
    {
        var data = {
            name: this.txtName.value,
            surname: this.txtSurname.value
        };
        this.presenter.save(data);
    }
    reset()
    {
        this.txtName.value = "";
        this.txtSurname.value = "";
        this.divMessages.innerHTML = "";
    }
    set name(value)
    {
        this.txtName.value = value;
    }
    set surname(value)
    {
        this.txtSurname.value = value;
    }
    set message(message)
    {
        this.divMessages.innerHTML = message;
    }
}

class Presenter
{
    initialize(model, view)
    {
        this.model = model;
        this.view = view;
        this.view.name = this.model.name;
        this.view.surname = this.model.name;
    }
    save(data)
    {
        if(data.name && data.surname)
        {
            this.model.name = data.name;
            this.model.surname = data.surname;

            this.view.message = "Saved!";
        }
        else{
            this.view.message = "Please enter a name and surname!";
        }
    }
}

window.onload = function(){
    var model = new Model("Victor", "Nguyen");
    var presenter = new Presenter();
    var view = new View(presenter);

    presenter.initialize(model, view);
}