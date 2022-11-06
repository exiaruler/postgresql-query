class SQLUtil{
  checkToString(query,v){
    const lowerCaseQ=query.toLowerCase();
     if(lowerCaseQ.startsWith(v)==false){
        return true;
     }
     return false;
 }
}
module.exports=SQLUtil;