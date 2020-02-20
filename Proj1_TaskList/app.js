let val;
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


function loadEventListeners(){
    form.addEventListener('submit',addTask);
    clrBtn.addEventListener('click',clearTasks);
    taskList.addEventListener('click',removeElement);    
    filter.addEventListener('keyup',filterTasks)
    document.addEventListener('DOMContentLoaded',loadTasks);
}
function filterTasks(e){
    let val = e.target.value.toLowerCase();
   
    document.querySelectorAll('.collection-item').forEach(function(task){
        if(task.firstChild.textContent.toLowerCase().indexOf(val) !=-1){
            task.style.display='block';
            
        }else{
            task.style.display='none';
            
        }
        //let item=task.firstChild.textContent;
    });
}
function removeElement(e){
    let val=e.target.parentElement.parentElement.innerText;
    
    if(e.target.parentElement.classList.contains('delete-item')){ // && confirm('Are you sure?')
        e.target.parentElement.parentElement.remove();
    
    let tasks=localStorage.getItem('tasks');
    //let temp=[];
    tasks=JSON.parse(tasks);
    tasks.forEach(function(task,index){
        if(task===val){
            tasks.splice(index,1);
        }

    });

    //console.log(temp);
    localStorage.setItem('tasks',JSON.stringify(tasks));
        
    

    //console.log(val.innerText);
    }
}

function loadTasks(){
    let tasks=localStorage.getItem('tasks');
    if(tasks===null)tasks=[];
    else{ 
        tasks=JSON.parse(tasks);
        tasks.forEach(task => createListItem(task));
    }
 
}

function clearTasks(){
    localStorage.clear();
    //taskList.innerHTML='';
    //faster way:
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}
// function removeListItem(){

// }

function createListItem(val){

    const li = document.createElement('li');
    li.className='collection-item';
    
    li.appendChild(document.createTextNode(val)) ;

    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.setAttribute('href','#');
    link.innerHTML='<i class="fa fa-remove"></i>'
    
    li.appendChild(link);
    taskList.appendChild(li);
  //  console.log(li);

}


function addTask(e){
    
    e.preventDefault();
    let tasks;
    tasks =localStorage.getItem('tasks');
       
    if(tasks===null)
        tasks=[];
    else tasks=JSON.parse(tasks); 
    
    if(taskInput.value==='')alert("nope");
    else{
     
        tasks.push(taskInput.value);
        tasks=JSON.stringify(tasks);
        localStorage.setItem('tasks',tasks);
        createListItem(taskInput.value);
        
    }
    
    taskInput.value='';
}




//main
//loadTasks();
loadEventListeners();
