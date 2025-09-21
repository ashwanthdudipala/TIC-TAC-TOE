let boxes=document.querySelectorAll(".box");
let player=true;
let reset=document.querySelector(".reset");
let ans=document.querySelector(".Winner");
const winpat=[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
//assume the player1 will output X and player 2 as O

for(let box of boxes){
    box.addEventListener("click",()=>{
        if(player){
            player=false;
            box.innerText="X";
        }
        else{
            player=true;
            box.innerText="O";
        }
        box.disabled=true;
        chkwinner();
    })
}
reset.addEventListener("click",()=>{
    ans.innerText="";
    for(box of boxes){
        box.innerText="";
        box.disabled=false;
        player=true;
    }
})
const chkwinner=()=>{
    for(let pat of winpat){
        let val1=boxes[pat[0]].innerText;
        let val2=boxes[pat[1]].innerText;
        let val3=boxes[pat[2]].innerText;
        if(val1!="" && val2!= "" && val3!=""){
            if(val1==val2 && val2==val3){
                
                if(val1=="X"){
                    ans.innerText="Winner is X";
                }
                else ans.innerText="Winner is O"; 
            }
        }
    }
}