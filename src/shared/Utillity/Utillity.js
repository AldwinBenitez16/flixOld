export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value , rules) => {
    let isValid = true;

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.isMail) {
        const pattern = /^(([a-zA-Z0-9]+)|([a-zA-Z0-9]+((?:[a-zA-Z0-9]+)|(?:\.[a-zA-Z0-9]+))*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$)/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
};

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
