export default class ConverterUtil {
    static parseBoolean(value){
        switch(value){
             case true:
             case 'true':
             case 1:
             case '1':
             case 'on':
             case 'yes':
                 return true;
             default: 
                 return false;
         }
     }
}