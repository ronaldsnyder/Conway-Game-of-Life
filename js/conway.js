var rows = 25
var columns = 25

function create_table(){
    document.write('<table id="conway" class="table table-bordered">');

    count = 0

    for (i = 0; i < rows; i++){
        document.write('<tr>');
            for (j = 0; j < columns; j++){
                //document.write('<td>' + count.toString() + ' </td>');
                document.write('<td>' + i.toString() + ", " + j.toString() + ' </td>');
                count++;
            }
    }
    document.write('</table>');
}

function start_conway(){
    random_life(300);
    var intervalID = window.setInterval(main_loop, 1000);
}

function get_random_int(min, max){
    return Math.floor(Math.random() * (max - min));
}

function random_life(life_spawned){
    var x = 0;
    var y = 0;
    var new_born;
    for (i = 0; i < life_spawned; i++){
        x = get_random_int(0, rows);
        y = get_random_int(0, columns);

        new_born = new life(x, y);
        new_born.birth();
    }
}

function life(x, y){
    this.x = x;
    this.y = y;
    this.alive = 'false';
    this.table_cell = document.getElementById("conway").rows[x].cells[y];
    if (this.table_cell.className == "alive"){
        this.alive = 'true';
    }
    this.neighbor_check = function(){
        //check each neighbor for life and count them
        var adjacent_life = 0;
        //life to check
        // (-1, -1) (-1, 0)(-1, 1) (0, 1)(1, -1) (1, 0) (1, 1)
        if (this.x -1 > 0 && this.y -1 > 0){
            neighbor = new life(this.x -1, this.y - 1);
            if (neighbor.alive == 'true'){
                adjacent_life++;
            }
        }
        if (this.x -1 > 0 ){
            neighbor = new life(this.x -1, this.y);
            if (neighbor.alive == 'true'){
                adjacent_life++;
            }
        }
        if (this.x - 1 > 0 && this.y + 1 < rows){
            neighbor = new life(this.x -1, this.y + 1);
            if (neighbor.alive == 'true'){
                adjacent_life++;
            }
         }
        if (this.y - 1 > 0){
            neighbor = new life(this.x, this.y - 1);
            if (neighbor.alive == 'true'){
                adjacent_life++;
            }
        }
        if (this.y + 1 < rows){
            neighbor = new life(this.x, this.y + 1);
            if (neighbor.alive == 'true'){
                adjacent_life++;
            }
        }
        if (this.x + 1 < columns && this.y > 0){
            neighbor = new life(this.x + 1, this.y -1);
            if (neighbor.alive == 'true'){
                adjacent_life++;
            }
        }
        if (this.x + 1 < columns){
            neighbor = new life(this.x + 1, this.y);
            if (neighbor.alive == 'true'){
                adjacent_life++;
            }
        }
        if (this.x + 1 < columns && this.y + 1 < rows){
            neighbor = new life(this.x + 1, this.y + 1);
            if (neighbor.alive == 'true'){
                adjacent_life++;
            }
         }

        return adjacent_life
    }

    this.birth = function(){
        //change class to living
        this.table_cell.className = 'alive';
    }

    this.die = function(){
        //change class to null or dead;
       this.table_cell.className = "dead";
    }
}

function main_loop(){
    var neighbors;
    for (i = 0; i < rows; i++){

            for (j = 0; j < columns; j++){
                rds = new life(i, j);
                neighbors = rds.neighbor_check();
                rds.table_cell.innerHTML = neighbors;
                if (rds.alive == 'true' && neighbors < 2){
                    rds.die();
                }
                else if(rds.alive == 'true' && neighbors < 3){
                    rds.die();
                }
                else if(rds.alive == 'true' && neighbors > 3){
                    rds.die();
                }
                else if(rds.alive == 'false' && neighbors == 3){
                    rds.birth();
                }
            }
    }
}