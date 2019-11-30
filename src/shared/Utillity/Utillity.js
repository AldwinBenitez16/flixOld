export const ternary = (check, backup, alternative) => {
    console.log();
    if(check && alternative) {
        return alternative;
    } 
    if(check) {
        return check;
    }
    return backup
};