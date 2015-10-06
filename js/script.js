var new_item;
var active_li = null;
var list_elements;

var list_of_colors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed ', 'Indigo ', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];

var lower_case_list = list_of_colors.map(function(value) {// new list with lower case only
    return value.toLowerCase();
});

window.addEventListener('keyup',function(){
    if (active_li != null) {
        if (event.keyCode === 40) {
            active_li = active_li.nextElementSibling;
            if (active_li === null){
               active_li = ol.children[0];
            }
        }
        if (event.keyCode === 38) {
            active_li = active_li.previousElementSibling;
            if (active_li === null){
                active_li = ol.children[ol.children.length-1];
            }
        }
        loop_active();
    }
});

document.addEventListener('DOMContentLoaded',function(){
    body = document.getElementsByTagName('body')[0];
    create('ol',body);
    ol = new_item;
    button_create = document.getElementsByTagName('button')[0];
    button_read = document.getElementsByTagName('button')[1];
    button_update = document.getElementsByTagName('button')[2];
    button_delete = document.getElementsByTagName('button')[3];
    button_upload = document.getElementsByTagName('button')[4];
    input_create = document.getElementsByTagName('input')[0];
    input_read = document.getElementsByTagName('input')[1];
    input_update = document.getElementsByTagName('input')[2];
    input_delete = document.getElementsByTagName('input')[3];
    input_upload = document.getElementsByTagName('input')[4];
    input_url=document.getElementsByTagName('input')[5];
    button_create.addEventListener('click',function(){
        if (lower_case_list.indexOf(input_create.value.toLowerCase()) > -1){
            create('li', ol);
            new_item.innerHTML = '<div> - </div> <div> </div><div>Rename</div>';
            new_item.children[1].innerHTML = list_of_colors[lower_case_list.indexOf(input_create.value.toLowerCase())];
            input_create.value = '';
            loop_active();
        } else {
            create('li', ol);
            new_item.innerHTML = '<div> - </div> <div> </div><div>Rename</div>';
            new_item.children[1].innerHTML = random_color();
            input_create.value = '';
            loop_active();
        }
        new_item.children[0].addEventListener('click',function(){this.parentNode.remove()});
        new_item.children[2].addEventListener('click',function(){input_update.value=this.parentNode.children[1].innerHTML;input_update.focus()});
        input_create.value = '';
        new_item.children[1].style.backgroundColor = new_item.children[1].textContent;
        new_item.addEventListener('dblclick', function () {
            if (lower_case_list.indexOf(input_create.value.toLowerCase()) > -1) {
                this.textContent = list_of_colors[lower_case_list.indexOf(input_create.value.toLowerCase())];
                this.style.backgroundColor = this.textContent;
            }
        });
        loop_active();
    });
    button_read.addEventListener('click',function(){
        var string = input_read.value.split(',');
        for (var item in string){
            if (lower_case_list.indexOf(string[item].toLowerCase()) > -1){
                create('li', ol);
                new_item.innerHTML = '<div> - </div> <div> </div><div>Rename</div>';
                new_item.children[1].innerHTML = list_of_colors[lower_case_list.indexOf(string[item].toLowerCase())];
                new_item.children[0].addEventListener('click',function(){this.parentNode.remove()});
                new_item.children[2].addEventListener('click',function(){input_update.value=this.parentNode.children[1].innerHTML;input_update.focus()});
                loop_active();
            }
        }
    });
    button_update.addEventListener('click',function(){
        if (lower_case_list.indexOf(input_update.value.toLowerCase()) > -1) {
            active_li.children[1].innerHTML = list_of_colors[lower_case_list.indexOf(input_update.value.toLowerCase())];
            loop_active();
            input_update.value='';
        }
    });
    button_delete.addEventListener('click',function(){
        if (input_delete.value === ''){
            active_li.remove();
        }else {
            delete_color();
            input_delete.value = '';
        }
    });
    input_create.addEventListener('keyup',function(){
        if(event.keyCode == 13){
            button_create.click();
        }
    });
    input_read.addEventListener('keyup',function(){
        if(event.keyCode == 13){
            button_read.click();
        }
    });
    input_update.addEventListener('keyup',function(){
        if(event.keyCode == 13){
            button_update.click();
        }
    });
    input_delete.addEventListener('keyup',function(){
        if(event.keyCode == 13){
          button_delete.click();
        }
    });
    input_url.placeholder = 'enter url here to add array';
    input_url.addEventListener('keydown',function(event){
        if (event.keyCode === 13){
            array_from_url();
        }
    })
});
function create(new_element,where_to_append){
    new_item = document.createElement(new_element);
    where_to_append.appendChild(new_item);
    if (new_element === 'li'){
        active_li = new_item;
        new_item.addEventListener('click',function(){
            active_li = this;
            loop_active();
        });
        new_item.addEventListener('mouseover',function(){
            this.children[0].style.display = 'flex';
            this.children[2].style.display = 'flex';
        });
        new_item.addEventListener('mouseout',function(){
            this.children[0].style.display = 'none';
            this.children[2].style.display = 'none';
        });
    }
}
function loop_active(){
    for (var i = 0;i<ol.children.length;i++){
        ol.children[i].children[1].style.backgroundColor = ol.children[i].children[1].innerText;
        ol.children[i].children[1].style.border = '2px solid black';
        ol.children[i].style.border = '2px solid black';
        active_li.children[1].style.border = '2px solid lime';
        active_li.style.border = '2px solid lime';
    }
}
function delete_color(){
    var how_many_in_list =0;
    update_list_elements();
    if (Number(input_delete.value) >-1 ){
        ol.children[Number(input_delete.value)-1].remove()
    }
    for (var i=0;i<list_elements.length;i++){
        if (list_elements[i].children[1].textContent.toLowerCase() == input_delete.value.toLowerCase()){
            list_elements[i].remove();
            how_many_in_list +=1
        }
    }
    if (how_many_in_list > 0){
        how_many_in_list = 0;
        delete_color();
    }
}
function update_list_elements(){ // updates li list
    //  list_elements = ol.childNodes; -- change to children
    list_elements = ol.children;
}
var loadFile = function(event){
    var obj = event.target.files[0];
    var url = window.URL.createObjectURL(obj);
    //alert(url)
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        //alert(xhr.responseText);
        var ray = xhr.responseText.split(",");
        //alert(typeof(ray));
        //alert(ray)
        //alert(ray[1]);
        input_read.value = ray;
};
function random_color(){ // generates a slot from array
    return generate_random_color = list_of_colors[
        Math.floor(
            Math.random()*list_of_colors.length
        )
        ];
}
function array_from_url(){
    var xhr = new XMLHttpRequest();
    alert(input_url.value);
    xhr.open("GET", input_url.value,false);
    xhr.send(null);
    alert(xhr.responseText);
    var ray = xhr.responseText.split(",");
    alert(typeof(ray));
    alert(ray[1]);
    input_read.value = ray;
}

//"https://raw.githubusercontent.com/vinferno/sept22-test/master/js/o.txt"


