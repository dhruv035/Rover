export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const secondsToTimeString = (x:number)=>{
    if(x<60)
    {
        return (x+" seconds")
    }
    else if(x/60<60)
    {
        return ((x/60).toFixed(2)+" minute"+(x/60>1?"s":""))
    }
    else if(x/3600<24)
    {
        return ((x/3600).toFixed(2)+ " hour"+(x/3600>1?"s":""))
    }
    else if((x/3600/24)<30) {
        return (x/3600/24).toFixed(2)+ " day"+(x/3600/24>1?"s":"")
    }
    else return (x/3600/24/30).toFixed(2)+ " month"+((x/3600/24/30>1?"s":""))
};
