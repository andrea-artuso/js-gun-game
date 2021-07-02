const image = document.getElementById("gun-image");
let radios = document.getElementsByName("selectWeapon");

const displayName = document.getElementById("weapon-name");
const displayType = document.getElementById("weapon-type");
const displayMunitions = document.getElementById("weapon-munitions");

const shootButton = document.getElementById("shoot-button");
const reloadButton = document.getElementById("reload-button");
const safetySwitch = document.getElementById("safety-lock");

let newWeapon;

let weaponStack = [
    {
        name: "M4A1",
        type: "Assault Rifle",
        max_ammo: 30
    },
    {
        name: "Ak 47",
        type: "Assault Rifle",
        max_ammo: 40
    },
    {
        name: "MP5",
        type: "Submachine gun",
        max_ammo: 15
    },
    {
        name: "G36",
        type: "Assault Rifle",
        max_ammo: 30
    },
    {
        name: "Colt 1911",
        type: "Handgun",
        max_ammo: 8
    }
]

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

let weaponName="M4A1", weaponType="Assault Rifle", weaponMax_ammo=30;

function changeWeapon(){
    for (let i=0; i<radios.length; i++){
        if (radios[i].checked){
            weaponName = weaponStack[i].name;
            weaponType = weaponStack[i].type;
            weaponMax_ammo = weaponStack[i].max_ammo;
        }
    }
    newWeapon = new Weapon(weaponName, weaponType, weaponMax_ammo);
    renderItems();
}


function renderItems(){
    let lowerCaseName = newWeapon.name.toLowerCase();
    const coreLink = 'https://objectweaponsimages.s3.eu-south-1.amazonaws.com/';
    const finalLink = coreLink + lowerCaseName.replace(/\s+/g, '') + ".jpg";
    
    image.setAttribute("src", finalLink);
    image.setAttribute("alt", newWeapon.name);
    
    displayName.innerHTML = newWeapon.name;
    displayType.innerHTML = newWeapon.type;
    displayMunitions.innerHTML = newWeapon.current_ammo;
}

//Initialize onLoad
window.onload = changeWeapon();


//Apply methods
shootButton.addEventListener("click", function(){
    if (!safetySwitch.checked){
        if (newWeapon.current_ammo > 0){
            displayMunitions.innerHTML = newWeapon.shoot();
        }
        else {
            alert("You have finished your bullets! It's time to reload.");
        }
    }
    else {
        alert("Remove the safety lock to shoot");
    }
});

reloadButton.addEventListener("click", function(){
    if (newWeapon.current_ammo < newWeapon.max_ammo){
        newWeapon.current_ammo = newWeapon.reload();
        displayMunitions.innerHTML = newWeapon.reload();
    }
    else {
        alert("The weapon is full of ammo. You can't reload right now");
    }
});