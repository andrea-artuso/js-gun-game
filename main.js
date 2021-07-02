const image = document.getElementById("gun-image");

const displayName = document.getElementById("weapon-name");
const displayType = document.getElementById("weapon-type");
const displayMunitions = document.getElementById("weapon-munitions");

const shootButton = document.getElementById("shoot-button");
const reloadButton = document.getElementById("reload-button");
const safetySwitch = document.getElementById("safety-lock");

class Weapon{
    constructor(name, type, max_ammo){
        this.name = name;
        this.type = type;
        this.max_ammo = max_ammo;
        this.current_ammo = max_ammo;
    }

    shoot(){
        return (--this.current_ammo);
    }
    reload(){
        return (this.max_ammo);
    }
}

const newWeapon = new Weapon("M4A1", "Assault Rifle", 30);

//Render DOM
let lowerCaseName = newWeapon.name.toLowerCase();
const coreLink = 'https://objectweaponsimages.s3.eu-south-1.amazonaws.com/';
const finalLink = coreLink + lowerCaseName + ".jpg";

image.setAttribute("src", finalLink);
image.setAttribute("alt", newWeapon.name);

displayName.innerHTML = newWeapon.name;
displayType.innerHTML = newWeapon.type;
displayMunitions.innerHTML = newWeapon.current_ammo;

//Apply methods
shootButton.addEventListener("click", function(){
    if (!safetySwitch.checked){
        displayMunitions.innerHTML = newWeapon.shoot();
    }
    else {
        alert("Remove the safety lock to shoot");
    }
});

reloadButton.addEventListener("click", function(){
    console.log("current: "+newWeapon.current_ammo);
    console.log("max: "+newWeapon.max_ammo);
    if (newWeapon.current_ammo < newWeapon.max_ammo){
        newWeapon.current_ammo = newWeapon.reload();
        displayMunitions.innerHTML = newWeapon.reload();
    }
    else {
        alert("The weapon is full of ammo. You can't reload right now");
    }
});