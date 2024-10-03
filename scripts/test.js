 function getTimeString(time){
    // get our and rest hour
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minute = parseInt( remainingSeconds / 60);
     remainingSeconds = remainingSeconds % 60;
    return `${hour} hour ${minute} minute ${remainingSeconds} second ago`;
}
console.log(getTimeString(12520))