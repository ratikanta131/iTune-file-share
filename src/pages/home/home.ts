import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file'
import * as papa from 'papaparse'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  file_name : string = "demo.csv"  
  data: any  
  folder_name: string = "medela"


  constructor(private alertController: AlertController,
  private file : File
) {}


  ngOnInit(){
    
    this.data = papa.unparse({
      fields: ["Column 1", "Column 2"],
      data: [
        ["foo", "bar"],
        ["abc", "def"]
      ]
    });


  }

  create_folder(){
    this.file.createDir(this.file.dataDirectory, this.folder_name, false).
    then(data=>{
      this.show_message("folder created successfully!")
    }).
    catch(err=>{
      this.show_message("Could not create folder!" + err.message + err.code)      
    })
  }

  create_file(){
    // let file_name = this.datePipe.transform(new Date(), 'dd-MM-yyyy HHmm') + ".csv"    
    


   
    this.file.createFile(this.file.dataDirectory + "/" + this.folder_name, this.file_name, true).
    then(data=>{
      this.show_message("file created successfully!")
    }).
    catch(err=>{
      this.show_message("Could not create file!" + err.message + err.code)      
    })

  }

  write_file(){
    this.file.writeFile(this.file.dataDirectory + "/" + this.folder_name, this.file_name, this.data, 
      { replace: true, append: false }).
      then(data=>{
          this.show_message("Write successfull!")
      }).
      catch(err=> {
        this.show_message("Could not create file!" + err.message)
      })
  }

  read_file(){
    this.file.readAsText(this.file.dataDirectory + "/" + this.folder_name, this.file_name).
    then(data=>{
        this.show_message(data)
    }).
    catch(err=> {
      this.show_message("Could not fetch file!" + err.message)

    })
  }

  show_message(message: string){
    let alert = this.alertController.create({
      title: 'Message',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
