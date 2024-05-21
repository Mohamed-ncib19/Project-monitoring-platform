const CheckTokenExp = (tokenExp,currentDate) =>{
    if(tokenExp <= currentDate){
        return false;
    }else{
        return true;
    }
};

module.exports = {CheckTokenExp}