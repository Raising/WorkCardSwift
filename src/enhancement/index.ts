//@ts-ignore
interface Object {
  setProperty:<objectType> (this:objectType,path:string,value:any) => objectType;
  pushElement:<objectType> (this:objectType,path:string,value:any) => objectType;
  removeElement:<objectType> (this:objectType,path:string,value:any) => objectType;
  // $functionObjectAgregation(name: string, aditionalObjectProperties: any): () => Object;
  // $getPropertyByPath(path?: string): any;
  // $map(mapFunction: (element: any) => any): any;
  // $filter(filterFunction: (element: any) => any): any;
  // $singleDeepMerge: (firstObj: any) => any;
  // $deepMerge: (baseObj: any, firstObj: any, secondObj: any) => any;
  // $toArray: () => any[];
  $id: string;
  _lastID: number;
}

interface String {
  asAction: (payload:any) => any;
  // $functionObjectAgregation(name: string, aditionalObjectProperties: any): () => Object;
  // $getPropertyByPath(path?: string): any;
  // $map(mapFunction: (element: any) => any): any;
  // $filter(filterFunction: (element: any) => any): any;
  // $singleDeepMerge: (firstObj: any) => any;
  // $deepMerge: (baseObj: any, firstObj: any, secondObj: any) => any;
  // $toArray: () => any[];
  $id: string;
  _lastID: number;
}



//@ts-ignore
Object._lastID = 0;
Object.defineProperty(Object.prototype, '$Id',{
  value :function(){
    if (this['[[ID]]'] === undefined){
      //@ts-ignore
      Object._lastID ++;
      //@ts-ignore
      var str = "" + Object._lastID;
      var pad = "0000000000";
   
      Object.defineProperty(this, '[[ID]]',{
      value : pad.substring(0, pad.length - str.length) + str
      });
    }
    return this['[[ID]]'];
  }
});

Object.defineProperty(Object.prototype, 'isPromise',{
  value :function(){
    return typeof this.then === "function";
  }
});



Object.defineProperty(Object.prototype, 'getProperty',{
    value :function(propertyPath:string,options:any = {undefinedError : undefined}){
      let separator = ".";
     

      let splitedProperty = propertyPath.split(separator); 
      let inmutableProperty = this;
      if (splitedProperty.length === 1){
        inmutableProperty = splitedProperty[0] === "" ? this : this[propertyPath];
      }else{
        for (let subName of splitedProperty){
          if (inmutableProperty !== undefined){
            inmutableProperty = inmutableProperty[subName];
          }
        }
      }
      
      if (options.undefinedError !== undefined && inmutableProperty === undefined) {
        throw options.undefinedError;
      }else{
        return inmutableProperty;
      };
      
    }
});

Object.defineProperty(Object.prototype, 'pushElement',{
  value : function(propertyPath:string,value:any){
    let newArray = [...this.getProperty(propertyPath),value]

    return this.setProperty(propertyPath,newArray);
  }
});


Object.defineProperty(Object.prototype, 'removeElement',{
  value : function(propertyPath:string,value:any){
    let newArray = [...this.getProperty(propertyPath).filter((el:any) => el !== value)]

    return this.setProperty(propertyPath,newArray);
  }
});

Object.defineProperty(Object.prototype, 'setProperty',{
    value : function(propertyPath:string,value:any,options:any = {separator : "."}){
      let separator = options.separator !== undefined ? options.separator : ".";

     

      let newThis =  Object.assign(Object.create(this.__proto__),this);
      if (typeof value === "object"){
        if (value.hasOwnProperty("length")){
          value = [...value];
        }else{
          value = Object.assign({},value);
        }
      }
      if (separator === undefined){
          newThis[propertyPath] = value;
      }
      else {
        let splitedProperty = propertyPath.split(separator); 
        
        if (splitedProperty.length === 1){
          newThis[propertyPath] = value;
        }else{
          let property = newThis;
          let tailPropertyValue:string = splitedProperty.pop() || '';
          for (let subName of splitedProperty){
            if (typeof property[subName] === "object"){
              if (property[subName] !== undefined &&  property[subName].hasOwnProperty("length")){
                property[subName] = [...property[subName]];
              }else{
                property[subName] = Object.assign({},property[subName]);
              }
            }else{
              property[subName] = {};
            }
            property = property[subName];
          }
          property[tailPropertyValue] = value;
        }
      }
      return newThis;
    }
});


Object.defineProperty(String.prototype, "asAction",{
  value : function(payload:any = {}){
    return {type: this, payload }
  }
})

Object.defineProperty(Object.prototype, "$map",{
  value : function(callBack:any){
    let array = this;
    if (this.length === undefined){
      let keys = Object.keys(this);
      array = [];
      for (let index = 0; index < keys.length; index++){
        array.push(this[keys[index]]);
      }
    }

    return array.map(callBack);
  }
})