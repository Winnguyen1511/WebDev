class Watch
{
    constructor(name, price, cate, feature, brand, code)
    {   
        this.name = name;
        this.price = price;
        this.category = cate;
        this.feature = feature;
        this.brand = brand;
        this.code = code;
    }
}

Watch.prototype.CATEGORY = {
    male:"male",
    female:"female",
    couple:"couple",
    other:"other"
}

class Feature
{
    constructor(power, material, crystal, waterResistance)
    {
        this.power = power;
        this.material = material;
        this.crystal = crystal;
        this.waterResistance = waterResistance;
    }
}

Feature.prototype.POWER = {
    battery:0,
    other:1
}

Feature.prototype.MATERIAL = {
    leather:"Leather",
    metal:"Metal band",
    plastic:"Plastic",
    other:"other"
}
Feature.prototype.CRYSTAL = {
    sapphire:"Sapphire",
    harden:"Harden",
    plastic:"Plastic/Acrylic",
    glass:"Mineral Glass",
    other:"other"
}