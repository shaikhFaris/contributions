import fs from "fs"
import fs_extra from "fs-extra"
import path from "path"
let fileExt=[]
let fileNames=[]

async function getFilesExtensions()
{
    await new Promise((resolve, reject) => {          
        fs.readdir("./",(err,files)=>{    
            if (err) {
                console("Error while extracting extensions of files")
            }
            else{
                for (let i = 0; i < files.length; i++) {
                    // files is an array 
                    fileNames[i]=files[i]
                    fileExt[i]=path.extname(`./${files[i]}`)
                }
                resolve();
            }
        })
    })
}

function removeSame()
{  
    // this removes the empty elements int he array which came because of folders already preasent
    fileExt = fileExt.filter(element => element !== "");
    // this arranges the array in alphabetical order
    for (let i = 0; i < fileExt.length; i++) {
        for (let j = 0; j < fileExt.length-i-1; j++) {
            if (fileExt[j]>fileExt[j+1]) {
                let temp = fileExt[j];
                fileExt[j] = fileExt[j + 1];
                fileExt[j + 1] = temp;
            }            
        }
    }
    // console.log(fileExt);
    // this removes the same elements from the array
    for (let i = 0; i < fileExt.length-1; i++) {
        if (fileExt[i]==fileExt[i+1]) {
            fileExt.splice(i,1)
        }        
    }
}

function makeDir()
{
    for (let i = 0; i < fileExt.length; i++) {
        // const element = array[i];
        fs.mkdir(`./${fileExt[i]}`,(err)=>{
            if (err) {
                console.log("An error occured while making [" + fileExt[i] + "] directory\nMaybe there is a folder in this directory with same name\n")
            }
            else{
                console.log( fileExt[i] +" directory successfully made!");
            }
        })        
    }
}
function moveToDir()
{
    // console("  \n")
    for (let i = 0; i < fileExt.length; i++) {

        for (let j = 0; j < fileNames.length; j++) {  

            if (`.${fileExt[i]}`== path.extname(`./${fileNames[j]}`)) {   

                fs_extra.move(`./${fileNames[j]}`,`./${fileExt[i]}/${fileNames[j]}`,(err)=>{
                    if (err) {
                        console.log("####### error while moving files " + fileNames[j]);
                    }
                    else{
                        console.log("successfully moved " + fileNames[j] + " to ./" + fileExt[i] + "/"+ fileNames[j])
                    }
                })
            }
        }
    }
}



await getFilesExtensions()
// removing . from all elements of array
for (let i = 0; i < fileExt.length; i++) {
    fileExt[i] = fileExt[i].replace(/\./g, ''); // Using regular expression to replace all occurrences of "."
}
removeSame()// now the same elements are removed
makeDir()
moveToDir()


